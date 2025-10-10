import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const errorData = await request.json();

    // Log-Verzeichnis erstellen falls nicht vorhanden
    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Log-Datei mit aktuellem Datum
    const logFile = path.join(logDir, `errors-${new Date().toISOString().split('T')[0]}.log`);

    // Formatiere Log-Eintrag
    const logEntry = `
================================================================================
TIMESTAMP: ${errorData.timestamp || new Date().toISOString()}
MESSAGE: ${errorData.message}
SOURCE: ${errorData.source || 'Unknown'}
LINE: ${errorData.line || 'N/A'}
COLUMN: ${errorData.column || 'N/A'}
ERROR: ${errorData.error || 'N/A'}
REASON: ${errorData.reason || 'N/A'}
STACK:
${errorData.stack || 'No stack trace'}
================================================================================\n`;

    // In Datei schreiben
    fs.appendFileSync(logFile, logEntry);

    return NextResponse.json({ success: true, message: 'Error logged' });
  } catch (error) {
    console.error('Failed to log error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to log error' },
      { status: 500 }
    );
  }
}