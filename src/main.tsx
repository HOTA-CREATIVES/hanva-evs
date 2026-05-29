import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { seedCollectionsIfEmpty } from '@/firebase/config'

// Trigger auto-seeding if the Firebase project is configured and empty
seedCollectionsIfEmpty().catch((err) => {
  console.error("Auto-seeding check failed:", err);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
