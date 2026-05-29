import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Read environment variables loaded via Node native env-file loader
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId || firebaseConfig.projectId.includes("your-firebase")) {
  console.error("Error: Please set your active VITE_FIREBASE variables in the .env file before running seed.");
  process.exit(1);
}

console.log("Initializing Firebase for Project ID:", firebaseConfig.projectId);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const defaultPortfolios = [
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

const defaultTestimonials = [
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

async function seed() {
  try {
    console.log("Starting Firestore seed...");
    
    console.log("Seeding portfolios collection...");
    for (const p of defaultPortfolios) {
      await setDoc(doc(db, "portfolios", p.id), {
        rank: p.rank,
        title: p.title,
        description: p.description,
        img: p.img,
        category: p.category,
        tags: p.tags
      });
      console.log(`  + Seeded Portfolio: "${p.title}"`);
    }

    console.log("Seeding testimonials collection...");
    for (const t of defaultTestimonials) {
      await setDoc(doc(db, "testimonials", t.id), {
        rank: t.rank,
        name: t.name,
        description: t.description,
        workingtitle: t.workingtitle,
        tags: t.tags,
        portfolioId: t.portfolioId
      });
      console.log(`  + Seeded Testimonial: "${t.name}"`);
    }

    console.log("\nDatabase seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed with error:", error);
    process.exit(1);
  }
}

seed();
