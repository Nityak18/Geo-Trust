# 🖥️ Geo-Trust Frontend: High-Fidelity Web3 Interface

This is the UI layer of the **Geo-Trust** Decentralized Land Registry. It provides a state-of-the-art, glass-morphism based dashboard for interacting with the simulated Geo-Trust blockchain ledger.

---

## 🌟 Visual & Interactive Features

### 💎 Glassmorphism Design System
*   **Frosted Glass UI**: All navigation and container elements feature `backdrop-blur` and translucency for a premium, futuristic feel.
*   **Dynamic Background Ornaments**: Animated Teal and Orange blurs provide architectural depth and life to every page.
*   **Responsive Experience**: A fully fluid design optimized for desktop node operators and mobile surveyors.

### 📋 Registry & Search Operations
*   **Instant Global Filter**: Search properties and transactions in real-time across the entire registry.
*   **Compact Explorer**: A streamlined network feed showing the 6 most recent block updates with pinned status indicators.
*   **Property Lifecycle Timeline**: Interactive, physics-based history reconstructions for any Survey Number.

### 🛡️ Secure Authorization Terminal
*   **Google Identity Services (GIS)**: Native OAuth 2.0 integration for enterprise-grade account selection.
*   **Session Persistence**: Custom hooks that sync the "simulated blockchain" state to `localStorage`, ensuring data integrity across reloads.
*   **Sophisticated Stepper**: A professional 3-stage minting workflow for property ownership transfers.

---

## 🛠️ Technology Stack

*   **Logic**: React 19 (Functional Components & Hooks)
*   **Scaffold**: Vite (High-speed HMR)
*   **Styling**: Tailwind CSS + Custom Glass Utilities
*   **Components**: shadcn/ui architectural patterns
*   **Physics**: Framer Motion (60fps animations)
*   **Icons**: Lucide React (feather-light SVGs)
*   **State**: Unified Context API (Registry & Auth)

---

## 🚀 Development Setup

### 1. Installation
```bash
npm install
```

### 2. Configure Google Identity
To enable the **real browser account picker**:
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create an **OAuth 2.0 Client ID** for a "Web application".
3. Add `http://localhost:5173` to **Authorized JavaScript origins**.
4. Paste your Client ID into `src/pages/LoginPage.jsx` on **Line 13**.

### 3. Start Node
```bash
npm run dev
```

---

## 📁 Key Directories

*   `src/context/`: Core business logic and state machine.
*   `src/lib/`: Style merging utilities and shared helpers.
*   `src/components/ui/`: Atomic UI primitives (Buttons, Cards, Modals).
*   `src/pages/`: Modular application layers.

---

## 🛡️ License
Elite Digital Property Assurance Protocol. Developed for High-Stake Web3 Demonstrations.
