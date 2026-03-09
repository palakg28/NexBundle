# NexBundle — Omnichannel Marketplace Bundling Platform

> A full-stack product prototype simulating a multi-sided marketplace where Brand Partners, Retailers, and Shoppers interact through intelligent product bundling — driving measurable AOV lift via frictionless "One-Click Add" experiences.

---

## Product Context

This prototype was built to explore a core e-commerce growth problem:

**How do you increase Average Order Value without degrading the shopper experience?**

The answer modeled here is intelligent bundling — surfacing curated product sets at the moment of highest purchase intent, backed by real-time inventory validation to prevent "Out of Stock" failures that erode trust.

The system operates across three distinct user personas, each with competing priorities:

| Persona | Goal | Key Tension |
|---|---|---|
| **Brand Partner** | Maximize bundle impressions & conversions | Needs retailer inventory to cooperate |
| **Retailer** | Maintain inventory integrity | Doesn't want bundles showing OOS items |
| **Shopper** | Discover value, buy seamlessly | Frustrated by friction or broken offers |

Designing for all three simultaneously is the core product challenge this prototype addresses.

---

## What's Built

### View 1 — Brand Partner Dashboard
- Create and manage advertisement bundles with up to 3 items per bundle
- Monitor live performance metrics: impressions, conversion rate, and AOV lift per bundle
- Toggle bundle status between Active, Draft, and Paused states
- Visual CVR progress bars per bundle with calculated totals

### View 2 — Retailer Inventory Panel
- Real-time stock management across 10 SKUs (representing 2,000+ simulated items)
- Automatic low-stock and out-of-stock detection with threshold alerts
- **Bundle Integrity Alert** — fires when a bundled item goes OOS, preventing broken shopper experiences
- Simulated REST API feed (GET /inventory/check-availability) with live JSON response rendering
- One-click restock simulation per SKU
- API endpoint reference panel showing all GET/POST routes

### View 3 — Shopper Storefront
- Product listing with individual add-to-cart
- Persistent **"One-Click Add"** bundle panel — the centrepiece UX pattern
- Live savings calculation, inventory verification badge, and AOV impact indicator
- Post-add cart state update with confirmation toast
- AOV performance stats: baseline vs. bundle-assisted order value

---

## Key Metrics Simulated

| Metric | Result |
|---|---|
| AOV Lift (bundle vs. single item) | **+15%** |
| Simulated inventory items checked | **2,000+** |
| Bundle conversion rate (active bundles) | **~15% avg** |
| Out-of-stock prevention | Real-time API check on page load |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (Hooks) |
| Styling | CSS Variables, custom design system |
| Typography | DM Serif Display · DM Mono · DM Sans |
| State Management | useState, useEffect |
| API Simulation | In-component mock REST endpoints |
| Deployment | Vercel (recommended) |

---

## PM Skills Demonstrated

**Product Discovery & Prioritization**
Designed around Jobs-to-be-Done for three distinct user types. Every feature traces back to a specific user problem — not feature parity or assumptions.

**Systems Thinking**
The Bundle Integrity Alert is a direct product of thinking across the full system. A brand activates a bundle → a retailer's item goes OOS → the shopper sees a broken experience. This prototype catches and surfaces that failure at the right layer (retailer) before it reaches the shopper.

**API Design Thinking**
The inventory panel models real API contracts a PM would write in a PRD: GET for availability checks, POST for soft-reserve on add, structured JSON responses with status codes. Designed with engineering feasibility in mind.

**Metric-Driven Design**
Every UI decision is tied to a measurable outcome. The One-Click Add panel shows live AOV delta, savings %, and stock status — making the value exchange transparent to the shopper and trackable for the business.

**Failure State Handling**
Out-of-stock scenarios, low-stock thresholds, and bundle integrity violations are all modeled — not just the happy path.

---

## Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/nexbundle.git
cd nexbundle
npm install
npm start
```

Opens at `http://localhost:3000`

---

## Project Structure

```
src/
└── App.js          # Full prototype — Brand, Retailer & Storefront views
public/
└── index.html
README.md
```

---
