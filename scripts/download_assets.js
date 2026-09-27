const fs = require('fs');
const path = require('path');
const https = require('https');

const assetsDir = path.join(__dirname, '..', 'public', 'assets', 'images');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Curated high-resolution images matching the reference screenshot exactly:
const images = {
  // Stones
  'stone_black_galaxy.jpg': 'https://images.unsplash.com/photo-1598887142487-3c854d51d2c2?auto=format&fit=crop&w=800&q=85', // Dark granite texture with sparkling flecks
  'stone_green_marble.jpg': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85', // Indian Green emerald serpentine marble
  'stone_rajasthan_sandstone.jpg': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85', // Warm terracotta / sandstone texture
  'stone_banswara_purple.jpg': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=85', // White with purple veining
  'stone_dholpur_beige.jpg': 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=800&q=85', // Buff sandstone
  
  // Iconic Architecture
  'arch_taj_mahal.jpg': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=85', // Taj Mahal white marble
  'arch_khajuraho.jpg': 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=85', // Khajuraho temples sandstone
  'arch_victoria.jpg': 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=85', // Victoria Memorial white marble
  'arch_ranakpur.jpg': 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=85', // Ranakpur Temple intricate carved marble pillars
  'arch_amber_fort.jpg': 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=85', // Amber Fort yellow sandstone Jaipur
  'arch_modern.jpg': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=85', // Modern stone facade New Delhi
  
  // Gallery items
  'gallery_palace_floor.jpg': 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=85',
  'gallery_carved_arch.jpg': 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=85',
  'gallery_luxury_bath.jpg': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=85',
  'gallery_temple_sculpture.jpg': 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=85',
  'gallery_modern_lobby.jpg': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=85',
  'gallery_stone_fountain.jpg': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=85'
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`Already exists: ${path.basename(dest)}`);
      return resolve();
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        return reject(new Error(`Failed to download ${url}: status code ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded: ${path.basename(dest)}`);
          resolve();
        });
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function run() {
  for (const [filename, url] of Object.entries(images)) {
    const dest = path.join(assetsDir, filename);
    try {
      await download(url, dest);
    } catch (e) {
      console.error(`Error downloading ${filename}:`, e.message);
    }
  }
  console.log('All downloads completed!');
}

run();
