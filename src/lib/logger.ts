import fs from 'fs';
import path from 'path';

const LOG_DIR = path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, `app-${new Date().toISOString().split('T')[0]}.log`);

// Erstelle logs Verzeichnis falls es nicht existiert
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

export function logToFile(type: 'info' | 'error' | 'debug', message: string, data?: any) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    type,
    message,
    data: data ? JSON.stringify(data, null, 2) : undefined,
    stack: new Error().stack
  };

  const logLine = `[${timestamp}] [${type.toUpperCase()}] ${message}${data ? '\nData: ' + JSON.stringify(data, null, 2) : ''}\n`;

  // In Datei schreiben
  try {
    fs.appendFileSync(LOG_FILE, logLine);
  } catch (error) {
    console.error('Failed to write to log file:', error);
  }

  // Auch in Console ausgeben
  if (type === 'error') {
    console.error(`[LOG] ${message}`, data);
  } else {
    console.log(`[LOG] ${message}`, data);
  }
}

export const logger = {
  info: (message: string, data?: any) => logToFile('info', message, data),
  error: (message: string, data?: any) => logToFile('error', message, data),
  debug: (message: string, data?: any) => logToFile('debug', message, data),
};