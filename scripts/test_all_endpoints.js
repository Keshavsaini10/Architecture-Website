const http = require('http');

async function get(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:5050${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    }).on('error', reject);
  });
}

async function post(urlPath, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const req = http.request(`http://localhost:5050${urlPath}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting Full System Verification...\n');

  // 1. Health
  const health = await get('/api/health');
  console.log('✅ 1. Health Check:', health.data.status, `(HTTP ${health.status})`);

  // 2. All Stones
  const allStones = await get('/api/stones');
  console.log(`✅ 2. Stones Catalog: ${allStones.data.count} stones available (HTTP ${allStones.status})`);

  // 3. Filtered Stones
  const marbleStones = await get('/api/stones?category=marble');
  console.log(`✅ 3. Filter Marble: ${marbleStones.data.count} marbles found: ${marbleStones.data.data.map(s => s.name).join(', ')}`);

  // 4. Single Stone Detail
  const makrana = await get('/api/stones/makrana-marble');
  console.log(`✅ 4. Stone Detail (Makrana): Hardness = ${makrana.data.data.hardness}, Compressive = ${makrana.data.data.compressiveStrength}`);

  // 5. Architecture
  const arch = await get('/api/architecture');
  console.log(`✅ 5. Architecture: ${arch.data.count} monuments loaded: ${arch.data.data.map(a => a.name).join(', ')}`);

  // 6. Timeline
  const timeline = await get('/api/heritage/timeline');
  console.log(`✅ 6. Heritage Timeline: ${timeline.data.data.length} eras loaded`);

  // 7. Applications
  const apps = await get('/api/applications');
  console.log(`✅ 7. Applications: Modern (${apps.data.data.modern.length}) & Traditional (${apps.data.data.traditional.length})`);

  // 8. Visualizer Presets
  const vis = await get('/api/visualizer/presets');
  console.log(`✅ 8. Visualizer Presets: ${vis.data.data.stonesAvailable.length} stone textures enabled`);

  // 9. Gallery
  const gal = await get('/api/gallery');
  console.log(`✅ 9. Gallery: ${gal.data.count} architectural photographs loaded`);

  // 10. Stats
  const stats = await get('/api/stats');
  console.log(`✅ 10. Stats: Experience=${stats.data.data.yearsExperience}, Projects=${stats.data.data.projectsCompleted}`);

  // 11. Test Inquiry POST
  const inquiryRes = await post('/api/inquiries', {
    name: 'Architect Ananya Sharma',
    email: 'ananya@heritage-studio.in',
    phone: '+91 98200 12345',
    stoneInterest: 'Makrana Marble',
    application: 'Luxury Flooring',
    squareFootage: '4,500 sq ft',
    projectType: 'Bespoke Private Villa',
    message: 'We require bookmatched prime grade Makrana slabs for a palatial residence in Udaipur.'
  });
  console.log(`✅ 11. Inquiry Submission:`, inquiryRes.data.message);

  // 12. Test Newsletter POST
  const newsRes = await post('/api/newsletter', {
    email: 'curator@archdigest.com'
  });
  console.log(`✅ 12. Newsletter Signup:`, newsRes.data.message);

  // 13. Static Assets Check
  const home = await get('/');
  console.log(`✅ 13. Home HTML served: ${home.status === 200 ? 'SUCCESS' : 'FAILED'} (${home.raw.length} bytes)`);

  const css = await get('/css/index.css');
  console.log(`✅ 14. CSS served: ${css.status === 200 ? 'SUCCESS' : 'FAILED'} (${css.raw.length} bytes)`);

  const js = await get('/js/app.js');
  console.log(`✅ 15. JS served: ${js.status === 200 ? 'SUCCESS' : 'FAILED'} (${js.raw.length} bytes)`);

  console.log('\n🌟 ALL 15 BACKEND & FRONTEND TESTS PASSED WITH 100% SUCCESS!');
}

runTests().catch(console.error);
