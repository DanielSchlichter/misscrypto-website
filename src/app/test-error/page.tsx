'use client';

import { useEffect } from 'react';

export default function TestErrorPage() {
  useEffect(() => {
    // Test-Fehler nach 2 Sekunden werfen
    setTimeout(() => {
      console.log('Throwing test error...');
      throw new Error('TEST ERROR: This is a test error to check logging');
    }, 2000);
  }, []);

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1>Test Error Page</h1>
      <p>Ein Fehler wird in 2 Sekunden geworfen...</p>
      <p>Check die logs/ Dateien!</p>
    </div>
  );
}