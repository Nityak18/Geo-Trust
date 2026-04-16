# 🛡️ Geo-Trust: Decentralized Land Registry System

Geo-Trust is a high-fidelity blockchain-based simulation for modern land registries. It replaces traditional, slow, and fraud-prone paper systems with an immutable, transparent, and cryptographically secured digital ledger.

## 🚀 Key Features

### 1. 📂 Global Property Registry
- **Digital Deeds**: Every property is represented as a unique on-chain asset (simulated NFT).
- **Dynamic Valuation**: Real-time property value tracking and status updates (Verified, Pending, Transferred).
- **Rich Visualization**: Beautifully rendered property layouts and parcel IDs.

### 2. 🕵️ Immutable Verification & Lifecycle History
- **Searchable Ledger**: Verify any property deed instantly using a Transaction Hash or Survey Number.
- **Chain of Custody**: View the **full historical lifecycle** of any property. Every ownership change is timestamped with second-precision accuracy and linked to its original blockchain block.
- **IPFS Metadata**: View the underlying raw JSON metadata that would be stored on IPFS.

### 3. 💸 Smart Transfer Protocol
- **Three-Step Minting**: A multi-step stepper (Sign → Review → Mint) that simulates a real blockchain transaction workflow.
- **Validator Simulation**: Transactions include an 8-second "Validator Consensus" delay, mimicking real-world block confirmation times.
- **Real-Time Date-Time**: Every transaction generates high-precision Indian Standard Time (IST) timestamps.

### 4. 🌐 Block Explorer
- **Live Ledger Feed**: A real-time table showing the latest activities across the entire network.
- **Search & Filter**: Find transactions by Survey Number, status, or hash.

### 5. 🔐 Advanced Authentication Node
- **Dual-Mode Login**: Choose between modern **Google Identity Services (OAuth)** or traditional **Node Password Access**.
- **Real Google Integration**: Connects to actual Gmail accounts on your device for authentic identity verification.
- **Identity Links**: User roles and verified email IDs are permanently recorded in the property lifecycle logs.

---

## 🛠️ Technical Stack

- **Frontend**: React 19 + Vite
- **Styling**: Vanilla CSS + Tailwind
- **Animations**: Framer Motion (for smooth transitions and lifecycle timelines)
- **Icons**: Lucide React
- **State Management**: React Context API (Unified Registry & Auth providers)
- **State Persistence**: LocalStorage for session-wide data consistency

---

## ⚡ Setup & Installation

### Prerequisites
- Node.js installed on your machine.
- A Google Client ID (for real Google Login functionality).

### 1. Clone & Install
```bash
git clone <repository-url>
cd Blockchain/frontend
npm install
```

### 2. Configure Google Authentication
To enable **real Google account selection**:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create an **OAuth 2.0 Client ID**.
3. Add `http://localhost:5173` to the **Authorized JavaScript origins**.
4. Open `src/pages/LoginPage.jsx` and replace the placeholder on **line 13** with your actual Client ID:
   ```javascript
   const GOOGLE_CLIENT_ID = "YOUR_ID.apps.googleusercontent.com";
   ```

### 3. Run Locally
```bash
npm run dev
```
Open `http://localhost:5173` to access the portal.

---

## 📜 Project Structure

- `/src/context`: Global state for the Registry (ledger) and Auth (sessions).
- `/src/pages`: Interactive modules (Registry, Explorer, Transfer, Verify).
- `/src/components`: UI components (Navbar, Footer, Toast containers).

---

## 🛡️ License
Built for educational and demonstration purposes. Designed for High-Performance Blockchain Simulators.
