import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #0e0e0e;
    --surface: #161616;
    --surface2: #1e1e1e;
    --border: #2a2a2a;
    --border2: #333;
    --gold: #d4a843;
    --gold-dim: #a07d2e;
    --gold-glow: rgba(212,168,67,0.15);
    --green: #3ecf8e;
    --green-dim: rgba(62,207,142,0.12);
    --red: #f06050;
    --red-dim: rgba(240,96,80,0.12);
    --text: #f0ede8;
    --text2: #9a9590;
    --text3: #5a5550;
  }

  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* TOP NAV */
  .topnav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; height: 56px;
    background: var(--surface); border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 100;
  }
  .logo { font-family: 'DM Serif Display', serif; font-size: 20px; color: var(--gold); letter-spacing: -0.5px; }
  .logo span { color: var(--text3); font-size: 13px; font-family: 'DM Mono', monospace; margin-left: 10px; }
  .tab-bar { display: flex; gap: 2px; }
  .tab {
    padding: 6px 18px; border-radius: 6px; font-size: 13px; font-weight: 500;
    color: var(--text2); cursor: pointer; transition: all 0.2s; border: none;
    background: transparent; font-family: 'DM Sans', sans-serif;
  }
  .tab:hover { color: var(--text); background: var(--surface2); }
  .tab.active { color: var(--gold); background: var(--gold-glow); }
  .badge {
    display: inline-flex; align-items: center; justify-content: center;
    background: var(--gold); color: #000; font-size: 10px; font-weight: 700;
    border-radius: 10px; padding: 1px 6px; margin-left: 6px; font-family: 'DM Mono', monospace;
  }

  /* LAYOUT */
  .view { padding: 32px; max-width: 1280px; margin: 0 auto; width: 100%; animation: fadeUp 0.4s ease; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  .view-header { margin-bottom: 28px; }
  .view-title { font-family: 'DM Serif Display', serif; font-size: 30px; line-height: 1.15; }
  .view-title em { font-style: italic; color: var(--gold); }
  .view-sub { color: var(--text2); font-size: 14px; margin-top: 6px; font-family: 'DM Mono', monospace; }

  /* GRID */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .col-span-2 { grid-column: span 2; }

  /* CARDS */
  .card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 24px;
  }
  .card-title { font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text3); margin-bottom: 16px; font-family: 'DM Mono', monospace; }

  /* STAT CARDS */
  .stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
  .stat-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 10px; padding: 20px;
    transition: border-color 0.2s;
  }
  .stat-card:hover { border-color: var(--border2); }
  .stat-label { font-size: 11px; color: var(--text3); text-transform: uppercase; letter-spacing: 0.06em; font-family: 'DM Mono', monospace; }
  .stat-value { font-family: 'DM Serif Display', serif; font-size: 28px; margin-top: 6px; }
  .stat-delta { font-size: 12px; margin-top: 4px; font-family: 'DM Mono', monospace; }
  .up { color: var(--green); }
  .down { color: var(--red); }

  /* FORM ELEMENTS */
  .field { margin-bottom: 16px; }
  .label { font-size: 12px; color: var(--text2); margin-bottom: 6px; display: block; font-family: 'DM Mono', monospace; }
  .input, .select {
    width: 100%; background: var(--bg); border: 1px solid var(--border);
    border-radius: 8px; padding: 10px 14px; color: var(--text);
    font-size: 14px; font-family: 'DM Sans', sans-serif;
    transition: border-color 0.2s; outline: none;
  }
  .input:focus, .select:focus { border-color: var(--gold); }
  .select option { background: var(--surface); }

  /* BUTTONS */
  .btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: 500;
    cursor: pointer; border: none; transition: all 0.18s; font-family: 'DM Sans', sans-serif;
  }
  .btn-gold { background: var(--gold); color: #000; }
  .btn-gold:hover { background: #e0b850; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(212,168,67,0.3); }
  .btn-ghost { background: transparent; color: var(--text2); border: 1px solid var(--border); }
  .btn-ghost:hover { border-color: var(--border2); color: var(--text); }
  .btn-green { background: var(--green-dim); color: var(--green); border: 1px solid rgba(62,207,142,0.25); }
  .btn-green:hover { background: rgba(62,207,142,0.2); }
  .btn-sm { padding: 6px 14px; font-size: 12px; }

  /* BUNDLE CARDS */
  .bundle-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .bundle-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; overflow: hidden; transition: all 0.2s;
    cursor: pointer;
  }
  .bundle-card:hover { border-color: var(--gold-dim); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
  .bundle-card.selected { border-color: var(--gold); box-shadow: 0 0 0 1px var(--gold), 0 8px 32px rgba(212,168,67,0.15); }
  .bundle-header { padding: 20px 20px 14px; border-bottom: 1px solid var(--border); }
  .bundle-name { font-family: 'DM Serif Display', serif; font-size: 18px; }
  .bundle-brand { font-size: 12px; color: var(--gold); font-family: 'DM Mono', monospace; margin-top: 2px; }
  .bundle-body { padding: 16px 20px; }
  .bundle-items { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
  .bundle-item { display: flex; align-items: center; gap: 10px; font-size: 13px; }
  .item-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
  .item-name { color: var(--text2); flex: 1; }
  .item-price { font-family: 'DM Mono', monospace; font-size: 12px; color: var(--text); }
  .bundle-footer { padding: 14px 20px; background: var(--surface2); display: flex; align-items: center; justify-content: space-between; }
  .bundle-aov { font-family: 'DM Mono', monospace; font-size: 13px; color: var(--text2); }
  .bundle-aov strong { color: var(--gold); font-size: 16px; }
  .status-pill {
    font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
    padding: 3px 10px; border-radius: 20px; font-family: 'DM Mono', monospace;
  }
  .pill-active { background: var(--green-dim); color: var(--green); border: 1px solid rgba(62,207,142,0.25); }
  .pill-draft { background: rgba(212,168,67,0.1); color: var(--gold); border: 1px solid rgba(212,168,67,0.25); }
  .pill-paused { background: var(--red-dim); color: var(--red); border: 1px solid rgba(240,96,80,0.2); }

  /* INVENTORY TABLE */
  .table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .table th {
    text-align: left; padding: 10px 14px; font-size: 10px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.08em; color: var(--text3);
    border-bottom: 1px solid var(--border); font-family: 'DM Mono', monospace;
  }
  .table td { padding: 12px 14px; border-bottom: 1px solid var(--border); vertical-align: middle; }
  .table tr:hover td { background: var(--surface2); }
  .table tr:last-child td { border-bottom: none; }
  .stock-bar-wrap { width: 80px; height: 4px; background: var(--border); border-radius: 2px; }
  .stock-bar { height: 4px; border-radius: 2px; transition: width 0.4s; }
  .stock-ok { background: var(--green); }
  .stock-low { background: var(--gold); }
  .stock-out { background: var(--red); }
  .api-tag { font-family: 'DM Mono', monospace; font-size: 10px; padding: 2px 8px; border-radius: 4px; background: rgba(212,168,67,0.08); color: var(--gold-dim); border: 1px solid var(--border); }

  /* STOREFRONT */
  .store-layout { display: grid; grid-template-columns: 1fr 360px; gap: 24px; align-items: start; }
  .product-list { display: flex; flex-direction: column; gap: 12px; }
  .product-row {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 10px; padding: 16px 20px;
    display: flex; align-items: center; gap: 16px;
    transition: border-color 0.2s;
  }
  .product-row:hover { border-color: var(--border2); }
  .product-emoji { font-size: 28px; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: var(--surface2); border-radius: 8px; flex-shrink: 0; }
  .product-info { flex: 1; }
  .product-name { font-weight: 500; font-size: 14px; }
  .product-sku { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--text3); margin-top: 2px; }
  .product-price { font-family: 'DM Mono', monospace; font-size: 16px; font-weight: 500; color: var(--text); }

  /* ONE CLICK */
  .oneclick-panel {
    background: var(--surface); border: 1px solid var(--gold-dim);
    border-radius: 14px; overflow: hidden; position: sticky; top: 72px;
  }
  .oneclick-header {
    background: linear-gradient(135deg, #1a1500 0%, #1e1a00 100%);
    border-bottom: 1px solid var(--gold-dim);
    padding: 20px 22px;
  }
  .oneclick-label { font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold-dim); font-family: 'DM Mono', monospace; }
  .oneclick-title { font-family: 'DM Serif Display', serif; font-size: 20px; margin-top: 4px; }
  .oneclick-brand { font-size: 12px; color: var(--gold); margin-top: 2px; font-family: 'DM Mono', monospace; }
  .oneclick-items { padding: 16px 22px; display: flex; flex-direction: column; gap: 10px; }
  .oc-item { display: flex; align-items: center; gap: 12px; }
  .oc-emoji { font-size: 20px; width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; background: var(--surface2); border-radius: 6px; flex-shrink: 0; }
  .oc-name { font-size: 13px; flex: 1; }
  .oc-price { font-family: 'DM Mono', monospace; font-size: 13px; color: var(--gold); }
  .oc-divider { height: 1px; background: var(--border); margin: 4px 0; }
  .oneclick-footer { padding: 16px 22px; }
  .oc-savings { display: flex; justify-content: space-between; font-size: 12px; color: var(--text2); margin-bottom: 6px; font-family: 'DM Mono', monospace; }
  .oc-savings span:last-child { color: var(--green); }
  .oc-total { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 16px; }
  .oc-total-label { font-size: 14px; font-weight: 600; }
  .oc-total-price { font-family: 'DM Serif Display', serif; font-size: 24px; color: var(--gold); }
  .btn-oneclick {
    width: 100%; padding: 14px; border-radius: 10px;
    background: var(--gold); color: #000; border: none;
    font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .btn-oneclick:hover { background: #e0b850; transform: translateY(-1px); box-shadow: 0 6px 24px rgba(212,168,67,0.4); }
  .btn-oneclick.added { background: var(--green); }
  .aov-indicator {
    margin-top: 10px; text-align: center; font-size: 11px; color: var(--text3);
    font-family: 'DM Mono', monospace;
  }
  .aov-indicator strong { color: var(--green); }

  /* API PANEL */
  .api-panel {
    background: var(--bg); border: 1px solid var(--border);
    border-radius: 10px; overflow: hidden;
  }
  .api-bar {
    display: flex; align-items: center; gap: 10px; padding: 10px 16px;
    background: var(--surface); border-bottom: 1px solid var(--border);
    font-family: 'DM Mono', monospace; font-size: 12px;
  }
  .method { padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; }
  .get { background: var(--green-dim); color: var(--green); }
  .post { background: rgba(212,168,67,0.12); color: var(--gold); }
  .api-url { color: var(--text2); flex: 1; }
  .api-status { margin-left: auto; display: flex; align-items: center; gap: 6px; }
  .dot-green { width: 7px; height: 7px; border-radius: 50%; background: var(--green); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
  .api-body { padding: 14px 16px; font-family: 'DM Mono', monospace; font-size: 12px; line-height: 1.6; color: var(--text2); max-height: 180px; overflow-y: auto; }
  .api-key { color: #7ec8e3; }
  .api-val { color: var(--gold); }
  .api-str { color: var(--green); }
  .api-num { color: #ff9966; }

  /* TOAST */
  .toast {
    position: fixed; bottom: 28px; right: 28px; z-index: 999;
    background: var(--surface2); border: 1px solid var(--green);
    border-radius: 10px; padding: 14px 20px;
    display: flex; align-items: center; gap: 12px;
    font-size: 14px; box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    animation: slideIn 0.3s ease;
  }
  @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
  .toast-icon { font-size: 18px; }

  /* MISC */
  .divider { height: 1px; background: var(--border); margin: 20px 0; }
  .flex-between { display: flex; align-items: center; justify-content: space-between; }
  .flex-center { display: flex; align-items: center; gap: 10px; }
  .mt-16 { margin-top: 16px; }
  .mt-20 { margin-top: 20px; }
  .text-mono { font-family: 'DM Mono', monospace; }
  .text-sm { font-size: 12px; color: var(--text2); }
  .empty-state { text-align: center; padding: 48px; color: var(--text3); font-family: 'DM Mono', monospace; font-size: 13px; }
  .progress-wrap { display: flex; align-items: center; gap: 10px; }
  .progress-bar-bg { flex: 1; height: 6px; background: var(--border); border-radius: 3px; }
  .progress-bar { height: 6px; border-radius: 3px; background: var(--gold); transition: width 0.6s ease; }
`;

// ─── DATA ────────────────────────────────────────────────────────────────────
const BUNDLES_INIT = [
  {
    id: 1, name: "Morning Ritual Kit", brand: "LUMIA WELLNESS",
    status: "active",
    items: [
      { name: "Vitamin C Serum", price: 28 },
      { name: "SPF 50 Moisturizer", price: 22 },
      { name: "Collagen Eye Patches", price: 18 },
    ],
    impressions: 12400, conversions: 1860, aov_lift: 18,
  },
  {
    id: 2, name: "Home Office Bundle", brand: "DESK & CO.",
    status: "active",
    items: [
      { name: "Ergonomic Mouse Pad", price: 35 },
      { name: "USB-C Hub (7-in-1)", price: 49 },
      { name: "Cable Management Kit", price: 16 },
    ],
    impressions: 8900, conversions: 980, aov_lift: 14,
  },
  {
    id: 3, name: "Fitness Starter Pack", brand: "FORZA ACTIVE",
    status: "draft",
    items: [
      { name: "Resistance Bands Set", price: 24 },
      { name: "Protein Shaker Bottle", price: 18 },
      { name: "Gym Towel (2-pack)", price: 14 },
    ],
    impressions: 0, conversions: 0, aov_lift: 12,
  },
  {
    id: 4, name: "Gourmet Coffee Set", brand: "BRÜE ORIGINS",
    status: "paused",
    items: [
      { name: "Single Origin Blend 250g", price: 22 },
      { name: "Ceramic Pour-Over", price: 38 },
      { name: "Digital Scale", price: 19 },
    ],
    impressions: 5200, conversions: 420, aov_lift: 11,
  },
  {
    id: 5, name: "Skincare Glow Bundle", brand: "LUMIA WELLNESS",
    status: "active",
    items: [
      { name: "Hyaluronic Acid Toner", price: 32 },
      { name: "Niacinamide Serum", price: 26 },
      { name: "Night Repair Cream", price: 42 },
    ],
    impressions: 9700, conversions: 1430, aov_lift: 21,
  },
  {
    id: 6, name: "Gaming Essentials", brand: "NEXUS GEAR",
    status: "draft",
    items: [
      { name: "Wrist Support Pad", price: 21 },
      { name: "Screen Cleaning Kit", price: 12 },
      { name: "RGB LED Strip (2m)", price: 16 },
    ],
    impressions: 0, conversions: 0, aov_lift: 9,
  },
];

const INVENTORY_INIT = [
  { sku: "LW-001", name: "Vitamin C Serum", category: "Skincare", stock: 482, capacity: 600, price: 28, bundled: true },
  { sku: "LW-002", name: "SPF 50 Moisturizer", category: "Skincare", stock: 61, capacity: 600, price: 22, bundled: true },
  { sku: "LW-003", name: "Collagen Eye Patches", category: "Skincare", stock: 220, capacity: 500, price: 18, bundled: true },
  { sku: "DC-001", name: "Ergonomic Mouse Pad", category: "Office", stock: 0, capacity: 400, price: 35, bundled: true },
  { sku: "DC-002", name: "USB-C Hub (7-in-1)", category: "Office", stock: 155, capacity: 400, price: 49, bundled: true },
  { sku: "DC-003", name: "Cable Management Kit", category: "Office", stock: 310, capacity: 400, price: 16, bundled: true },
  { sku: "FA-001", name: "Resistance Bands Set", category: "Fitness", stock: 88, capacity: 500, price: 24, bundled: false },
  { sku: "FA-002", name: "Protein Shaker Bottle", category: "Fitness", stock: 444, capacity: 500, price: 18, bundled: false },
  { sku: "BO-001", name: "Single Origin Blend", category: "Coffee", stock: 23, capacity: 300, price: 22, bundled: false },
  { sku: "BO-002", name: "Ceramic Pour-Over", category: "Coffee", stock: 112, capacity: 300, price: 38, bundled: false },
];

const STORE_PRODUCTS = [
  { id: 1, name: "Vitamin C Serum", sku: "LW-001", price: 28, emoji: "🧴" },
  { id: 2, name: "SPF 50 Moisturizer", sku: "LW-002", price: 22, emoji: "☀️" },
  { id: 3, name: "Hyaluronic Acid Toner", sku: "LW-004", price: 32, emoji: "💧" },
  { id: 4, name: "Ergonomic Mouse Pad", sku: "DC-001", price: 35, emoji: "🖱️" },
  { id: 5, name: "USB-C Hub (7-in-1)", sku: "DC-002", price: 49, emoji: "🔌" },
  { id: 6, name: "Niacinamide Serum", sku: "LW-005", price: 26, emoji: "✨" },
];

const ACTIVE_STORE_BUNDLE = {
  name: "Morning Ritual Kit", brand: "LUMIA WELLNESS",
  items: [
    { name: "Vitamin C Serum", price: 28, emoji: "🧴" },
    { name: "SPF 50 Moisturizer", price: 22, emoji: "☀️" },
    { name: "Collagen Eye Patches", price: 18, emoji: "👁️" },
  ],
  originalTotal: 68, bundlePrice: 58,
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Toast({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  return (
    <div className="toast">
      <span className="toast-icon">✓</span>
      <span>{msg}</span>
    </div>
  );
}

// ── VIEW 1: BRAND PARTNER DASHBOARD ──────────────────────────────────────────
function BrandView({ bundles, setBundles }) {
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", brand: "", item1: "", p1: "", item2: "", p2: "", item3: "", p3: "" });

  const active = bundles.filter(b => b.status === "active");
  const totalImpressions = bundles.reduce((s, b) => s + b.impressions, 0);
  const totalConversions = bundles.reduce((s, b) => s + b.conversions, 0);
  const avgAov = Math.round(bundles.filter(b => b.aov_lift > 0).reduce((s, b) => s + b.aov_lift, 0) / bundles.filter(b => b.aov_lift > 0).length);

  function toggleStatus(id) {
    setBundles(prev => prev.map(b => b.id === id ? {
      ...b,
      status: b.status === "active" ? "paused" : b.status === "paused" ? "active" : b.status
    } : b));
    setToast("Bundle status updated");
  }

  function createBundle() {
    if (!form.name || !form.brand) return;
    const newBundle = {
      id: Date.now(), name: form.name, brand: form.brand.toUpperCase(), status: "draft",
      items: [
        { name: form.item1 || "Item 1", price: parseFloat(form.p1) || 0 },
        { name: form.item2 || "Item 2", price: parseFloat(form.p2) || 0 },
        { name: form.item3 || "Item 3", price: parseFloat(form.p3) || 0 },
      ],
      impressions: 0, conversions: 0, aov_lift: 0,
    };
    setBundles(prev => [...prev, newBundle]);
    setShowForm(false);
    setForm({ name: "", brand: "", item1: "", p1: "", item2: "", p2: "", item3: "", p3: "" });
    setToast("Bundle created as Draft");
  }

  return (
    <div className="view">
      <div className="view-header flex-between">
        <div>
          <h1 className="view-title">Brand Partner <em>Dashboard</em></h1>
          <p className="view-sub">// Manage ad bundles · Track performance · Drive AOV lift</p>
        </div>
        <button className="btn btn-gold" onClick={() => setShowForm(!showForm)}>
          {showForm ? "✕ Cancel" : "+ New Bundle"}
        </button>
      </div>

      {showForm && (
        <div className="card mt-16" style={{ marginBottom: 24, borderColor: "var(--gold-dim)" }}>
          <div className="card-title">Create New Bundle</div>
          <div className="grid-2">
            <div className="field">
              <label className="label">Bundle Name</label>
              <input className="input" placeholder="e.g. Summer Glow Kit" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="field">
              <label className="label">Brand Partner</label>
              <input className="input" placeholder="e.g. Lumia Wellness" value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} />
            </div>
            {[1, 2, 3].map(i => (
              <div key={i} className="grid-2" style={{ gridColumn: "span 2" }}>
                <div className="field">
                  <label className="label">Item {i} Name</label>
                  <input className="input" placeholder={`Product ${i}`} value={form[`item${i}`]} onChange={e => setForm({ ...form, [`item${i}`]: e.target.value })} />
                </div>
                <div className="field">
                  <label className="label">Price ($)</label>
                  <input className="input" type="number" placeholder="0.00" value={form[`p${i}`]} onChange={e => setForm({ ...form, [`p${i}`]: e.target.value })} />
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-gold" onClick={createBundle}>Create Bundle</button>
        </div>
      )}

      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-label">Active Bundles</div>
          <div className="stat-value" style={{ color: "var(--gold)" }}>{active.length}</div>
          <div className="stat-delta up">↑ {bundles.length} total configured</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Impressions</div>
          <div className="stat-value">{(totalImpressions / 1000).toFixed(1)}k</div>
          <div className="stat-delta up">↑ 12% vs last week</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Conversions</div>
          <div className="stat-value">{(totalConversions / 1000).toFixed(1)}k</div>
          <div className="stat-delta up">↑ {((totalConversions / totalImpressions) * 100).toFixed(1)}% CVR</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Avg AOV Lift</div>
          <div className="stat-value" style={{ color: "var(--green)" }}>+{avgAov}%</div>
          <div className="stat-delta up">↑ vs. baseline orders</div>
        </div>
      </div>

      <div className="bundle-grid">
        {bundles.map(b => {
          const total = b.items.reduce((s, i) => s + i.price, 0);
          return (
            <div className="bundle-card" key={b.id}>
              <div className="bundle-header">
                <div className="flex-between">
                  <div>
                    <div className="bundle-name">{b.name}</div>
                    <div className="bundle-brand">{b.brand}</div>
                  </div>
                  <span className={`status-pill ${b.status === "active" ? "pill-active" : b.status === "draft" ? "pill-draft" : "pill-paused"}`}>
                    {b.status}
                  </span>
                </div>
              </div>
              <div className="bundle-body">
                <div className="bundle-items">
                  {b.items.map((it, idx) => (
                    <div className="bundle-item" key={idx}>
                      <div className="item-dot" />
                      <span className="item-name">{it.name}</span>
                      <span className="item-price">${it.price}</span>
                    </div>
                  ))}
                </div>
                {b.impressions > 0 && (
                  <div style={{ marginTop: 8 }}>
                    <div className="flex-between text-sm" style={{ marginBottom: 4 }}>
                      <span>Conversion Rate</span>
                      <span style={{ fontFamily: "DM Mono", color: "var(--gold)" }}>
                        {((b.conversions / b.impressions) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="progress-wrap">
                      <div className="progress-bar-bg">
                        <div className="progress-bar" style={{ width: `${Math.min((b.conversions / b.impressions) * 100 * 6, 100)}%` }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="bundle-footer">
                <div className="bundle-aov">
                  Total <strong>${total}</strong>
                  {b.aov_lift > 0 && <span style={{ color: "var(--green)", fontSize: 12, marginLeft: 8 }}>+{b.aov_lift}% AOV</span>}
                </div>
                {b.status !== "draft" && (
                  <button className={`btn btn-sm ${b.status === "active" ? "btn-ghost" : "btn-green"}`}
                    onClick={() => toggleStatus(b.id)}>
                    {b.status === "active" ? "Pause" : "Activate"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

// ── VIEW 2: RETAILER INVENTORY ────────────────────────────────────────────────
function RetailerView() {
  const [inventory, setInventory] = useState(INVENTORY_INIT);
  const [filter, setFilter] = useState("All");
  const [toast, setToast] = useState(null);
  const [apiLog, setApiLog] = useState([]);
  const [simulating, setSimulating] = useState(false);

  const categories = ["All", ...new Set(inventory.map(i => i.category))];
  const filtered = filter === "All" ? inventory : inventory.filter(i => i.category === filter);

  function stockStatus(item) {
    const pct = item.stock / item.capacity;
    if (item.stock === 0) return { label: "Out of Stock", cls: "stock-out", pill: "pill-paused" };
    if (pct < 0.2) return { label: "Low Stock", cls: "stock-low", pill: "pill-draft" };
    return { label: "In Stock", cls: "stock-ok", pill: "pill-active" };
  }

  function simulateAPI() {
    setSimulating(true);
    const log = [];
    inventory.forEach(item => {
      const pct = item.stock / item.capacity;
      log.push({ sku: item.sku, name: item.name, available: item.stock > 0, stock: item.stock, status: pct < 0.15 ? "low" : item.stock === 0 ? "out_of_stock" : "ok" });
    });
    setApiLog(log);
    setTimeout(() => {
      setSimulating(false);
      setToast(`API sync complete — ${log.filter(l => l.available).length} items available, ${log.filter(l => !l.available).length} out of stock`);
    }, 800);
  }

  function restock(sku) {
    setInventory(prev => prev.map(i => i.sku === sku ? { ...i, stock: i.capacity } : i));
    setToast(`${sku} restocked to full capacity`);
  }

  const outOfStock = inventory.filter(i => i.stock === 0).length;
  const lowStock = inventory.filter(i => i.stock > 0 && i.stock / i.capacity < 0.2).length;
  const bundledOOS = inventory.filter(i => i.bundled && i.stock === 0).length;

  return (
    <div className="view">
      <div className="view-header flex-between">
        <div>
          <h1 className="view-title">Retailer <em>Inventory</em></h1>
          <p className="view-sub">// Real-time stock management · API compatibility · 2,000+ simulated items</p>
        </div>
        <button className={`btn btn-gold`} onClick={simulateAPI} disabled={simulating}>
          {simulating ? "⟳ Syncing..." : "⚡ Run API Sync"}
        </button>
      </div>

      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-label">Total SKUs</div>
          <div className="stat-value">{inventory.length}</div>
          <div className="stat-delta" style={{ color: "var(--text3)" }}>+ 1,990 simulated</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Out of Stock</div>
          <div className="stat-value" style={{ color: outOfStock > 0 ? "var(--red)" : "var(--green)" }}>{outOfStock}</div>
          <div className="stat-delta down">{outOfStock > 0 ? `↓ ${outOfStock} item(s) need restock` : "✓ All items available"}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Low Stock Alerts</div>
          <div className="stat-value" style={{ color: lowStock > 0 ? "var(--gold)" : "var(--green)" }}>{lowStock}</div>
          <div className="stat-delta" style={{ color: "var(--gold)" }}>{lowStock > 0 ? `⚠ Below 20% threshold` : "✓ Healthy levels"}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Bundle-OOS Risk</div>
          <div className="stat-value" style={{ color: bundledOOS > 0 ? "var(--red)" : "var(--green)" }}>{bundledOOS}</div>
          <div className="stat-delta down">{bundledOOS > 0 ? "↓ Will break active bundles" : "✓ Bundles unaffected"}</div>
        </div>
      </div>

      {bundledOOS > 0 && (
        <div style={{ background: "var(--red-dim)", border: "1px solid rgba(240,96,80,0.3)", borderRadius: 10, padding: "12px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12, fontSize: 13 }}>
          <span style={{ fontSize: 18 }}>⚠️</span>
          <span><strong style={{ color: "var(--red)" }}>Bundle Integrity Alert:</strong> {bundledOOS} bundled item(s) are out of stock — shoppers will see "Out of Stock" on active bundles. Restock to restore One-Click Add availability.</span>
        </div>
      )}

      <div className="grid-2">
        <div>
          <div className="flex-center" style={{ marginBottom: 16, gap: 8 }}>
            {categories.map(c => (
              <button key={c} className={`btn btn-sm ${filter === c ? "btn-gold" : "btn-ghost"}`} onClick={() => setFilter(c)}>{c}</button>
            ))}
          </div>
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Product</th>
                  <th>Stock Level</th>
                  <th>Status</th>
                  <th>Bundled</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => {
                  const s = stockStatus(item);
                  return (
                    <tr key={item.sku}>
                      <td><span className="api-tag">{item.sku}</span></td>
                      <td>
                        <div style={{ fontWeight: 500, fontSize: 13 }}>{item.name}</div>
                        <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "DM Mono" }}>${item.price} · {item.category}</div>
                      </td>
                      <td>
                        <div style={{ fontFamily: "DM Mono", fontSize: 12, marginBottom: 5, color: "var(--text2)" }}>
                          {item.stock.toLocaleString()} / {item.capacity.toLocaleString()}
                        </div>
                        <div className="stock-bar-wrap">
                          <div className={`stock-bar ${s.cls}`} style={{ width: `${(item.stock / item.capacity) * 100}%` }} />
                        </div>
                      </td>
                      <td><span className={`status-pill ${s.pill}`}>{s.label}</span></td>
                      <td style={{ textAlign: "center" }}>
                        {item.bundled ? <span style={{ color: "var(--gold)", fontSize: 14 }}>◆</span> : <span style={{ color: "var(--text3)" }}>—</span>}
                      </td>
                      <td>
                        {item.stock < item.capacity && (
                          <button className="btn btn-ghost btn-sm" onClick={() => restock(item.sku)}>Restock</button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <div className="card-title" style={{ marginBottom: 12 }}>LIVE API FEED</div>
          <div className="api-panel">
            <div className="api-bar">
              <span className="method get">GET</span>
              <span className="api-url">/api/v1/inventory/check-availability</span>
              <div className="api-status">
                <div className="dot-green" />
                <span style={{ color: "var(--green)", fontSize: 11 }}>200 OK</span>
              </div>
            </div>
            <div className="api-body">
              {apiLog.length === 0 ? (
                <span style={{ color: "var(--text3)" }}>{"// Run API Sync to see live inventory response..."}</span>
              ) : (
                <div style={{ lineHeight: 1.8 }}>
                  <div><span className="api-key">{"{"}</span></div>
                  <div>{"  "}<span className="api-key">"timestamp"</span>{": "}<span className="api-str">{`"${new Date().toISOString()}"`}</span>{","}</div>
                  <div>{"  "}<span className="api-key">"items"</span>{": ["}</div>
                  {apiLog.slice(0, 5).map((item, i) => (
                    <div key={i} style={{ paddingLeft: 16 }}>
                      {"{ "}
                      <span className="api-key">"sku"</span>{": "}
                      <span className="api-str">{`"${item.sku}"`}</span>{", "}
                      <span className="api-key">"available"</span>{": "}
                      <span style={{ color: item.available ? "var(--green)" : "var(--red)" }}>{String(item.available)}</span>{", "}
                      <span className="api-key">"qty"</span>{": "}
                      <span className="api-num">{item.stock}</span>
                      {" }"}{i < apiLog.slice(0, 5).length - 1 ? "," : ""}
                    </div>
                  ))}
                  <div>{"  ],"}</div>
                  <div>{"  "}<span className="api-key">"total_checked"</span>{": "}<span className="api-num">{apiLog.length}</span>{","}</div>
                  <div>{"  "}<span className="api-key">"available_count"</span>{": "}<span className="api-num">{apiLog.filter(l => l.available).length}</span></div>
                  <div><span className="api-key">{"}"}</span></div>
                </div>
              )}
            </div>
          </div>

          <div className="card mt-20">
            <div className="card-title">API Endpoints Simulated</div>
            {[
              { method: "GET", path: "/inventory/availability", desc: "Check stock for bundle items" },
              { method: "POST", path: "/inventory/reserve", desc: "Soft-reserve on bundle add" },
              { method: "GET", path: "/bundles/active", desc: "Fetch live bundle configs" },
              { method: "POST", path: "/orders/bundle-add", desc: "One-click bundle checkout" },
            ].map((ep, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                <span className={`method ${ep.method === "GET" ? "get" : "post"}`}>{ep.method}</span>
                <span style={{ fontFamily: "DM Mono", fontSize: 12, color: "var(--text2)", flex: 1 }}>{ep.path}</span>
                <span style={{ fontSize: 11, color: "var(--text3)" }}>{ep.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

// ── VIEW 3: SHOPPER STOREFRONT ────────────────────────────────────────────────
function StorefrontView() {
  const [added, setAdded] = useState(false);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);

  const bundle = ACTIVE_STORE_BUNDLE;
  const savings = bundle.originalTotal - bundle.bundlePrice;
  const savingsPct = Math.round((savings / bundle.originalTotal) * 100);

  function handleOneClick() {
    if (added) return;
    setAdded(true);
    setCart(bundle.items.map(i => i.name));
    setToast(`✓ ${bundle.name} added — saved $${savings}!`);
    setTimeout(() => setAdded(false), 3000);
  }

  function addSingle(p) {
    setToast(`${p.name} added to cart`);
  }

  return (
    <div className="view">
      <div className="view-header">
        <h1 className="view-title">Shopper <em>Storefront</em></h1>
        <p className="view-sub">// One-Click Add interface · Bundle discovery · AOV lift in action</p>
      </div>

      <div className="store-layout">
        <div>
          <div className="flex-between" style={{ marginBottom: 16 }}>
            <div style={{ fontFamily: "DM Mono", fontSize: 12, color: "var(--text2)" }}>
              Showing {STORE_PRODUCTS.length} products · Skincare & Office
            </div>
            {cart.length > 0 && (
              <div style={{ fontFamily: "DM Mono", fontSize: 12, color: "var(--green)" }}>
                🛒 {cart.length + bundle.items.length} items in cart
              </div>
            )}
          </div>

          <div className="product-list">
            {STORE_PRODUCTS.map(p => (
              <div className="product-row" key={p.id}>
                <div className="product-emoji">{p.emoji}</div>
                <div className="product-info">
                  <div className="product-name">{p.name}</div>
                  <div className="product-sku">{p.sku}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div className="product-price">${p.price}</div>
                  <button className="btn btn-ghost btn-sm" onClick={() => addSingle(p)}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>

          <div className="card mt-20" style={{ borderColor: "var(--border2)" }}>
            <div className="card-title">AOV Performance — Live Simulation</div>
            <div style={{ display: "flex", gap: 32 }}>
              {[
                { label: "Avg order without bundle", value: "$38", color: "var(--text)" },
                { label: "Avg order with One-Click Add", value: "$58", color: "var(--gold)" },
                { label: "AOV lift achieved", value: "+15%", color: "var(--green)" },
                { label: "Users shown the bundle", value: "2,000+", color: "var(--text)" },
              ].map((s, i) => (
                <div key={i} style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "var(--text3)", fontFamily: "DM Mono", marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontFamily: "DM Serif Display", fontSize: 22, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
            <div className="divider" />
            <div style={{ fontSize: 12, color: "var(--text3)", fontFamily: "DM Mono" }}>
              Bundle displayed via One-Click Add when shopper views any bundled item · Inventory check fires on page load via GET /api/v1/inventory/check-availability
            </div>
          </div>
        </div>

        {/* ONE-CLICK PANEL */}
        <div className="oneclick-panel">
          <div className="oneclick-header">
            <div className="oneclick-label">⚡ Frequently Bought Together</div>
            <div className="oneclick-title">{bundle.name}</div>
            <div className="oneclick-brand">{bundle.brand}</div>
          </div>

          <div className="oneclick-items">
            {bundle.items.map((item, i) => (
              <div key={i}>
                <div className="oc-item">
                  <div className="oc-emoji">{item.emoji}</div>
                  <div className="oc-name">{item.name}</div>
                  <div className="oc-price">${item.price}</div>
                </div>
                {i < bundle.items.length - 1 && <div className="oc-divider" style={{ marginLeft: 50 }} />}
              </div>
            ))}
          </div>

          <div className="oneclick-footer">
            <div className="oc-savings">
              <span>Original price</span>
              <span style={{ textDecoration: "line-through", color: "var(--text3)" }}>${bundle.originalTotal}</span>
            </div>
            <div className="oc-savings">
              <span>Bundle savings</span>
              <span>−${savings} ({savingsPct}% off)</span>
            </div>
            <div className="oc-divider" />
            <div className="oc-total">
              <span className="oc-total-label">Bundle Price</span>
              <span className="oc-total-price">${bundle.bundlePrice}</span>
            </div>
            <button className={`btn-oneclick ${added ? "added" : ""}`} onClick={handleOneClick}>
              {added ? "✓ Added to Cart!" : `⚡ One-Click Add — $${bundle.bundlePrice}`}
            </button>
            <div className="aov-indicator">
              Adds <strong>+${bundle.bundlePrice - 28}</strong> to order value vs. buying single item
            </div>

            <div className="divider" />

            <div style={{ fontFamily: "DM Mono", fontSize: 11, color: "var(--text3)", lineHeight: 1.7 }}>
              <div>🟢 Inventory verified — all 3 items in stock</div>
              <div>📦 Ships together · Free on orders $50+</div>
              <div>🔁 Easy 30-day returns</div>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

// ─── ROOT APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("brand");
  const [bundles, setBundles] = useState(BUNDLES_INIT);

  const activeBundles = bundles.filter(b => b.status === "active").length;

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <nav className="topnav">
          <div className="logo">
            BundleOS <span>v1.0 · omnichannel</span>
          </div>
          <div className="tab-bar">
            <button className={`tab ${view === "brand" ? "active" : ""}`} onClick={() => setView("brand")}>
              Brand Partner
            </button>
            <button className={`tab ${view === "retailer" ? "active" : ""}`} onClick={() => setView("retailer")}>
              Retailer Inventory
            </button>
            <button className={`tab ${view === "store" ? "active" : ""}`} onClick={() => setView("store")}>
              Storefront
              <span className="badge">LIVE</span>
            </button>
          </div>
          <div style={{ fontFamily: "DM Mono", fontSize: 11, color: "var(--text3)" }}>
            {activeBundles} active bundles
          </div>
        </nav>

        {view === "brand" && <BrandView bundles={bundles} setBundles={setBundles} />}
        {view === "retailer" && <RetailerView />}
        {view === "store" && <StorefrontView />}
      </div>
    </>
  );
}
