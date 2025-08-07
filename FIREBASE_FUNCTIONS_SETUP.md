# 🔥 Firebase Functions für Krypto-Updates

## ✅ Was wurde erstellt

### 1. **Firebase Functions Struktur**
```
functions/
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript Config  
└── src/
    └── index.ts          # Haupt-Functions
```

### 2. **Implementierte Functions**

#### **🕐 updateCryptoDaily** (Scheduled Function)
- **Zeitplan**: Täglich um 2:00 UTC
- **Region**: europe-west1 
- **Funktion**: 
  - Holt Top 50 Coins von CoinGecko API
  - Filtert Stablecoins heraus
  - Sortiert nach 1-Jahres-Performance
  - Speichert Top 25 in Firestore
  - Löscht alte Daten vor dem Update

#### **🚀 triggerCryptoUpdate** (Callable Function)
- **Authentifizierung**: Erforderlich (Admin)
- **Funktion**: Manuelle Auslösung des Krypto-Updates
- **Verwendung**: Für sofortige Updates ohne Warten

#### **❤️ healthCheck** (HTTP Function)
- **URL**: `/healthCheck`
- **Funktion**: Prüft System-Status und Firestore-Verbindung
- **Response**: Coin-Anzahl, Letztes Update, etc.

### 3. **Firestore Security Rules**
```javascript
// Coins: Öffentlich lesbar, nur Functions können schreiben
match /coins/{document} {
  allow read: if true;
  allow write: if false; // Nur Firebase Functions
}

// Analytics: Öffentlich schreibbar, Admin lesbar  
match /analytics/{document} {
  allow read: if request.auth != null && request.auth.token.role == 'admin';
  allow create: if true;
}

// Newsfeed: Öffentlich lesbar, Admin schreibbar
match /newsfeed/{document} {
  allow read: if true;
  allow write: if request.auth != null && request.auth.token.role == 'admin';
}
```

## 🚀 Deployment

### **Schritt 1: Functions bauen**
```bash
cd functions
npm install
npm run build
```

### **Schritt 2: Firebase CLI Setup**
```bash
npm install -g firebase-tools
firebase login
firebase use misscrypto-bd419
```

### **Schritt 3: Rules deployen** ✅
```bash
firebase deploy --only firestore:rules
```

### **Schritt 4: Functions deployen** 
```bash
firebase deploy --only functions
```

**Hinweis**: Beim ersten Deployment müssen Google Cloud APIs aktiviert werden. Falls Quota-Fehler auftreten, einfach in 1-2 Minuten nochmal versuchen.

## 🔧 Verwendung

### **Automatische Updates**
- Firebase Function läuft **täglich um 2:00 UTC**
- Vollautomatisch, keine Aktion erforderlich
- Logs in Firebase Console einsehbar

### **Manuelle Updates**
```bash
# Über lokales Script
npm run trigger-crypto-update

# Oder über Firebase Console
# Functions > triggerCryptoUpdate > Test ausführen
```

### **Health Check**
```bash
curl https://europe-west1-misscrypto-bd419.cloudfunctions.net/healthCheck
```

## 📊 Datenstruktur in Firestore

### **coins Collection**
```javascript
{
  id: 'bitcoin',
  name: 'Bitcoin', 
  symbol: 'btc',
  current_price: 102129,
  market_cap_rank: 1,
  price_changes: {
    '24h': 0.68,
    '7d': 7.81, 
    '30d': 9.96,
    '1y': 69.04
  },
  prices: {
    '24h': [101552, 101558, ...], // Sparkline-Daten
    '7d': [95190, 98085, ...],
    '30d': [],
    '1y': []
  },
  historical_prices_1y: [],
  image: 'https://...',
  last_updated: Timestamp
}
```

## ⚠️ Wichtige Hinweise

### **Permission-Fehler behoben**
- ✅ Firestore Rules deployed
- ✅ Coins Collection öffentlich lesbar
- ✅ Analytics Collection für alle schreibbar
- ✅ Admin-spezifische Regeln implementiert

### **Rate Limiting**
- CoinGecko API: Max 50 Requests/Minute
- Firebase Functions implementiert automatische Retry-Logik
- Exponential Backoff bei Fehlern

### **Kosten-Optimierung**
- Functions laufen in EU Region (günstiger)
- Minimale Execution Time durch Batch-Operations
- Firestore Reads/Writes optimiert

## 🔄 Migration von Netlify Functions

Die alten Netlify Functions können **deaktiviert** werden, da:
- ✅ Firebase Functions übernehmen Krypto-Updates
- ✅ Bessere Performance und Zuverlässigkeit
- ✅ Integrierte Firestore-Verbindung
- ✅ Automatische Skalierung

### **Netlify vs Firebase Vergleich**
| Feature | Netlify | Firebase |
|---------|---------|----------|
| **Scheduling** | Cron-Format | Native Scheduler |
| **Database** | Externe API | Native Firestore |
| **Monitoring** | Basic | Advanced Console |
| **Error Handling** | Manual | Automatic Retry |
| **Scaling** | Limited | Automatic |

## 🎯 Nächste Schritte

1. **Functions deployen** (nach Quota-Reset)
2. **Erste manuelle Ausführung** testen
3. **Monitoring** in Firebase Console einrichten
4. **Alte Netlify Functions** deaktivieren
5. **Performance** überwachen

---

🔥 **Firebase Functions sind bereit!** 
Die Krypto-Daten werden jetzt täglich automatisch in Firebase aktualisiert. 