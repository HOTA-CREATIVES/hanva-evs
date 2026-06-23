import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if variables are valid and not placeholder
const isFirebaseConfigured = 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "your-firebase-api-key" &&
  firebaseConfig.projectId && 
  firebaseConfig.projectId !== "your-firebase-project-id" &&
  !firebaseConfig.projectId.includes("your-firebase");

let app;
let db: any = null;
let isMock = true;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    isMock = false;
    console.log("Firebase initialized successfully using configured project ID:", firebaseConfig.projectId);
  } catch (error) {
    console.error("Firebase initialization failed, falling back to LocalStorage mock database:", error);
  }
} else {
  console.warn("Firebase credentials are not configured or contain placeholders. Running in LocalStorage mock database mode.");
}

// In-memory fallback / localStorage db emulator for local development and testing
class LocalStorageDbMock {
  private getStorageKey(collectionName: string): string {
    return `hanav_evs_db_${collectionName}`;
  }

  private getCollectionData(collectionName: string): any[] {
    const data = localStorage.getItem(this.getStorageKey(collectionName));
    return data ? JSON.parse(data) : [];
  }

  private setCollectionData(collectionName: string, data: any[]): void {
    localStorage.setItem(this.getStorageKey(collectionName), JSON.stringify(data));
  }

  async getDocs(collectionName: string): Promise<any[]> {
    return this.getCollectionData(collectionName);
  }

  async setDoc(collectionName: string, docId: string, data: any): Promise<void> {
    const current = this.getCollectionData(collectionName);
    const existingIndex = current.findIndex((item) => item.id === docId);
    const docData = { id: docId, ...data };
    
    if (existingIndex >= 0) {
      current[existingIndex] = docData;
    } else {
      current.push(docData);
    }
    
    this.setCollectionData(collectionName, current);
  }

  async addDoc(collectionName: string, data: any): Promise<any> {
    const id = `${collectionName.slice(0, -1) || 'doc'}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    await this.setDoc(collectionName, id, data);
    return { id, ...data };
  }

  async deleteDoc(collectionName: string, docId: string): Promise<void> {
    const current = this.getCollectionData(collectionName);
    const filtered = current.filter((item) => item.id !== docId);
    this.setCollectionData(collectionName, filtered);
  }
}

export const mockDb = new LocalStorageDbMock();

export { db, isMock };
export const appsScriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL || "";
