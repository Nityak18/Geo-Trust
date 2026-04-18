# 🛡️ Geo-Trust: Next-Gen Decentralized Land Registry

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind--CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

**Geo-Trust** is a premier, blockchain-powered geospatial simulation platform designed to modernize the global real estate sector. By merging high-precision GIS mapping with an immutable digital ledger, Geo-Trust provides a production-grade blueprint for secure property lifecycle management with unmatched visual fidelity.

---

## ✨ Core Pillars & New Features

### 📍 1. Exact Plot-Level Geospatial Identity
*   **Precision Pin-Dropping**: Integrated **Leaflet** & **OpenStreetMap** (OSM) for exact GPS coordinate capture during registration.
*   **Mobile Deep-Linking**: One-click navigation to exact property boundaries via **Google Maps** native app integration using `geo:` URI schemes.
*   **Property MiniMaps**: Every registry record now includes a live, interactive map preview of the exact land plot.

### 🏛️ 2. Sovereign Property Registry
*   **Immutable Digital Deeds**: Properties are cryptographically secured assets (Simulated ERC-721), ensuring absolute proof of ownership.
*   **High-Fidelity Visuals**: Advanced property cards featuring **Architectural Glass** finishes and dynamic land classification states.
*   **Real-time Ledger Sync**: Persistence layer powered by `localStorage` with block-level integrity checks.

### 📜 3. Advanced Multi-Step Onboarding
*   **Onboarding Flow**: A refined, 5-stage Transfer workflow (Deed → Parties → Location → Financials → Mint) powered by specialized **shadcn** logic.
*   **Live Validation**: Context-aware input validation ensures rigorous data capture (Buyer ID Hashes, Wallet Addresses, Stamp Duty percentages).
*   **Cinematic transitions**: Seamless interactions between form steps using **Framer Motion** for a premium enterprise feel.

### 📊 4. Live Registry Intelligence
*   **Interactive Analytics**: upgraded Reports page with glassmorphism dashboards, showing "Total Value on Chain" and "Plot Distribution" via **Recharts**.
*   **Forensic Explorer**: A real-time block explorer tracking the most recent network updates with precision status indicators.
*   **Identity Verification**: Integrated metrics for verified Identities and Network Consensus nodes.

---

## 🎨 Design Philosophy: "Architectural Clarity"
Geo-Trust features a modern **Glassmorphism** aesthetic, conveying trust through visual transparency:
*   **Dynamic Backgrounds**: Floating background ornaments in Teal and Orange provide depth and motion.
*   **Premium Typography**: Leveraging **Playfair Display** (Serif) for authority and **DM Sans** for readability.
*   **Modern Auth Experience**: An animated, high-fidelity carousels on the Login page with auto-advancing slides and Google OAuth integration.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://reactjs.org/) (Strict Mode) |
| **GIS / Mapping** | [Leaflet](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/) |
| **Build Tool** | [Vite](https://vitejs.dev/) (Ultra-fast HMR) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) |
| **Components** | [shadcn/ui](https://ui.shadcn.com/) (Primitive-based architecture) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Notifications**| [Sonner](https://sonner.steventey.com/) (Cinematic Toast System) |
| **Data Flow** | [React Context API](https://react.dev/learn/passing-data-deeply-with-context) |

---

## ⚡ Quick Start

### 1. Repository Setup
```bash
# Clone the repository
git clone <repository-url>

# Navigate to frontend
cd Blockchain/frontend

# Install dependencies
npm install
```

### 2. Configure Authentication
To enable native Google Account selection:
1. Obtain an OAuth 2.0 Client ID from the [Google Cloud Console](https://console.cloud.google.com/).
2. Add `http://localhost:5173` to your **Authorized JavaScript origins**.
3. Update `src/pages/LoginPage.jsx` with your Client ID.

### 3. Launch the Node
```bash
npm run dev
```
Access the dashboard at `http://localhost:5173`.

---

## 📁 System Architecture
*   `src/lib/geoUtils.js`: Centralized logic for coordinate formatting and deep-link generation.
*   `src/components/ui/LocationPicker.jsx`: Interactive map component for precise plot selection.
*   `src/pages/TransferPage.jsx`: The new multi-step ownership migration interface.
*   `src/context/RegistryContext.jsx`: The core ledger logic and state machine.

---

## 🛡️ License
Distributed under the **MIT License**. Build for educational excellence and high-performance blockchain simulations.

**Geo-Trust** — *Securing the world's most valuable assets, one block at a time.*
