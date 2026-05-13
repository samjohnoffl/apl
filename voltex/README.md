# ⚡ VOLTEX: The Future of Sports Broadcasting

**VOLTEX** is a blazing-fast, AI-powered interactive second-screen platform designed to revolutionize how we experience live sports (specifically table tennis). Built during the Google Hackathon, this app transforms passive viewing into a highly engaging, predictive, and analytical experience.

---

## 🚀 Features That Will Blow Your Mind

- **🧠 Real-Time Gemini AI Insights**: Wired directly into Google's `gemini-2.5-flash` model. Voltex acts as a digital color commentator, streaming live tactical analyses of the match directly onto your screen with an incredible cyberpunk typing effect.
- **📈 Momentum Engine**: Visualizes the flow of the game! Our custom physics-based `framer-motion` charts map out player dominance in real-time.
- **🔮 Interactive Predictions**: Pop-up prediction cards prompt viewers to guess rally outcomes, shot types, and momentum shifts, creating an esports-level interactive layer over traditional broadcasts.
- **🏆 Live Leaderboard**: Compete globally. Stack XP. Climb the ranks.
- **🎥 Zero-Latency Embeds**: Features a seamlessly integrated YouTube player, syncing the visual stream with the data stream.
- **💎 Apple-Grade Aesthetics**: A meticulously crafted, glassmorphic UI built with Tailwind CSS v4, Lucide Icons, and Framer Motion. 

---

## 🛠️ The Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Data Viz**: Recharts
- **AI Brain**: Google GenAI SDK (`@google/genai`)
- **Deployment**: Dockerized for Google Cloud Run

---

## 🏃‍♂️ How to Run Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run the Dev Server** (Turbopack enabled for insane speeds):
   ```bash
   npm run dev
   ```

3. **Provide API Key**: Open `http://localhost:3000`, click the Settings gear ⚙️, and paste your Gemini API Key to enable real-time tactical analysis.

---

## ☁️ How to Deploy to Google Cloud Run

Voltex is built with a highly optimized, multi-stage Dockerfile utilizing Next.js `standalone` output. 

### Step 1: Build & Push the Image
Make sure you have the Google Cloud SDK installed and authenticated.
```bash
# Set your project ID
export PROJECT_ID="your-google-cloud-project-id"

# Submit the build to Cloud Build
gcloud builds submit --tag gcr.io/$PROJECT_ID/voltex
```

### Step 2: Deploy to Cloud Run
```bash
gcloud run deploy voltex \
  --image gcr.io/$PROJECT_ID/voltex \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 3000
```
*Boom.* Your app is live globally on Google's edge network.

---

*Built with passion, caffeine, and Google Gemini.*
