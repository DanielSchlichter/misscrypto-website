#!/bin/bash

# Gehe zum Projektverzeichnis
cd /Users/danielschlichter/Desktop/MissCrypto/misscrypto

# Stelle sicher, dass die richtige Node-Version verwendet wird
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use

# Führe das Update-Skript aus
npm run update-crypto >> /var/log/crypto-update.log 2>&1 