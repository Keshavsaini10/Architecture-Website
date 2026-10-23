<<<<<<< HEAD
# 🏛️ ExploreMore Stones — India's Heritage, Carved in Stone

A luxury, full-stack web application showcasing Indian natural marble, sandstone, and granite craftsmanship. Built with a responsive frontend design and an Express.js REST API backend with persistent data storage.

![ExploreMore Stones Hero Banner](/assets/images/hero_taj_mahal.jpg)

---

## 💎 Features Overview

- **Hero Experience**: Majestic golden hour panoramic view of the Taj Mahal with Mughal arches, slide counter (`01 / 04`), dynamic brand kicker, and animated scroll indicator.
- **Stone Collection Catalog**: Handcrafted natural stone cards with real texture previews, category filter pills (`All`, `Marble`, `Granite`, `Sandstone`, `Limestone`), and high-resolution loupe inspection modals.
- **12 Curated Heritage Stones**:
  1. *Makrana Marble* (Pure white crystalline marble used in the Taj Mahal)
  2. *Kota Stone* (Durable greenish-blue Hadoti dolomitic limestone)
  3. *Jaisalmer Yellow* (Golden fossiliferous Jurassic desert stone)
  4. *Black Galaxy Granite* (Jet black with bronze enstatite starry flecks)
  5. *Indian Green Marble* (Royal emerald serpentine Verde marble)
  6. *Rajasthan Sandstone* (Warm terracotta blush architectural stone)
  7. *Banswara Purple Marble* (Milky porcelain base with violet spider veining)
  8. *Dholpur Beige Sandstone* (Imperial sovereign stone of Rashtrapati Bhavan)
  9. *Ambaji White Marble* (Sacred crystalline purity of Dilwara Temples)
  10. *Rainforest Brown Serpentine* (Exotic Bidasar nature's tapestry)
  11. *Dholpur Red Sandstone* (Historic red fortress stone of Red Fort and Agra Fort)
  12. *Tan Brown Granite* (Indestructible Deccan igneous luxury granite)
- **Iconic Architecture Carousel**:
  - Taj Mahal (Makrana Marble, Agra)
  - Khajuraho Temples (Sandstone, Madhya Pradesh)
  - Victoria Memorial (White Marble, Kolkata)
  - Ranakpur Jain Temple (1,444 uniquely carved marble pillars, Rajasthan)
  - Amber Fort (Yellow & Red Sandstone, Jaipur)
  - Modern Architecture (Precision granite & marble facades, New Delhi)
- **Interactive Heritage Timeline**:
  - *Ancient India (Pre-1600)*
  - *Medieval Architecture (1600 - 1700 AD)*
  - *Colonial Era (1700 - 1947)*
  - *Modern Architecture (1947 - Present)*
- **Applications Grid**:
  - *Modern Uses*: Luxury Flooring, Kitchen Countertops, Bathroom Surfaces, Feature Walls, Staircases, Exterior Facades.
  - *Traditional Uses*: Temple Interiors, Heritage Buildings, Sculptures, Decorative Columns, Monument Restoration, Traditional Jali Carving.
- **Studio Room Visualizer ("Imagine Your Space in Stone")**:
  - Multi-room selector: *Luxury Living Room*, *Heritage Palace Hall*, *Royal Suite Bathroom*, *Modern Civic Lobby*.
  - Surface finishes: *Mirror Polished (High Gloss)*, *Velvet Honed (Matte)*, *Antiqued Leather*.
  - Lighting modes: *Natural Daylight*, *Golden Sunset Glow*, *Dramatic Evening Accent*.
  - **Interactive Draggable Split-Screen Slider**: Compare Stone A vs. Stone B side by side in real time.
- **Instant Area & Slab Calculator**:
  - Room dimensions (Length × Width) to Net Sq Ft.
  - Recommended Cutting Wastage selection (10%, 15%, 20%).
  - Automatically calculates Gross Sq Ft and required Gangsaw Jumbo Slabs.
  - Direct 1-click quote transfer.
- **Interactive Inquiries & Sample Box Request Modal**:
  - Order free physical stone sample kits.
  - Request bespoke project quotes and architectural consultations.
- **Newsletter Subscription System**:
  - Real-time signup with instant email validation and animated toast notifications.

---

## 🛠️ Technology Stack

- **Frontend**: Vanilla HTML5, Vanilla CSS3 (Custom Luxury Design System with Glassmorphism, CSS Custom Properties, and responsive flexbox/grid), Vanilla JavaScript (ES6+ async/await, DOM events, drag handlers).
- **Backend**: Node.js, Express.js.
- **Data Persistence**: Structured JSON database layer (`server/db.js`) pre-seeded with heritage stone data, inquiry loggers, and subscriber collections.
- **Assets**: Authentic high-resolution local photography in `/public/assets/images`.

---

## 🚀 Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the backend server**:
   ```bash
   npm start
   # Or for development with automatic reload:
   npm run dev
   ```

3. **Open the application**:
   Navigate your browser to:
   ```
   http://localhost:5050
   ```

---

## 📡 REST API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/health` | `GET` | Server health check and uptime status |
| `/api/stones` | `GET` | List all stones (supports `?category=` and `?search=`) |
| `/api/stones/:id` | `GET` | Fetch detailed specifications for a single stone |
| `/api/architecture` | `GET` | Fetch iconic architectural monuments |
| `/api/heritage/timeline` | `GET` | Fetch historical eras and stone milestones |
| `/api/applications` | `GET` | Fetch modern and traditional applications data |
| `/api/visualizer/presets`| `GET` | Fetch visualizer rooms, lighting modes, and textures |
| `/api/gallery` | `GET` | Fetch portfolio gallery photography |
| `/api/stats` | `GET` | Fetch company statistics (years, varieties, projects) |
| `/api/inquiries` | `POST`| Submit a project quote request or sample order |
| `/api/newsletter` | `POST`| Subscribe to newsletter updates |
=======
# Architecture-Website
>>>>>>> b27ec3c666cebbc1e76e19dd1985881617eb7a4b
