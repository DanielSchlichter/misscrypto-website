import { MongoClient, MongoClientOptions } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Bitte MONGODB_URI in der .env-Datei definieren');
}

const uri = process.env.MONGODB_URI;

// Robuste Optionen für MongoDB Atlas
const options: MongoClientOptions = {
  // Grundlegende Verbindungsoptionen
  connectTimeoutMS: 30000,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  
  // Pool-Konfiguration
  maxPoolSize: 10,
  minPoolSize: 1,
  maxIdleTimeMS: 30000,
  
  // Retry-Konfiguration
  retryWrites: true,
  retryReads: true,
  
  // Heartbeat-Konfiguration
  heartbeatFrequencyMS: 10000,
  
  // Kompression
  compressors: ['zlib'],
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect()
      .then((client) => {
        console.log('✅ MongoDB erfolgreich verbunden (Development)');
        return client;
      })
      .catch(err => {
        console.error('❌ MongoDB Verbindungsfehler:', err.message);
        if (err.message.includes('SSL') || err.message.includes('TLS')) {
          console.error('💡 SSL/TLS-Fehler: Überprüfe die MongoDB Atlas Konfiguration');
        }
        throw err;
      });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .then((client) => {
      console.log('✅ MongoDB erfolgreich verbunden (Production)');
      return client;
    })
    .catch(err => {
      console.error('❌ MongoDB Verbindungsfehler:', err.message);
      if (err.message.includes('SSL') || err.message.includes('TLS')) {
        console.error('💡 SSL/TLS-Fehler: Überprüfe die MongoDB Atlas Konfiguration');
      }
      throw err;
    });
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise; 