# 🛡️ Geo-Trust: Next-Gen Decentralized Land Registry

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind--CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Geo-Trust** is a high-fidelity, blockchain-inspired simulation platform designed to modernize the global real estate sector. By replacing legacy paper-based systems with an immutable, transparent, and cryptographically secured digital ledger, Geo-Trust provides a production-grade blueprint for secure property lifecycle management.

---

## ✨ Core Pillars & Features

### 🏛️ 1. Sovereign Property Registry
*   **Immutable Digital Deeds**: Properties are represented as unique on-chain assets (ERC-721 simulation), ensuring non-fungibility and absolute proof of ownership.
*   **Dynamic Asset Valuation**: Real-time tracking of market values and ownership status (Verified, Pending, Transferred).
*   **High-Fidelity Visuals**: Advanced property cards featuring **Glassy Finishes** and context-aware land classification icons.

### 📜 2. Transparent Chain of Custody
*   **Second-Precision Forensic Explorer**: A compact, real-time Block Explorer that tracks the 6 most recent network updates with pinned status indicators for "Pending" and "Verified" nodes.
*   **Full Lifecycle Tracking**: Every property maintains a complete, searchable history from original minting through every subsequent transfer.
*   **Instant Global Search**: Search systemic records via Transaction Hash, Survey Number, or Wallet Address with instant UI feedback.

### 💸 3. Smart Transfer Protocol
*   **Multi-Stage Minting**: A systematic workflow (Sign → Review → Mint) that simulates zero-knowledge proof verification and smart contract execution.
*   **Deep Metadata Integration**: Capture rigorous land data including **Classification** (Agricultural/Commercial/Residential), **Land Area**, and **Regional District**.
*   **Consensus Simulation**: Integrated 8-second "Validator Consensus" loop to provide realistic network latency and block confirmation UX.

### 🔐 4. Enterprise-Grade Authentication
*   **Native Google OAuth**: Fully integrated with **Google Identity Services (GIS)** for real, browser-native account selection and identity verification.
*   **Hybrid Access Node**: Optional high-security password fallback for Node Operators and System Administrators.
*   **Persistent State Synch**: Integrated `localStorage` synchronization ensures that all transactions and registry updates persist across sessions and browser restarts.

---

## 🎨 Design Philosophy: "Frosted Precision"
Geo-Trust features a modern **Glassmorphism** aesthetic, designed to convey trust through transparency:
*   **Animated Orbs**: Background blurs in Teal, Orange, and Navy provide architectural depth.
*   **Frosted Overlay**: A global `backdrop-blur` system provides a clean, professional "Architectural" feel.
*   **UI Components**: Powered by **shadcn/ui** patterns and **Framer Motion** for smooth, meaningful transitions.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://reactjs.org/) (Strict Mode) |
| **Build Tool** | [Vite](https://vitejs.dev/) (Ultra-fast HMR) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) |
| **Components** | [shadcn/ui](https://ui.shadcn.com/) (Customized primitive architecture) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Data Flow** | [React Context API](https://react.dev/learn/passing-data-deeply-with-context) + LocalStorage Hook |
| **Identity** | [Google Identity Services](https://developers.google.com/identity/gsi/web) (OAuth 2.0) |

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
3. Update `src/pages/LoginPage.jsx` with your Client ID:
   ```javascript
   const GOOGLE_CLIENT_ID = "YOUR_ID.apps.googleusercontent.com";
   ```

### 3. Launch the Node
```bash
npm run dev
```
Access the dashboard at `http://localhost:5173`.

---

## 📁 System Architecture
*   `src/context/RegistryContext.jsx`: The core ledger logic, persistence, and property state machine.
*   `src/components/ui/`: Reusable, atomic UI components (AlertCard, Button, etc.).
*   `src/pages/`: Modular page logic (Explorer, Registry, Transfer, Analytics).
*   `src/lib/utils.js`: Core style merging utilities.

---

## 🛡️ License
Distributed under the **MIT License**. Build for educational excellence and high-performance blockchain simulations.

**Geo-Trust** — *Securing the world's most valuable assets, one block at a time.*
