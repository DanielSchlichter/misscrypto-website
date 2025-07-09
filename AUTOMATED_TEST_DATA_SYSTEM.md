# Automatisches Testdaten-Update-System (Vereinfacht)

## Übersicht

Das System aktualisiert automatisch alle 24 Stunden die Testdaten für die Kryptobörsen mit der CoinGecko API über Netlify Functions - **ohne MongoDB-Abhängigkeiten!**

## Vereinfachte Architektur
```
CoinGecko API → Netlify Function → Direkte Datei-Updates → Git Repository
```

## Komponenten

### 1. Netlify Function (`netlify/functions/update-test-data-daily.js`)
- **Zweck**: Automatische Aktualisierung der Testdaten
- **Ausführung**: Täglich um 6:00 UTC
- **Funktionalität**:
  - Holt aktuelle Marktdaten von CoinGecko API
  - Generiert realistische Preisverläufe für 24h, 7d, 30d
  - Überschreibt direkt die `getTestCoins()` Funktion in `src/app/api/coins/route.ts`
  - Aktualisiert `current_data.json` mit vollständigen Marktdaten

### 2. Coins API (`/api/coins`)
- **Funktionalität**: 
  - Verwendet aktualisierte Testdaten aus `getTestCoins()` als Fallback
  - Fallback zu MongoDB-Coins wenn verfügbar
  - Einfache, robuste Implementierung

## Konfiguration

### Netlify Configuration (`netlify.toml`)
```toml
# Testdaten-Update alle 24 Stunden um 6:00 UTC (direkte Datei-Updates)
[functions.update-test-data-daily]
  schedule = "0 6 * * *"
```

**Hinweis:** Scheduled Functions sind ein nativer Teil von Netlify Platform Primitives und benötigen kein separates Plugin.

### Umgebungsvariablen
- Keine speziellen Umgebungsvariablen erforderlich!
- `NETLIFY_FUNCTION_URL`: URL der Netlify Function (optional, für manuelle Auslösung)

## Verwendung

### Automatische Aktualisierung
Das System läuft automatisch täglich um 6:00 UTC und aktualisiert die Testdaten.

### Manuelle Aktualisierung

#### Über NPM-Script:
```bash
npm run update-test-data-netlify
```

#### Über cURL:
```bash
curl -X POST https://your-site.netlify.app/.netlify/functions/update-test-data-daily
```

#### Über lokales Script:
```bash
npm run update-test-data
```

### Testdaten abrufen
```javascript
// Über die Coins API (enthält automatisch die aktuellsten Testdaten)
const response = await fetch('/api/coins');
const coins = await response.json();
```

## Datenstrukturen

### Dateien

#### `src/app/api/coins/route.ts` - `getTestCoins()` Funktion:
```javascript
{
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'BTC',
  current_price: 92636,
  price_changes: {
    '24h': 0.76,
    '7d': 2.94,
    '30d': 0.12,
    '1y': 75.21
  },
  prices: {
    '24h': [Array of 24 prices],
    '7d': [Array of 7 prices],
    '30d': [Array of 30 prices],
    '1y': []
  },
  image: 'https://...',
  market_cap_rank: 1,
  last_updated: '2025-01-08T21:37:41.000Z'
}
```

#### `current_data.json`:
Vollständige CoinGecko-Marktdaten (Top 50 Coins)

## Monitoring

### Logs
- Netlify Function Logs: Verfügbar im Netlify Dashboard
- Application Logs: Console-Ausgaben bei API-Aufrufen

### Status prüfen
```bash
# Letzte Aktualisierung prüfen
curl https://your-site.netlify.app/api/coins | jq '.[0].last_updated'

# Function-Status prüfen
curl -I https://your-site.netlify.app/.netlify/functions/update-test-data-daily

# Lokale Testdaten prüfen
npm run test-automated-system
```

## Fehlerbehebung

### Häufige Probleme

1. **CoinGecko API Rate Limit**
   - System hat Retry-Mechanismus mit Delays
   - Bei häufigen Fehlern: Delays in der Function erhöhen

2. **Scheduled Function läuft nicht**
   - Prüfe Netlify Plugin Installation
   - Überprüfe Cron-Syntax in `netlify.toml`

3. **Datei-Updates schlagen fehl**
   - Prüfe Dateiberechtigungen
   - Überprüfe Netlify Build-Prozess

### Debug-Modus
```javascript
// In der Netlify Function
console.log('DEBUG: Marktdaten:', marketData.length);
console.log('DEBUG: Testdaten:', testCoins.length);
console.log('DEBUG: Dateien aktualisiert:', filesUpdated);
```

## Sicherheit

- Alle API-Aufrufe verwenden HTTPS
- Keine externen Datenbank-Abhängigkeiten
- Keine sensiblen Daten in den Logs
- CORS-Header für sichere Frontend-Kommunikation

## Performance

- **Einfachheit**: Direkte Datei-Updates ohne Datenbank-Overhead
- **Geschwindigkeit**: Keine Netzwerk-Latenz zu externen Datenbanken
- **Fallback**: Testdaten sind immer verfügbar (in Code eingebettet)
- **Rate Limiting**: Respektiert CoinGecko API-Limits

## Wartung

### Regelmäßige Aufgaben
1. Netlify Function-Logs prüfen
2. CoinGecko API-Status überwachen
3. Testdaten-Qualität überprüfen
4. Git-Repository für Änderungen überwachen

### Updates
- Neue Coins hinzufügen: `topCoins.filter()` anpassen
- Zeitplan ändern: `netlify.toml` bearbeiten
- Datenstruktur erweitern: `getTestCoins()` Funktion anpassen

### Backup & Wiederherstellung
- Code-Backups über Git-Repository (enthält alle Testdaten)
- `current_data.json` als Backup der vollständigen Marktdaten
- Einfache Wiederherstellung durch Git-Commits 