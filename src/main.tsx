import { createRoot } from 'react-dom/client'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import App from './App.tsx'
import './index.css'

const RECAPTCHA_SITE_KEY = "YOUR_RECAPTCHA_SITE_KEY"; // Replace with your actual site key

createRoot(document.getElementById("root")!).render(
  <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
    <App />
  </GoogleReCaptchaProvider>
);
