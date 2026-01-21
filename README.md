# 2xSwap Protocol

A decentralized co‑investment protocol with dynamic profit sharing, unified B‑side liquidity pool, and liquidation‑free leverage for crypto and tokenized real‑world assets (RWAs).

2xSwap replaces interest‑based lending with a **partnership model** where two parties — **A (Initiator)** and **B (Capital Provider)** — co‑invest into real on‑chain assets. Profits are shared according to a utilization‑based ratio, and positions never face forced liquidation.

This repository is a **monorepo** composed of three main parts:

```
2xswap-indexer/   → On‑chain data indexer (Ponder)
client/           → Frontend (React + Vite)
server/           → Backend API (Express + Prisma)
```

---

## Repository Structure

### 1️⃣ `2xswap-indexer`

**Purpose:**
Indexes on‑chain data such as volume, TVL, positions, and events. This data is consumed by the frontend for charts and analytics.

**Tech stack:**

- Ponder
- Viem
- Hono

**Environment variables (`.env.local`):**

```env
PONDER_RPC_URL_1=RPC_URL
DATABASE_URL=POSTGRES_URL   # optional, SQLite if omitted
INDEXER_SECRET=INDEXER_SECRET
BACKEND_BASE_URL=BACKEND_BASE_URL
```

**Scripts:**

```bash
pnpm dev       # start indexer in dev mode
pnpm start     # start indexer (prod)
pnpm db        # manage ponder db
pnpm codegen   # generate types
```

---

### 2️⃣ `client`

**Purpose:**
The user‑facing frontend for interacting with the 2xSwap protocol, including:

- Wallet connection
- Trading & liquidity dashboards
- Referral system
- Points & leaderboard UI

**Tech stack:**

- React 19
- Vite
- Tailwind CSS
- Wagmi + RainbowKit
- React Query

**Environment variables (`.env.local`):**

```env
VITE_WALLETCONNECT_PROJECT_ID=WALLETCONNECT_PROJECT_ID
VITE_RPC_URL=RPC_URL
VITE_PONDER_URL=http://localhost:42069
VITE_BACKEND_URL=http://localhost:5000
```

**Scripts:**

```bash
pnpm dev       # start frontend
pnpm build     # production build
pnpm preview   # preview build
```

---

### 3️⃣ `server`

**Purpose:**
Backend API responsible for **off‑chain logic** such as:

- Signature‑based authentication
- Points calculation (trading, liquidity, referral)
- Season management
- Leaderboards
- Waitlist

All critical value transfers still happen **on‑chain**.

**Tech stack:**

- Express
- Prisma
- PostgreSQL
- JWT authentication
- Node‑cron

**Environment variables (`.env`):**

```env
DATABASE_URL=POSTGRES_URL
JWT_SECRET=JWT_SECRET
PONDER_URL=http://localhost:42069
FRONTEND_URL=http://localhost:5173
PORT=5000
INDEXER_SECRET=INDEXER_SECRET
```

**Scripts:**

```bash
pnpm dev       # start server with watch mode
pnpm build     # compile TypeScript
pnpm start     # start compiled server
```

---

## Local Development Setup

### Prerequisites

- Node.js ≥ 18
- pnpm (recommended)
- PostgreSQL (or use SQLite for indexer only)

---

### 1️⃣ Install dependencies

From the repo root, install dependencies for each package:

```bash
cd 2xswap-indexer && pnpm install
cd ../client && pnpm install
cd ../server && pnpm install
```

---

### 2️⃣ Setup environment variables

Create the following files:

```bash
2xswap-indexer/.env.local
client/.env
server/.env
```

Fill them using the provided `.env.example` files as reference.

---

### 3️⃣ Database setup (server)

```bash
cd server
pnpm prisma migrate dev
pnpm prisma db seed
```

---

### 4️⃣ Run services (recommended order)

#### Start indexer

```bash
cd 2xswap-indexer
pnpm dev
```

#### Start backend

```bash
cd server
pnpm dev
```

#### Start frontend

```bash
cd client
pnpm dev
```

Frontend will be available at:

```
http://localhost:5173
```

---

## Security Model (High‑Level)

- **Authentication:** Wallet signature‑based (nonce → sign → verify)
- **Backend trust:** Only for points & indexing, never custody
- **Rate limiting:** Applied to public write endpoints (e.g. waitlist)
- **Secrets:** Isolated per service
- **On‑chain authority:** Smart contracts remain the source of truth

---

## Notes

- This repo intentionally separates **on‑chain indexing**, **off‑chain logic**, and **frontend** concerns.
- Points, referrals, and leaderboards are non‑custodial and replay‑safe.
- Indexer and backend communicate via a shared secret.

---

## License

MIT (or project‑specific license)
