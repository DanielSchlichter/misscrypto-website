import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  Timestamp,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import { db } from './firebase';

// Crypto Coins Collection
export const coinsCollection = collection(db, 'coins');
export const analyticsCollection = collection(db, 'analytics');
export const newsfeedCollection = collection(db, 'newsfeed');

// Hilfsfunktionen für Crypto Coins
export async function getCryptoCoins() {
  try {
    const querySnapshot = await getDocs(
      query(coinsCollection, orderBy('price_changes.1y', 'desc'))
    );
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error: any) {
    console.error('Fehler beim Laden der Crypto Coins:', error);
    
    // Bei Permission-Fehlern: Leere Liste zurückgeben (Fallback zu Testdaten)
    if (error?.code === 'permission-denied') {
      console.log('⚠️  Firestore Permission-Fehler - verwende Fallback');
      return [];
    }
    
    return [];
  }
}

export async function saveCryptoCoins(coins: any[]) {
  try {
    // Lösche alle bestehenden Coins erstmal (für einfache Migration)
    const existingCoins = await getDocs(coinsCollection);
    const deletePromises = existingCoins.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    
    // Füge neue Coins hinzu
    const addPromises = coins.map(coin => addDoc(coinsCollection, {
      ...coin,
      last_updated: Timestamp.now()
    }));
    
    await Promise.all(addPromises);
    console.log(`✅ ${coins.length} Crypto Coins in Firestore gespeichert`);
    return true;
  } catch (error: any) {
    console.error('Fehler beim Speichern der Crypto Coins:', error);
    
    if (error?.code === 'permission-denied') {
      console.log('⚠️  Firestore Permission-Fehler beim Speichern');
    }
    
    return false;
  }
}

// Analytics Funktionen
export async function saveAnalyticsEvent(event: {
  type: 'page_view' | 'exchange_click';
  page?: string;
  exchange?: string;
  sessionId: string;
  userAgent?: string;
  ip?: string;
}) {
  try {
    // Filtere undefined Werte heraus
    const cleanEvent: any = {
      type: event.type,
      sessionId: event.sessionId,
      timestamp: Timestamp.now()
    };
    
    if (event.page) cleanEvent.page = event.page;
    if (event.exchange) cleanEvent.exchange = event.exchange;
    if (event.userAgent) cleanEvent.userAgent = event.userAgent;
    if (event.ip) cleanEvent.ip = event.ip;
    
    await addDoc(analyticsCollection, cleanEvent);
    return true;
  } catch (error: any) {
    console.error('Fehler beim Speichern des Analytics Events:', error);
    
    if (error?.code === 'permission-denied') {
      console.log('⚠️  Firestore Permission-Fehler bei Analytics');
    }
    
    return false;
  }
}

export async function getAnalyticsData(startDate?: Date, endDate?: Date) {
  try {
    let constraints: QueryConstraint[] = [orderBy('timestamp', 'desc')];
    
    if (startDate) {
      constraints.push(where('timestamp', '>=', Timestamp.fromDate(startDate)));
    }
    if (endDate) {
      constraints.push(where('timestamp', '<=', Timestamp.fromDate(endDate)));
    }
    
    const querySnapshot = await getDocs(query(analyticsCollection, ...constraints));
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate()
    }));
  } catch (error: any) {
    console.error('Fehler beim Laden der Analytics Daten:', error);
    
    if (error?.code === 'permission-denied') {
      console.log('⚠️  Firestore Permission-Fehler bei Analytics-Abfrage');
    }
    
    return [];
  }
}

// Newsfeed Funktionen
export async function getNewsfeedPosts(status?: string, limitCount: number = 10, skipCount: number = 0) {
  try {
    let constraints: QueryConstraint[] = [
      orderBy('publishedAt', 'desc'),
      orderBy('createdAt', 'desc')
    ];
    
    if (status) {
      constraints.unshift(where('status', '==', status));
    }
    
    if (limitCount > 0) {
      constraints.push(limit(limitCount));
    }
    
    const querySnapshot = await getDocs(query(newsfeedCollection, ...constraints));
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error: any) {
    console.error('Fehler beim Laden der Newsfeed Posts:', error);
    
    if (error?.code === 'permission-denied') {
      console.log('⚠️  Firestore Permission-Fehler bei Newsfeed-Abfrage');
    }
    
    return [];
  }
}

export async function getNewsfeedPostBySlug(slug: string) {
  try {
    const querySnapshot = await getDocs(
      query(newsfeedCollection, where('slug', '==', slug))
    );
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const doc = querySnapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    };
  } catch (error: any) {
    console.error('Fehler beim Laden des Newsfeed Posts:', error);
    
    if (error?.code === 'permission-denied') {
      console.log('⚠️  Firestore Permission-Fehler bei Post-Abfrage');
    }
    
    return null;
  }
}

export async function createNewsfeedPost(post: any) {
  try {
    const docRef = await addDoc(newsfeedCollection, {
      ...post,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      publishedAt: post.status === 'published' ? Timestamp.now() : null
    });
    
    return {
      success: true,
      id: docRef.id
    };
  } catch (error: any) {
    console.error('Fehler beim Erstellen des Newsfeed Posts:', error);
    
    if (error?.code === 'permission-denied') {
      console.log('⚠️  Firestore Permission-Fehler beim Post erstellen');
    }
    
    return {
      success: false,
      error: error.message
    };
  }
}

export async function incrementPostViews(slug: string) {
  try {
    const post = await getNewsfeedPostBySlug(slug);
    if (post) {
      const docRef = doc(newsfeedCollection, post.id);
      await updateDoc(docRef, {
        views: ((post as any).views || 0) + 1
      });
    }
    return true;
  } catch (error: any) {
    console.error('Fehler beim Erhöhen der Post Views:', error);
    
    if (error?.code === 'permission-denied') {
      console.log('⚠️  Firestore Permission-Fehler bei View-Update');
    }
    
    return false;
  }
} 