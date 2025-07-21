# 🌍 3D Latency Globe Visualizer

This project is a web-based application that visualizes real-time or historical latency data between global cloud servers and exchanges using a 3D interactive globe. Built with React, TypeScript, and `react-globe.gl`.

 🧪 **Note:** The application uses a combination of **real data** (fetched from an external API) and **dummy/mock data** for demonstration and fallback purposes. This helps ensure smooth visualization even when real data is limited or partially available.

## ✨ Features

- 🌐 Interactive 3D globe rendering server-to-server latency arcs
- 📊 Control panel for:
  - Exchange selection (Binance, OKX, etc.)
  - Cloud provider filtering (AWS, GCP, Azure)
  - Latency range filtering (Low/Medium/High)
  - Toggle between Real-Time and Historical data
- 🎨 Dynamic arc color based on latency value
- ⚡ Data fetched from an external API (live or mock)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/latency-globe.git
cd latency-globe
2. Install dependencies
bash
Copy
Edit
npm install
# or
yarn install
3. Set environment variables (if any)
If your API requires an endpoint or token, create a .env file:

bash
Copy
Edit
VITE_API_URL=https://your-latency-api.com/data
Or directly edit the API URL in the code (GlobeScene.tsx) if hardcoded.

4. Start the development server
bash
Copy
Edit
npm run dev
# or
yarn dev
The app will be running at http://localhost:5173 (or the port shown in terminal).

🛠 Tech Stack
React + TypeScript

react-globe.gl

TailwindCSS (for styling)

Vite (for fast dev builds)

📁 Project Structure
```
.
├── src/
│   ├── components/
│   │   └── GlobeScene.tsx         
│   │   └── ControlPanel.tsx       
│   │   └── Header.tsx        
│   │   └── Legend.tsx       
│   │   └── Loader.tsx         
│   │   └── LatencyChart.tsx      
│   ├── pages/
│   │   └── index.ts               # Type definitions (ArcData, etc.)
│   ├── App.tsx                    # Main app component
│   └── main.tsx                   # React entry point
├── public/
├── .env                           # API config (optional)
├── package.json
└── README.md
```

📦 Build for Production
```
npm run build
Then serve it with any static server like serve, Netlify, or Vercel.

📃 License
MIT © 2025 Aman Agrawal