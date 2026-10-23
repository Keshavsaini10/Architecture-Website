const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const dataDir = path.join(__dirname, 'data');
const sqlitePath = path.join(dataDir, 'exploremore.sqlite');
const schemaPath = path.join(__dirname, 'sql', 'schema.sqlite.sql');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

function readJson(filename, fallback) {
  const filepath = path.join(dataDir, filename);
  try {
    if (!fs.existsSync(filepath)) return fallback;
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  } catch (err) {
    console.error(`Error reading ${filename}:`, err.message);
    return fallback;
  }
}

function toJson(value) {
  return JSON.stringify(value ?? []);
}

function parseJson(value, fallback) {
  if (value == null || value === '') return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

const database = new DatabaseSync(sqlitePath);
database.exec(fs.readFileSync(schemaPath, 'utf-8'));

function seedIfEmpty() {
  const stoneCount = database.prepare('SELECT COUNT(*) AS n FROM stones').get().n;
  if (stoneCount === 0) {
    const stones = readJson('stones.json', []);
    const insert = database.prepare(`
      INSERT INTO stones (
        id, name, subtitle, category, origin, quarry_location, image, description, color,
        finish_available, compressive_strength, water_absorption, hardness, density,
        recommended_uses, historical_significance, price_tier, rating, tags
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    database.exec('BEGIN');
    try {
      for (const s of stones) {
        insert.run(
          s.id, s.name, s.subtitle, s.category, s.origin, s.quarryLocation, s.image,
          s.description, s.color, toJson(s.finishAvailable), s.compressiveStrength,
          s.waterAbsorption, s.hardness, s.density, toJson(s.recommendedUses),
          s.historicalSignificance, s.priceTier, s.rating ?? null, toJson(s.tags)
        );
      }
      database.exec('COMMIT');
    } catch (err) {
      database.exec('ROLLBACK');
      throw err;
    }
  }

  const archCount = database.prepare('SELECT COUNT(*) AS n FROM architecture').get().n;
  if (archCount === 0) {
    const rows = readJson('architecture.json', []);
    const insert = database.prepare(`
      INSERT INTO architecture (
        id, name, stone_used, location, era, builder, image, summary, stone_details, key_features
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    database.exec('BEGIN');
    try {
      for (const a of rows) {
        insert.run(
          a.id, a.name, a.stoneUsed, a.location, a.era, a.builder, a.image,
          a.summary, a.stoneDetails, toJson(a.keyFeatures)
        );
      }
      database.exec('COMMIT');
    } catch (err) {
      database.exec('ROLLBACK');
      throw err;
    }
  }

  const eraCount = database.prepare('SELECT COUNT(*) AS n FROM heritage_timeline').get().n;
  if (eraCount === 0) {
    const rows = readJson('heritage_timeline.json', []);
    const insert = database.prepare(`
      INSERT INTO heritage_timeline (
        era_id, era_name, period, title, description, stone_hero, exemplar, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    rows.forEach((row, index) => {
      insert.run(
        row.eraId, row.eraName, row.period, row.title, row.description,
        row.stoneHero, row.exemplar, index
      );
    });
  }

  const appCount = database.prepare('SELECT COUNT(*) AS n FROM applications').get().n;
  if (appCount === 0) {
    const apps = readJson('applications.json', { modern: [], traditional: [] });
    const insert = database.prepare(`
      INSERT INTO applications (id, kind, title, subtitle, icon, recommended, description)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    for (const kind of ['modern', 'traditional']) {
      for (const a of apps[kind] || []) {
        insert.run(a.id, kind, a.title, a.subtitle, a.icon, toJson(a.recommended), a.description);
      }
    }
  }

  const roomCount = database.prepare('SELECT COUNT(*) AS n FROM visualizer_rooms').get().n;
  if (roomCount === 0) {
    const presets = readJson('visualizer_presets.json', {});
    const insertRoom = database.prepare(
      'INSERT INTO visualizer_rooms (id, name, base_image, floor_height, wall_width) VALUES (?, ?, ?, ?, ?)'
    );
    const insertLight = database.prepare(
      'INSERT INTO visualizer_lighting (id, name, filter) VALUES (?, ?, ?)'
    );
    const insertFinish = database.prepare(
      'INSERT INTO visualizer_finishes (id, name, overlay_opacity, blend_mode) VALUES (?, ?, ?, ?)'
    );
    const insertStone = database.prepare(
      'INSERT INTO visualizer_stones (id, name, category, texture, tint) VALUES (?, ?, ?, ?, ?)'
    );
    for (const r of presets.rooms || []) {
      insertRoom.run(r.id, r.name, r.baseImage, r.floorHeight, r.wallWidth);
    }
    for (const l of presets.lightingModes || []) {
      insertLight.run(l.id, l.name, l.filter);
    }
    for (const f of presets.finishes || []) {
      insertFinish.run(f.id, f.name, f.overlayOpacity, f.blendMode);
    }
    for (const s of presets.stonesAvailable || []) {
      insertStone.run(s.id, s.name, s.category, s.texture, s.tint);
    }
  }

  const galCount = database.prepare('SELECT COUNT(*) AS n FROM gallery').get().n;
  if (galCount === 0) {
    const rows = readJson('gallery.json', []);
    const insert = database.prepare(
      'INSERT INTO gallery (id, title, category, stone, image, caption) VALUES (?, ?, ?, ?, ?, ?)'
    );
    for (const g of rows) {
      insert.run(g.id, g.title, g.category, g.stone, g.image, g.caption);
    }
  }

  const statsCount = database.prepare('SELECT COUNT(*) AS n FROM stats').get().n;
  if (statsCount === 0) {
    const s = readJson('stats.json', {});
    database.prepare(`
      INSERT INTO stats (
        id, years_experience, stone_varieties, projects_completed,
        cities_served, satisfaction_rate, quarry_ownership
      ) VALUES (1, ?, ?, ?, ?, ?, ?)
    `).run(
      s.yearsExperience || null,
      s.stoneVarieties || null,
      s.projectsCompleted || null,
      s.citiesServed || null,
      s.satisfactionRate || null,
      s.quarryOwnership || null
    );
  }

  const inqCount = database.prepare('SELECT COUNT(*) AS n FROM inquiries').get().n;
  if (inqCount === 0) {
    const rows = readJson('inquiries.json', []);
    const insert = database.prepare(`
      INSERT INTO inquiries (
        id, created_at, status, name, email, phone, stone_interest,
        application, square_footage, project_type, message
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const i of rows) {
      insert.run(
        i.id,
        i.timestamp || new Date().toISOString(),
        i.status || 'Received',
        i.name,
        (i.email || '').toLowerCase(),
        i.phone || '',
        i.stoneInterest || null,
        i.application || null,
        i.squareFootage || null,
        i.projectType || null,
        i.message || ''
      );
    }
  }

  const subCount = database.prepare('SELECT COUNT(*) AS n FROM subscribers').get().n;
  if (subCount === 0) {
    const rows = readJson('subscribers.json', []);
    const insert = database.prepare(
      'INSERT OR IGNORE INTO subscribers (email, source, subscribed_at) VALUES (?, ?, ?)'
    );
    for (const s of rows) {
      insert.run((s.email || '').toLowerCase(), s.source || 'website_footer', s.subscribedAt);
    }
  }
}

seedIfEmpty();

function mapStone(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    subtitle: row.subtitle,
    category: row.category,
    origin: row.origin,
    quarryLocation: row.quarry_location,
    image: row.image,
    description: row.description,
    color: row.color,
    finishAvailable: parseJson(row.finish_available, []),
    compressiveStrength: row.compressive_strength,
    waterAbsorption: row.water_absorption,
    hardness: row.hardness,
    density: row.density,
    recommendedUses: parseJson(row.recommended_uses, []),
    historicalSignificance: row.historical_significance,
    priceTier: row.price_tier,
    rating: row.rating,
    tags: parseJson(row.tags, [])
  };
}

function mapArchitecture(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    stoneUsed: row.stone_used,
    location: row.location,
    era: row.era,
    builder: row.builder,
    image: row.image,
    summary: row.summary,
    stoneDetails: row.stone_details,
    keyFeatures: parseJson(row.key_features, [])
  };
}

function mapInquiry(row) {
  if (!row) return null;
  return {
    id: row.id,
    timestamp: row.created_at,
    status: row.status,
    name: row.name,
    email: row.email,
    phone: row.phone,
    stoneInterest: row.stone_interest,
    application: row.application,
    squareFootage: row.square_footage,
    projectType: row.project_type,
    message: row.message
  };
}

module.exports = {
  getStones: (filter = {}) => {
    let sql = 'SELECT * FROM stones WHERE 1=1';
    const params = [];
    if (filter.category && filter.category.toLowerCase() !== 'all') {
      sql += ' AND lower(category) = lower(?)';
      params.push(filter.category);
    }
    if (filter.search) {
      const q = `%${filter.search.toLowerCase()}%`;
      sql += ` AND (
        lower(name) LIKE ? OR lower(origin) LIKE ? OR lower(description) LIKE ?
        OR lower(tags) LIKE ?
      )`;
      params.push(q, q, q, q);
    }
    sql += ' ORDER BY name ASC';
    return database.prepare(sql).all(...params).map(mapStone);
  },

  getStoneById: (id) => {
    return mapStone(database.prepare('SELECT * FROM stones WHERE id = ?').get(id));
  },

  getArchitecture: () => {
    return database.prepare('SELECT * FROM architecture').all().map(mapArchitecture);
  },

  getArchitectureById: (id) => {
    return mapArchitecture(database.prepare('SELECT * FROM architecture WHERE id = ?').get(id));
  },

  getTimeline: () => {
    return database.prepare('SELECT * FROM heritage_timeline ORDER BY sort_order ASC').all().map((row) => ({
      eraId: row.era_id,
      eraName: row.era_name,
      period: row.period,
      title: row.title,
      description: row.description,
      stoneHero: row.stone_hero,
      exemplar: row.exemplar
    }));
  },

  getApplications: () => {
    const rows = database.prepare('SELECT * FROM applications').all();
    const result = { modern: [], traditional: [] };
    for (const row of rows) {
      const item = {
        id: row.id,
        title: row.title,
        subtitle: row.subtitle,
        icon: row.icon,
        recommended: parseJson(row.recommended, []),
        description: row.description
      };
      if (result[row.kind]) result[row.kind].push(item);
    }
    return result;
  },

  getVisualizerPresets: () => {
    return {
      rooms: database.prepare('SELECT * FROM visualizer_rooms').all().map((r) => ({
        id: r.id,
        name: r.name,
        baseImage: r.base_image,
        floorHeight: r.floor_height,
        wallWidth: r.wall_width
      })),
      lightingModes: database.prepare('SELECT * FROM visualizer_lighting').all().map((l) => ({
        id: l.id,
        name: l.name,
        filter: l.filter
      })),
      finishes: database.prepare('SELECT * FROM visualizer_finishes').all().map((f) => ({
        id: f.id,
        name: f.name,
        overlayOpacity: f.overlay_opacity,
        blendMode: f.blend_mode
      })),
      stonesAvailable: database.prepare('SELECT * FROM visualizer_stones').all().map((s) => ({
        id: s.id,
        name: s.name,
        category: s.category,
        texture: s.texture,
        tint: s.tint
      }))
    };
  },

  getGallery: (category) => {
    let sql = 'SELECT * FROM gallery';
    const params = [];
    if (category && category.toLowerCase() !== 'all') {
      sql += ' WHERE lower(category) = lower(?)';
      params.push(category);
    }
    return database.prepare(sql).all(...params).map((g) => ({
      id: g.id,
      title: g.title,
      category: g.category,
      stone: g.stone,
      image: g.image,
      caption: g.caption
    }));
  },

  getStats: () => {
    const row = database.prepare('SELECT * FROM stats WHERE id = 1').get();
    if (!row) return {};
    return {
      yearsExperience: row.years_experience,
      stoneVarieties: row.stone_varieties,
      projectsCompleted: row.projects_completed,
      citiesServed: row.cities_served,
      satisfactionRate: row.satisfaction_rate,
      quarryOwnership: row.quarry_ownership
    };
  },

  createInquiry: (inquiryData) => {
    const id = 'INQ-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(Math.random() * 1000);
    const timestamp = new Date().toISOString();
    database.prepare(`
      INSERT INTO inquiries (
        id, created_at, status, name, email, phone, stone_interest,
        application, square_footage, project_type, message
      ) VALUES (?, ?, 'Received', ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      timestamp,
      inquiryData.name,
      inquiryData.email,
      inquiryData.phone || '',
      inquiryData.stoneInterest || 'General Inquiry',
      inquiryData.application || 'Interior/Exterior',
      inquiryData.squareFootage || 'Not Specified',
      inquiryData.projectType || 'Residential / Commercial',
      inquiryData.message || ''
    );
    return mapInquiry(database.prepare('SELECT * FROM inquiries WHERE id = ?').get(id));
  },

  getInquiries: () => {
    return database.prepare('SELECT * FROM inquiries ORDER BY created_at DESC').all().map(mapInquiry);
  },

  addSubscriber: (email, source = 'website_footer') => {
    const normalized = email.trim().toLowerCase();
    const existing = database.prepare('SELECT email FROM subscribers WHERE email = ?').get(normalized);
    if (existing) {
      return { status: 'already_subscribed', message: 'You are already subscribed to our heritage stone newsletter!' };
    }
    database.prepare(
      'INSERT INTO subscribers (email, source, subscribed_at) VALUES (?, ?, ?)'
    ).run(normalized, source, new Date().toISOString());
    return { status: 'success', message: 'Thank you for subscribing! Welcome to ExploreMore Stones.' };
  },

  getSubscribers: () => {
    return database.prepare('SELECT * FROM subscribers ORDER BY subscribed_at DESC').all().map((s) => ({
      email: s.email,
      source: s.source,
      subscribedAt: s.subscribed_at
    }));
  }
};
