# 🔥 Firebase Admin Setup für MissCrypto

## 🚨 Aktuelles Problem
Firebase Admin SDK kann nicht authentifizieren, daher funktioniert die Benutzerverwaltung nicht.

## ✅ Lösung: Service Account erstellen

### Schritt 1: Firebase Console öffnen
1. Gehen Sie zu: https://console.firebase.google.com/project/misscrypto-bd419
2. Klicken Sie auf das Zahnrad-Symbol ⚙️ → "Projekteinstellungen"

### Schritt 2: Service Account erstellen
1. Gehen Sie zum Tab "Dienstkonten"
2. Klicken Sie auf "Neuen privaten Schlüssel generieren"
3. Laden Sie die JSON-Datei herunter

### Schritt 3: Credentials in .env.local hinzufügen
Öffnen Sie die heruntergeladene JSON-Datei und fügen Sie folgende Zeilen zu `.env.local` hinzu:

```env
# Firebase Admin Service Account
FIREBASE_PRIVATE_KEY_ID="hier_die_private_key_id_einfügen"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nhier_den_private_key_einfügen\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@misscrypto-bd419.iam.gserviceaccount.com"
FIREBASE_CLIENT_ID="hier_die_client_id_einfügen"
```

### Schritt 4: Server neu starten
```bash
# Server stoppen (Ctrl+C) und neu starten
npm run dev
```

## 🎯 Danach sollte funktionieren:
- ✅ Firebase Admin wird initialisiert
- ✅ Benutzer können geladen werden
- ✅ Neue Benutzer können erstellt werden
- ✅ Button "Neuen Admin erstellen" funktioniert

## 🔧 Alternative: Minimale Test-Konfiguration
Falls Sie schnell testen möchten, können Sie temporär diese Test-Werte verwenden:

```env
# ACHTUNG: Nur für Tests, nicht für Production!
FIREBASE_PRIVATE_KEY_ID="test-key-id"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nTEST\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="test@misscrypto-bd419.iam.gserviceaccount.com"
FIREBASE_CLIENT_ID="123456789"
```

## 📞 Bei Problemen:
- Überprüfen Sie die Firebase Console Logs
- Stellen Sie sicher, dass das Projekt "misscrypto-bd419" existiert
- Überprüfen Sie die Syntax der .env.local Datei 