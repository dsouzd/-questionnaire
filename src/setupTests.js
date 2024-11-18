import { vi } from "vitest";
import "@testing-library/jest-dom";

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(() => "mockCollectionRef"),
  addDoc: vi.fn(async (collectionRef, userData) => {
    console.log(`Mock addDoc called with:`, userData);
    return Promise.resolve({ id: "mockUserId" });
  }),
}));
