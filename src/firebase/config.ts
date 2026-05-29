import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  deleteDoc, 
  doc, 
  setDoc 
} from "firebase/firestore";

// Define the shape of our form inquiry data
export interface InquiryData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  timestamp?: string;
}

// Portfolios interface requested by user
export interface PortfolioItem {
  id: string; // primary key
  rank: number; // index
  title: string; // index
  description: string;
  img: string; // replacing src
  category: string;
  tags: string[];
}

// Testimonials interface requested by user
export interface TestimonialItem {
  id: string; // primary key
  rank: number; // index
  name: string; // index
  description: string; // replacing quote
  workingtitle: string; // combination of role/company or single string
  tags: string[];
  portfolioId?: string; // Foreign key referencing PortfolioItem.id (relationship)
}

// Google Apps Script Web App URL - configure via Vite env var `VITE_APPS_SCRIPT_URL`
export const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || "";

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
    "Firebase environment variables are missing. All submissions will fall back to Apps Script only.",
  );
}

export { db };

/**
 * Submits an inquiry to both Google Apps Script and Firebase Firestore.
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
  if (APPS_SCRIPT_URL) {
    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });
      appsScriptSuccess = true;
    } catch (err: any) {
      console.error("Apps Script Submission failed:", err);
      errorMsg += `Apps Script: ${err.message || err}. `;
    }
  } else {
    console.warn(
      "Google Apps Script URL is not set. Skipping Apps Script submission.",
    );
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

  const success = appsScriptSuccess || firestoreSuccess;

  return {
    success: success || !isFirebaseConfigured,
    appsScriptSuccess,
    firestoreSuccess,
    message: success
      ? "Your premium inquiry has been securely sent. A design consultant will connect with you shortly."
      : `Submitting inquiry locally. ${errorMsg || "Stored successfully."}`,
  };
}

/**
 * Returns all submitted inquiries from Firestore.
 */
export async function getFirestoreInquiries(): Promise<InquiryData[]> {
  if (!db) return [];
  try {
    const q = query(collection(db, "inquiries"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const inquiries: InquiryData[] = [];
    querySnapshot.forEach((docSnap) => {
      inquiries.push({
        id: docSnap.id,
        ...docSnap.data(),
      } as any);
    });
    return inquiries;
  } catch (error) {
    console.error("Failed to fetch inquiries from Firestore:", error);
    return [];
  }
}

/**
 * Deletes an inquiry from Firestore.
 */
export async function deleteFirestoreInquiry(id: string): Promise<boolean> {
  if (!db) return false;
  try {
    await deleteDoc(doc(db, "inquiries", id));
    return true;
  } catch (error) {
    console.error("Failed to delete inquiry from Firestore:", error);
    return false;
  }
}

/**
 * Clears all inquiries from Firestore.
 */
export async function clearAllFirestoreInquiries(): Promise<boolean> {
  if (!db) return false;
  try {
    const querySnapshot = await getDocs(collection(db, "inquiries"));
    const promises = querySnapshot.docs.map((docSnap) => deleteDoc(doc(db, "inquiries", docSnap.id)));
    await Promise.all(promises);
    return true;
  } catch (error) {
    console.error("Failed to clear inquiries from Firestore:", error);
    return false;
  }
}

/**
 * Returns all portfolios from Firestore, ordered by rank.
 */
export async function getFirestorePortfolios(): Promise<PortfolioItem[]> {
  if (!db) return [];
  try {
    const q = query(collection(db, "portfolios"), orderBy("rank", "asc"));
    const querySnapshot = await getDocs(q);
    const list: PortfolioItem[] = [];
    querySnapshot.forEach((docSnap) => {
      list.push({
        id: docSnap.id,
        ...docSnap.data(),
      } as any);
    });
    return list;
  } catch (error) {
    console.error("Failed to fetch portfolios from Firestore:", error);
    return [];
  }
}

/**
 * Returns all testimonials from Firestore, ordered by rank.
 */
export async function getFirestoreTestimonials(): Promise<TestimonialItem[]> {
  if (!db) return [];
  try {
    const q = query(collection(db, "testimonials"), orderBy("rank", "asc"));
    const querySnapshot = await getDocs(q);
    const list: TestimonialItem[] = [];
    querySnapshot.forEach((docSnap) => {
      list.push({
        id: docSnap.id,
        ...docSnap.data(),
      } as any);
    });
    return list;
  } catch (error) {
    console.error("Failed to fetch testimonials from Firestore:", error);
    return [];
  }
}

/**
 * Seed portfolios and testimonials collections if they are empty
 */
export async function seedCollectionsIfEmpty(): Promise<void> {
  if (!db) return;
  try {
    const portfolioCheck = await getDocs(collection(db, "portfolios"));
    if (portfolioCheck.empty) {
      console.log("Seeding portfolios collection...");
      const defaultPortfolios: PortfolioItem[] = [
        {
          id: "portfolio-1",
          rank: 1,
          title: "The Orchid Sanctuary",
          description: "A cathedral wedding layout featuring suspended white orchids and warm scenographic lights.",
          img: "/assets/portfolio_wedding.png",
          category: "Weddings",
          tags: ["Bespoke Weddings", "large"]
        },
        {
          id: "portfolio-2",
          rank: 2,
          title: "Vanguard Tech Reveal",
          description: "Minimalist volumetric stage design for a high-end electronic hardware launch.",
          img: "/assets/portfolio_corporate.png",
          category: "Corporate Events",
          tags: ["Corporate Events", "medium"]
        },
        {
          id: "portfolio-3",
          rank: 3,
          title: "Casa di Marmo",
          description: "Luxury residential living room incorporating custom matte charcoal panels and brushed brass.",
          img: "/assets/portfolio_interior_living.png",
          category: "Residential",
          tags: ["Residential Interiors", "large"]
        },
        {
          id: "portfolio-4",
          rank: 4,
          title: "Terrazza del Lago",
          description: "A premium lakeside cocktail terrace showroom designed with high-end Italian architectural stone.",
          img: "/assets/hero_bg.png",
          category: "Commercial",
          tags: ["Commercial Interiors", "medium"]
        },
        {
          id: "portfolio-5",
          rank: 5,
          title: "Studio Pietra",
          description: "Architectural workspace showcasing raw concrete texturing, warm oak slats, and floor-to-ceiling glass.",
          img: "/assets/about_bg.png",
          category: "Luxury Interiors",
          tags: ["Luxury Interiors", "small"]
        },
        {
          id: "portfolio-6",
          rank: 6,
          title: "Aura Penthouse Suite",
          description: "High-end luxury suite detailing integrated shelf illumination and custom furniture layouts.",
          img: "/assets/portfolio_interior_living.png",
          category: "Luxury Interiors",
          tags: ["Luxury Interiors", "small"]
        }
      ];

      for (const p of defaultPortfolios) {
        await setDoc(doc(db, "portfolios", p.id), {
          rank: p.rank,
          title: p.title,
          description: p.description,
          img: p.img,
          category: p.category,
          tags: p.tags
        });
      }
      console.log("Successfully seeded portfolios.");
    }

    const testimonialCheck = await getDocs(collection(db, "testimonials"));
    if (testimonialCheck.empty) {
      console.log("Seeding testimonials collection...");
      const defaultTestimonials: TestimonialItem[] = [
        {
          id: "testimonial-1",
          rank: 1,
          name: "Aria Moretti",
          description: "Haanav Eviors transformed our flagship penthouse suite. Their architectural detailing, wood paneling integrations, and material selection reflect absolute minimalism. Casa di Marmo is a masterpiece.",
          workingtitle: "Principal Owner, Moretti Residences",
          tags: ["rating-5", "AM"],
          portfolioId: "portfolio-3"
        },
        {
          id: "testimonial-2",
          rank: 2,
          name: "Marcus Vance",
          description: "The Apex launch set was absolutely phenomenal. The volumetric light rays and seamless wide-screen stage design delivered a cinematic, immersive experience that completely wowed our global press partners.",
          workingtitle: "Director of Global Branding, Vanguard Systems",
          tags: ["rating-5", "MV"],
          portfolioId: "portfolio-2"
        },
        {
          id: "testimonial-3",
          rank: 3,
          name: "Elena Rostova",
          description: "For our wedding sanctuary, they crafted a breathtaking white orchid dreamscape. Every technician was highly professional, and the execution was flawless down to the last custom gold-accented seating placement.",
          workingtitle: "Private Client, Villa d'Este Weddings",
          tags: ["rating-5", "ER"],
          portfolioId: "portfolio-1"
        }
      ];

      for (const t of defaultTestimonials) {
        await setDoc(doc(db, "testimonials", t.id), {
          rank: t.rank,
          name: t.name,
          description: t.description,
          workingtitle: t.workingtitle,
          tags: t.tags,
          portfolioId: t.portfolioId
        });
      }
      console.log("Successfully seeded testimonials.");
    }
  } catch (error) {
    console.error("Failed to seed collections:", error);
  }
}
