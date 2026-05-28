import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Define the shape of our form inquiry data
export interface InquiryData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  timestamp?: Date;
}

// Google Apps Script Web App URL - Paste your deployed Apps Script URL here!
export const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxoK-NnF7K0gXzI9pP3T9T4a1b0c_d5e6f7g8h9i0/exec"; // Placeholder

// Firebase configuration using Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
};

// Check if valid credentials are provided
const isFirebaseConfigured = 
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.projectId !== "YOUR_PROJECT_ID";

let app;
let db: any = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(app);
    console.log("Firebase Firestore successfully initialized.");
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
  }
} else {
  console.warn(
    "Firebase environment variables are missing. All submissions will fall back to LocalStorage and Apps Script only."
  );
}

export { db };

/**
 * Submits an inquiry to both Google Apps Script and Firebase Firestore.
 * Falls back to LocalStorage in case of offline status or configuration absence.
 */
export async function submitInquiry(data: InquiryData): Promise<{
  success: boolean;
  appsScriptSuccess: boolean;
  firestoreSuccess: boolean;
  message: string;
}> {
  const submissionData = {
    ...data,
    timestamp: new Date().toISOString(),
  };

  let appsScriptSuccess = false;
  let firestoreSuccess = false;
  let errorMsg = "";

  // 1. Submit to Google Apps Script
  if (APPS_SCRIPT_URL && !APPS_SCRIPT_URL.includes("AKfycbxoK-NnF7K0gXzI9pP3T9T4a1b0c_d5e6f7g8h9i0")) {
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Crucial for posting to Google Apps Script Web Apps without preflight headaches
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });
      
      // Since mode is 'no-cors', we won't get the response status directly, but fetch succeeding means request was sent
      appsScriptSuccess = true;
    } catch (err: any) {
      console.error("Apps Script Submission failed:", err);
      errorMsg += `Apps Script: ${err.message || err}. `;
    }
  } else {
    console.warn("Google Apps Script URL is empty or using placeholder. Skipping Apps Script.");
  }

  // 2. Submit to Firebase Firestore
  if (db) {
    try {
      const docRef = await addDoc(collection(db, "inquiries"), submissionData);
      console.log("Firestore Document written with ID: ", docRef.id);
      firestoreSuccess = true;
    } catch (err: any) {
      console.error("Firestore Submission failed:", err);
      errorMsg += `Firestore: ${err.message || err}. `;
    }
  }

  // 3. Store in LocalStorage (Always do this as an immutable local history/backup!)
  try {
    const existingStr = localStorage.getItem("haanav_eviors_inquiries");
    const existing = existingStr ? JSON.parse(existingStr) : [];
    existing.push(submissionData);
    localStorage.setItem("haanav_eviors_inquiries", JSON.stringify(existing));
  } catch (err) {
    console.error("LocalStorage write failed:", err);
  }

  const success = appsScriptSuccess || firestoreSuccess;

  return {
    success: success || !isFirebaseConfigured, // If firebase is not configured, we consider LocalStorage backup as a local success
    appsScriptSuccess,
    firestoreSuccess,
    message: success 
      ? "Your premium inquiry has been securely sent. A design consultant will connect with you shortly." 
      : `Submitting inquiry locally. ${errorMsg || "Stored successfully in LocalStorage."}`,
  };
}

/**
 * Returns all submitted inquiries from LocalStorage.
 * Handy for viewing local leads in the admin dashboard when offline.
 */
export function getLocalInquiries(): InquiryData[] {
  try {
    const data = localStorage.getItem("haanav_eviors_inquiries");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
