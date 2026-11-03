import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore/lite';
import { db } from './firebase.js';

function requireDatabase() {
  if (!db) {
    throw new Error('Firebase is not configured. Add your project settings to .env.');
  }

  return db;
}

function mapDocument(document) {
  return { id: document.id, ...document.data() };
}

export async function fetchCollection(collectionName) {
  try {
    const database = requireDatabase();
    const snapshot = await getDocs(collection(database, collectionName));
    return snapshot.docs.map(mapDocument);
  } catch (error) {
    console.error(`Unable to fetch ${collectionName}:`, error);
    throw new Error(`Could not load ${collectionName}. ${error.message}`);
  }
}

export async function ensureSamplePlaylist() {
  try {
    const database = requireDatabase();
    const sampleRef = doc(database, 'playlists', 'sample-sunday-softies');
    const sample = await getDoc(sampleRef);
    if (sample.exists()) return;

    await setDoc(sampleRef, {
      name: 'Sunday Softies',
      songs: ['Golden Hour', 'Coffee Breath', 'Bloom'],
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Unable to create the sample playlist:', error);
    throw new Error(`Could not prepare the sample playlist. ${error.message}`);
  }
}

export async function addRestaurantReview({ restaurantName, rating, comment }) {
  try {
    const database = requireDatabase();
    const review = {
      restaurantName: restaurantName.trim(),
      rating: Number(rating),
      comment: comment.trim(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    return await addDoc(collection(database, 'reviews'), review);
  } catch (error) {
    console.error('Unable to add restaurant review:', error);
    throw new Error(`Could not save your review. ${error.message}`);
  }
}

export async function updateRestaurantReview(reviewId, { rating, comment }) {
  try {
    const database = requireDatabase();
    await updateDoc(doc(database, 'reviews', reviewId), {
      rating: Number(rating),
      comment: comment.trim(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(`Unable to update review ${reviewId}:`, error);
    throw new Error(`Could not update your review. ${error.message}`);
  }
}
