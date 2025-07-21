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
| Library                                         | Description                                                              |
| ----------------------------------------------- | ------------------------------------------------------------------------ |
| **React**                                       | JavaScript library for building user interfaces                          |
| **TypeScript**                                  | Static type-checker for more robust code                                 |
| **Vite**                                        | Fast build tool and development server                                   |
| **Three.js**                                    | 3D graphics library for rendering the globe                              |
| **react-globe.gl**                              | React wrapper for `three-globe`, used to create the interactive 3D globe |
| **Tailwind CSS**                                | Utility-first CSS framework for fast UI styling                          |
| **d3-geo**                                      | Used under the hood by `react-globe.gl` for map projections              |
| **React Hooks** (`useEffect`, `useState`, etc.) | For managing component state and lifecycle                               |
| **ESLint + Prettier** *(optional)*              | For maintaining code quality and formatting                              |


## 🚀 Getting Started

### 1. Clone the repository

```bash
cd latency-visualizer
2. Install dependencies

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