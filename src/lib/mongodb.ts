import { MongoClient, MongoClientOptions } from 'mongodb';

// Einfacher Mock-Client ohne jegliche Netzwerk-Aktivität
const createSimpleMockClient = (): MongoClient => {
  console.log('🔄 Verwende einfachen Mock-Client (kein Netzwerk)');
  return {
    db: (name?: string) => ({
      collection: (name: string) => ({
        find: () => ({ 
          toArray: () => Promise.resolve([]),
          limit: () => ({ toArray: () => Promise.resolve([]) }),
          sort: () => ({ toArray: () => Promise.resolve([]) })
        }),
        findOne: () => Promise.resolve(null),
        insertOne: () => Promise.resolve({ insertedId: 'mock' }),
        updateOne: () => Promise.resolve({ modifiedCount: 1 }),
        deleteOne: () => Promise.resolve({ deletedCount: 1 }),
        countDocuments: () => Promise.resolve(0)
      })
    }),
    close: () => Promise.resolve()
  } as any;
};

let clientPromise: Promise<MongoClient>;

// Erkenne Build-Umgebung - komplett ohne Netzwerk
const isBuildTime = (
  process.env.NODE_ENV === 'production' && (
    process.env.NETLIFY || 
    process.env.VERCEL || 
    process.env.CI ||
    process.env.NEXT_PHASE === 'phase-production-build' ||
    !process.env.MONGODB_URI
  )
) || process.env.SKIP_MONGODB === 'true';

if (isBuildTime) {
  console.log('🔧 Build-Modus - komplett ohne Netzwerk');
  // Direkter synchroner Mock-Client ohne Promise-Ketten
  clientPromise = Promise.resolve(createSimpleMockClient());
} else if (!process.env.MONGODB_URI) {
  console.log('⚠️ Keine MONGODB_URI - verwende Mock-Client');
  clientPromise = Promise.resolve(createSimpleMockClient());
} else if (process.env.NODE_ENV === 'development') {
  // Development mit echter MongoDB
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    console.log('🔄 Verbinde mit MongoDB (Development)...');
    const client = new MongoClient(process.env.MONGODB_URI, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
      tls: true,
      tlsAllowInvalidCertificates: true,
      tlsAllowInvalidHostnames: true,
    });
    
    globalWithMongo._mongoClientPromise = client.connect()
      .then((client) => {
        console.log('✅ MongoDB erfolgreich verbunden (Development)');
        return client;
      })
      .catch(err => {
        console.error('❌ MongoDB Verbindungsfehler (Development):', err.message);
        console.log('🔄 Fallback zu Mock-Client');
        return createSimpleMockClient();
      });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Production zur Laufzeit
  console.log('🔄 Verbinde mit MongoDB (Production)...');
  const client = new MongoClient(process.env.MONGODB_URI, {
    connectTimeoutMS: 15000,
    serverSelectionTimeoutMS: 15000,
    socketTimeoutMS: 20000,
    maxPoolSize: 10,
    minPoolSize: 1,
    retryWrites: true,
    retryReads: true,
    tls: true,
    tlsAllowInvalidCertificates: true,
    tlsAllowInvalidHostnames: true,
  });

  clientPromise = client.connect()
    .then((client) => {
      console.log('✅ MongoDB erfolgreich verbunden (Production)');
      return client;
    })
    .catch(err => {
      console.error('❌ MongoDB Verbindungsfehler (Production):', err.message);
      console.log('🔄 Fallback zu Mock-Client');
      return createSimpleMockClient();
    });
}

export default clientPromise; 