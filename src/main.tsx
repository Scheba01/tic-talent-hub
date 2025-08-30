import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Temporarily removed reCAPTCHA until proper site key is configured
createRoot(document.getElementById("root")!).render(<App />);
