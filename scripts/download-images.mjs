import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetDir = path.join(__dirname, '..', 'public', 'images');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Curated high quality Unsplash photos matching the reference crops
const images = {
  // Hero: Hair washing at salon wash basin
  'hero.jpg': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=85',
  
  // Our Work 2x2 grid
  'work-1.jpg': 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=85', // curling iron
  'work-2.jpg': 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=800&q=85', // salon interior mirrors
  'work-3.jpg': 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=85', // precision scissor haircut
  'work-4.jpg': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=85', // blow drying
  
  // Team 3 portraits
  'team-1.jpg': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&h=1067&q=85', // Hannah - Blonde Specialist
  'team-2.jpg': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&h=1067&q=85', // Victoria - Hair Stylist
  'team-3.jpg': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&h=1067&q=85', // Rechelle - Colour Specialist
  
  // Why Us: Salon Interior
  'why-us.jpg': 'https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&w=1200&h=1050&q=85', // Luxury salon interior
  
  // Gallery 4x2 grid
  'gallery-1.jpg': 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=600&h=900&q=85', // Hair wash
  'gallery-2.jpg': 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&h=900&q=85', // Intricate updo/braid
  'gallery-3.jpg': 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&h=900&q=85', // Scissor trim B&W
  'gallery-4.jpg': 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=600&h=900&q=85', // Blow drying
  'gallery-5.jpg': 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=600&h=900&q=85', // Brunette waves
  'gallery-6.jpg': 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&h=900&q=85', // Extensions & station
  'gallery-7.jpg': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&h=900&q=85', // Basin wash
  'gallery-8.jpg': 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&h=900&q=85'  // Color styling
};

async function downloadAll() {
  console.log('Downloading salon images...');
  for (const [filename, url] of Object.entries(images)) {
    const dest = path.join(targetDir, filename);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      fs.writeFileSync(dest, Buffer.from(arrayBuffer));
      console.log(`✓ Downloaded ${filename}`);
    } catch (err) {
      console.error(`✗ Failed to download ${filename}:`, err.message);
    }
  }
  console.log('Done!');
}

downloadAll();
