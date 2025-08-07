"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = exports.triggerCryptoUpdate = exports.updateCryptoDaily = void 0;
const scheduler_1 = require("firebase-functions/v2/scheduler");
const https_1 = require("firebase-functions/v2/https");
const https_2 = require("firebase-functions/v2/https");
const admin = __importStar(require("firebase-admin"));
// Initialize Firebase Admin
admin.initializeApp();
const db = admin.firestore();
// Simple fetch replacement for Firebase Functions
async function fetchData(url) {
    const https = require('https');
    const http = require('http');
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https:') ? https : http;
        protocol.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                }
                catch (error) {
                    reject(error);
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}
// Stablecoins die wir ausschließen wollen
const stablecoins = [
    'tether', 'usd-coin', 'binance-usd', 'dai', 'frax', 'trueusd',
    'paxos-standard', 'neutrino', 'fei-usd', 'terra-luna-2',
    'gemini-dollar', 'liquity-usd', 'magic-internet-money',
    'stasis-eurs', 'pax-gold'
];
// Hilfsfunktionen
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            console.log(`Fetch-Versuch ${i + 1} für: ${url}`);
            const data = await fetchData(url);
            console.log(`✅ Erfolgreich Daten abgerufen (${i + 1}/${retries})`);
            return data;
        }
        catch (error) {
            console.error(`❌ Fetch-Fehler (${i + 1}/${retries}):`, error);
            if (i === retries - 1)
                throw error;
            const waitTime = Math.pow(2, i) * 1000; // Exponential backoff
            console.log(`⏳ Warte ${waitTime}ms vor nächstem Versuch...`);
            await delay(waitTime);
        }
    }
}
// Hauptfunktion für Krypto-Update
exports.updateCryptoDaily = (0, scheduler_1.onSchedule)({
    schedule: '0 2 * * *',
    timeZone: 'Europe/Berlin',
    region: 'europe-west1'
}, async (event) => {
    console.log('🚀 Starte tägliche Krypto-Datenaktualisierung...');
    try {
        // 1. Hole Top 50 Coins von CoinGecko
        console.log('📊 Lade Top 50 Coins von CoinGecko...');
        const marketData = await fetchWithRetry('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h,7d,30d,1y');
        if (!Array.isArray(marketData)) {
            throw new Error('Ungültige API-Antwort: Keine Coin-Liste gefunden');
        }
        // 2. Filtere Stablecoins und sortiere nach 1-Jahres-Performance
        const filteredCoins = marketData
            .filter((coin) => !stablecoins.includes(coin.id))
            .filter((coin) => coin.price_change_percentage_1y_in_currency != null)
            .sort((a, b) => (b.price_change_percentage_1y_in_currency || 0) - (a.price_change_percentage_1y_in_currency || 0))
            .slice(0, 25); // Top 25 Performer
        console.log(`📈 Verarbeite ${filteredCoins.length} Top-Performer...`);
        console.log('🏆 Top 5 Performer:');
        filteredCoins.slice(0, 5).forEach((coin, index) => {
            console.log(`  ${index + 1}. ${coin.name}: ${(coin.price_change_percentage_1y_in_currency || 0).toFixed(2)}%`);
        });
        // 3. Lösche alle bestehenden Coins
        console.log('🗑️  Lösche alte Coins...');
        const existingCoins = await db.collection('coins').get();
        const deletePromises = existingCoins.docs.map(doc => doc.ref.delete());
        await Promise.all(deletePromises);
        console.log(`✅ ${existingCoins.docs.length} alte Coins gelöscht`);
        // 4. Verarbeite jeden Coin
        console.log('\n💾 Speichere Coins in Firestore...');
        const batch = db.batch();
        filteredCoins.forEach((coin) => {
            var _a, _b, _c;
            const processedCoin = {
                id: coin.id,
                name: coin.name,
                symbol: coin.symbol,
                image: coin.image,
                current_price: coin.current_price,
                market_cap_rank: coin.market_cap_rank,
                price_changes: {
                    '24h': coin.price_change_percentage_24h || 0,
                    '7d': coin.price_change_percentage_7d_in_currency || 0,
                    '30d': coin.price_change_percentage_30d_in_currency || 0,
                    '1y': coin.price_change_percentage_1y_in_currency || 0
                },
                prices: {
                    '24h': ((_b = (_a = coin.sparkline_in_7d) === null || _a === void 0 ? void 0 : _a.price) === null || _b === void 0 ? void 0 : _b.slice(-24)) || [],
                    '7d': ((_c = coin.sparkline_in_7d) === null || _c === void 0 ? void 0 : _c.price) || [],
                    '30d': [],
                    '1y': []
                },
                historical_prices_1y: [],
                last_updated: admin.firestore.Timestamp.now()
            };
            const docRef = db.collection('coins').doc(coin.id);
            batch.set(docRef, processedCoin);
        });
        await batch.commit();
        console.log(`✅ ${filteredCoins.length} Coins erfolgreich in Firestore gespeichert!`);
    }
    catch (error) {
        console.error('❌ Fehler bei täglicher Krypto-Aktualisierung:', error);
        throw error;
    }
});
// Manuelle Trigger-Funktion für Sofort-Updates
exports.triggerCryptoUpdate = (0, https_1.onCall)({
    region: 'europe-west1'
}, async (request) => {
    // Authentifizierung prüfen
    if (!request.auth) {
        throw new https_1.HttpsError('unauthenticated', 'Authentifizierung erforderlich');
    }
    console.log('🔧 Manuelle Krypto-Aktualisierung gestartet von:', request.auth.uid);
    try {
        // Führe die gleiche Logik wie die Scheduled Function aus
        await exports.updateCryptoDaily.run({});
        return {
            success: true,
            message: 'Krypto-Daten erfolgreich aktualisiert',
            timestamp: new Date().toISOString()
        };
    }
    catch (error) {
        console.error('❌ Fehler bei manueller Aktualisierung:', error);
        throw new https_1.HttpsError('internal', `Manual update failed: ${error}`);
    }
});
// Health Check Function
exports.healthCheck = (0, https_2.onRequest)({
    region: 'europe-west1'
}, async (req, res) => {
    var _a, _b;
    try {
        // Prüfe Firestore-Verbindung
        const coinsSnapshot = await db.collection('coins').limit(1).get();
        const coinCount = (await db.collection('coins').get()).size;
        res.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            firestore: 'connected',
            totalCoins: coinCount,
            lastCoin: ((_b = (_a = coinsSnapshot.docs[0]) === null || _a === void 0 ? void 0 : _a.data()) === null || _b === void 0 ? void 0 : _b.last_updated) || null
        });
    }
    catch (error) {
        console.error('Health check failed:', error);
        res.status(500).json({
            status: 'unhealthy',
            error: error.toString(),
            timestamp: new Date().toISOString()
        });
    }
});
//# sourceMappingURL=index.js.map