'use client';

import { useEffect } from 'react';

export default function ErrorLogger() {
  useEffect(() => {
    // Log alle unbehandelten Fehler
    const handleError = (event: ErrorEvent) => {
      const errorData = {
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
        error: event.error?.toString(),
        stack: event.error?.stack,
        timestamp: new Date().toISOString()
      };

      console.error('🔴 Global Error:', errorData);

      // Sende Fehler an API zum Loggen
      fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorData)
      }).catch(err => console.error('Failed to log error:', err));
    };

    // Log alle Promise-Rejections
    const handleRejection = (event: PromiseRejectionEvent) => {
      const errorData = {
        message: 'Unhandled Promise Rejection',
        reason: event.reason?.toString(),
        stack: event.reason?.stack,
        timestamp: new Date().toISOString()
      };

      console.error('🔴 Promise Rejection:', errorData);

      // Sende Fehler an API zum Loggen
      fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorData)
      }).catch(err => console.error('Failed to log rejection:', err));
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return null;
}