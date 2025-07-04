# Crypto Update System - Dokumentation

## Übersicht

Das System nutzt echte CoinGecko API-Daten und speichert sie in MongoDB. Die Daten werden täglich automatisch aktualisiert und zeigen die **echten Top-Performer** basierend auf 1-Jahres-Performance.

## ✅ Was wurde implementiert

### 1. **Automatische tägliche Updates**
- **Netlify Scheduled Function** (`netlify/functions/update-crypto-daily.js`)
- Läuft täglich um **2:00 UTC**
- Holt Top 50 Coins von CoinGecko API
- Filtert Stablecoins heraus
- **Sortiert nach 1-Jahres-Performance** (nicht Market Cap!)
- Speichert Top 25 Performer in MongoDB

### 2. **Echte Top-Performer im Investment Calculator**
- `/api/coins` nutzt jetzt **echte MongoDB-Daten**
- Sortierung nach **1-Jahres-Performance** (höchste zuerst)
- Investment Calculator zeigt **echte Top 10/Top 5 Performer**
- Historische Preisdaten aus CoinGecko API

### 3. **Manuelle Trigger-Function**
- `netlify/functions/trigger-crypto-update.js`
- Für sofortige Updates ohne zu warten
- Authentifizierung über `CRON_SECRET` Umgebungsvariable

## 🔧 Setup & Deployment

### 1. Dependencies installieren
```bash
npm install @netlify/functions @netlify/plugin-scheduled-functions
```

### 2. Umgebungsvariablen in Netlify setzen
```
MONGODB_URI=mongodb+srv://...
CRON_SECRET=dein-geheimer-schluessel
```

### 3. Netlify Deployment
- Das System ist automatisch aktiviert nach dem nächsten Deployment
- Scheduled Functions werden automatisch erkannt

## 📊 Funktionalität

### Automatic Updates (täglich 2:00 UTC)
1. **API-Abfrage**: Top 50 Coins von CoinGecko
2. **Filterung**: Entfernt Stablecoins (USDT, USDC, etc.)
3. **Sortierung**: Nach 1-Jahres-Performance (höchste zuerst)
4. **Speicherung**: Top 25 Performer in MongoDB
5. **Charts**: Sammelt historische Daten für 24h, 7d, 30d, 1y

### Investment Calculator
- **Top 10 Performer**: Zeigt echte Top 10 basierend auf 1-Jahres-Performance
- **Top 5 Performer**: Zeigt echte Top 5 basierend auf 1-Jahres-Performance
- **Echte Daten**: Aus MongoDB statt Mock-Daten
- **Sortierung**: Nach Performance, nicht Market Cap

## 🚀 Manuelle Updates

### Über Netlify Function
```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  https://your-site.netlify.app/.netlify/functions/trigger-crypto-update
```

### Lokal (Development)
```bash
npm run update-crypto
```

## 📋 Monitoring

### Logs überprüfen
- Netlify Functions Logs zeigen Update-Status
- Console-Logs zeigen Top 5 Performer nach jedem Update

### Datenbank überprüfen
- MongoDB Collection: `misscrypto.coins`
- Sortiert nach `price_changes.1y` (absteigend)

## 🔍 API-Endpoints

### `/api/coins`
- **Rückgabe**: Coins sortiert nach 1-Jahres-Performance
- **Fallback**: Mock-Daten wenn MongoDB nicht verfügbar
- **Format**: Standardisiert für Investment Calculator

### Rate Limiting
- **CoinGecko**: 20 Sekunden zwischen API-Calls
- **Retry-Mechanismus**: 3 Versuche bei Fehlern
- **Timeout-Handling**: Graceful degradation

## 🎯 Erwartete Ergebnisse

### Echte Top-Performer (Beispiel)
1. **Coin A**: +245% (1 Jahr)
2. **Coin B**: +189% (1 Jahr)
3. **Coin C**: +156% (1 Jahr)
4. **Coin D**: +134% (1 Jahr)
5. **Coin E**: +98% (1 Jahr)

### Investment Calculator
- **Top 10**: Zeigt die 10 besten Performer der letzten 12 Monate
- **Top 5**: Zeigt die 5 besten Performer der letzten 12 Monate
- **Umschaltung**: Funktioniert jetzt korrekt zwischen den Modi
- **Chart**: Zeigt realistische Portfolio-Entwicklung

## 🔧 Troubleshooting

### Keine Daten im Calculator
1. Prüfe MongoDB-Verbindung
2. Trigger manuelles Update
3. Checke Netlify Function Logs

### Mock-Daten werden angezeigt
- MongoDB nicht erreichbar → Automatischer Fallback
- Normale Funktion, bis echte Daten verfügbar sind

### Rate Limiting Errors
- CoinGecko API-Limits erreicht
- System wartet automatisch und versucht erneut

## 📈 Nächste Schritte

1. **Deploy** das Update auf Netlify
2. **Trigger** erste manuelle Aktualisierung
3. **Teste** den Investment Calculator
4. **Überwache** tägliche Updates

Das System ist jetzt bereit für echte Top-Performer-Daten! 🚀 