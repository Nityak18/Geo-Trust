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
- **Authentic Google Integration**: Connects to actual Gmail accounts on your device using **Google Identity Services (GIS)**. Provides a native browser account picker.
- **Dual-Mode Security**: Choose between modern Google OAuth or traditional Node Password Access.
- **Session Management**: User profiles and verified emails are persistently linked to their blockchain actions.

---

## 🛠️ Technical Stack

- **Frontend**: React 19 + Vite
- **Styling**: Vanilla CSS + TailwindCSS (for high-fidelity glassmorphism)
- **Animations**: Framer Motion (60fps routing and timeline physics)
- **Icons**: Lucide React
- **State Management**: React Context API (Unified Registry & Auth providers)

---

## ⚡ Setup & Installation

### Prerequisites
- Node.js (v18+)
- A Google Client ID (for real Google Login)

### 1. Setup Environment
```bash
cd Blockchain/frontend
npm install
```

### 2. Configure Google Identity
To enable the **real browser account picker**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create an **OAuth 2.0 Client ID** for a "Web application".
3. Add `http://localhost:5173` to **Authorized JavaScript origins**.
4. Paste your ID into `src/pages/LoginPage.jsx` on **Line 13**.

### 3. Run Development Server
```bash
npm run dev
```

---

## 📜 Project Architecture

- `src/context/RegistryContext.jsx`: The "Simulated Blockchain" logic - handles block confirmation timers, transaction hashes, and state synchronization.
- `src/pages/VerifyPage.jsx`: Forensics engine that reconstructs the property history from the global ledger.
- `src/pages/TransferPage.jsx`: The digital minting interface.

---

## 🛡️ License
Elite Digital Property Assurance Protocol. Developed for High-Stake Web3 Demonstrations.
