// Globale Error-Handling-Utilities

export interface ErrorInfo {
  message: string;
  stack?: string;
  name: string;
  filename?: string;
  lineno?: number;
  colno?: number;
}

export class GlobalErrorHandler {
  private static instance: GlobalErrorHandler;
  private errorCount: Map<string, number> = new Map();
  private maxRetries = 3;

  static getInstance(): GlobalErrorHandler {
    if (!GlobalErrorHandler.instance) {
      GlobalErrorHandler.instance = new GlobalErrorHandler();
    }
    return GlobalErrorHandler.instance;
  }

  handleError(error: Error | ErrorInfo, context?: string): void {
    const errorKey = `${error.name}:${error.message}`;
    const count = this.errorCount.get(errorKey) || 0;

    // Ignoriere bekannte harmlose Fehler
    if (this.isHarmlessError(error)) {
      console.warn(`Harmloser Fehler ignoriert: ${error.message}`);
      return;
    }

    // Begrenze die Anzahl der gleichen Fehler
    if (count >= this.maxRetries) {
      console.error(`Fehler ${errorKey} wurde ${count} mal aufgetreten - weitere werden ignoriert`);
      return;
    }

    this.errorCount.set(errorKey, count + 1);

    // Logge den Fehler
    console.error(`[${context || 'Global'}] Fehler:`, {
      name: error.name,
      message: error.message,
      stack: error.stack,
      filename: (error as ErrorInfo).filename,
      lineno: (error as ErrorInfo).lineno,
      colno: (error as ErrorInfo).colno,
      count: count + 1
    });

    // Spezielle Behandlung für bestimmte Fehlertypen
    this.handleSpecificError(error);
  }

  private isHarmlessError(error: Error | ErrorInfo): boolean {
    const harmlessPatterns = [
      /share-modal\.js/,
      /addEventListener.*null/,
      /Cannot read properties of null/,
      /Failed to fetch.*RSC payload/,
      /AbortError.*signal is aborted/
    ];

    return harmlessPatterns.some(pattern => 
      pattern.test(error.message) || 
      pattern.test((error as ErrorInfo).filename || '')
    );
  }

  private handleSpecificError(error: Error | ErrorInfo): void {
    // Share-Modal Fehler
    if (error.message.includes('share-modal.js') || (error as ErrorInfo).filename?.includes('share-modal.js')) {
      console.warn('Share-Modal Script Fehler - wird ignoriert');
      return;
    }

    // addEventListener Fehler
    if (error.message.includes('addEventListener') && error.message.includes('null')) {
      console.warn('DOM-Element nicht verfügbar für addEventListener - wird ignoriert');
      return;
    }

    // Network Fehler
    if (error.message.includes('Failed to fetch')) {
      console.warn('Network-Fehler - möglicherweise temporär');
      return;
    }

    // AbortError
    if (error.name === 'AbortError') {
      console.warn('Request wurde abgebrochen - normal bei Navigation');
      return;
    }
  }

  // Cleanup für Memory Management
  cleanup(): void {
    this.errorCount.clear();
  }
}

// Globale Instanz
export const globalErrorHandler = GlobalErrorHandler.getInstance();

// Utility-Funktionen
export const safeAddEventListener = (
  element: Element | null,
  event: string,
  handler: EventListener,
  options?: AddEventListenerOptions
): void => {
  if (!element) {
    console.warn(`Element ist null für Event: ${event}`);
    return;
  }

  try {
    element.addEventListener(event, handler, options);
  } catch (error) {
    globalErrorHandler.handleError(error as Error, 'safeAddEventListener');
  }
};

export const safeRemoveEventListener = (
  element: Element | null,
  event: string,
  handler: EventListener,
  options?: EventListenerOptions
): void => {
  if (!element) {
    return;
  }

  try {
    element.removeEventListener(event, handler, options);
  } catch (error) {
    globalErrorHandler.handleError(error as Error, 'safeRemoveEventListener');
  }
};

// Fetch mit besserem Error-Handling
export const safeFetch = async (
  url: string,
  options?: RequestInit,
  retries = 3
): Promise<Response> => {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          ...options?.headers
        }
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error: any) {
      if (i === retries - 1) {
        throw error;
      }

      if (error.name === 'AbortError') {
        console.warn(`Request Timeout (Versuch ${i + 1}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
      } else {
        console.warn(`Fetch-Fehler (Versuch ${i + 1}/${retries}):`, error.message);
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }

  throw new Error(`Fetch fehlgeschlagen nach ${retries} Versuchen`);
};
