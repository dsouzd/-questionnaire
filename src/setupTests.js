// src/setupTests.js
import { vi } from 'vitest';
import '@testing-library/jest-dom';


// Mock Firestore methods used in FirebaseContext
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(() => 'mockCollectionRef'),
  addDoc: vi.fn(async (collectionRef, userData) => {
    console.log(`Mock addDoc called with:`, userData);
    return Promise.resolve({ id: 'mockUserId' });
  }),
}));
