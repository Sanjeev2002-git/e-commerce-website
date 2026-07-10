# E-Commerce Multi-Vendor (Monorepo) — Scaffolding

This repository is being built in phases.

## Folder structure
- `backend/` — NestJS REST API
- `web-app/` — Next.js customer web app
- `mobile-app/` — React Native (Expo)
- `admin-dashboard/` — admin UI
- `seller-dashboard/` — seller UI
- `delivery-app/` — delivery UI

## Prerequisites
- Node.js (LTS recommended)
- npm (or yarn/pnpm)
- PostgreSQL (for transactional data)
- MongoDB (for product catalog)
- Redis (for sessions/cart)

## Local setup (per service)

### 1) Backend (NestJS)
```bash
cd backend
copy .env.example .env
npm install
npm run dev
```
Health check endpoint:
- `GET http://localhost:3000/health`


### 2) Web app (Next.js)
```bash
cd web-app
cp .env.example .env
npm install
npm run dev
```

### 3) Mobile app (Expo)
```bash
cd mobile-app
cp .env.example .env
npm install
npm run start
```

### 4) Admin dashboard
```bash
cd admin-dashboard
cp .env.example .env
npm install
npm run dev
```

### 5) Seller dashboard
```bash
cd seller-dashboard
cp .env.example .env
npm install
npm run dev
```

### 6) Delivery app
```bash
cd delivery-app
cp .env.example .env
npm install
npm run dev
```

## Notes
- This step is **scaffolding only**. No business features are implemented yet.
- AWS S3 configuration is included as a placeholder in `.env.example` files.

