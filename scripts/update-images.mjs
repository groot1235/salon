import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const targetDir = path.join(__dirname, '..', 'public', 'images');

// Exact matching Unsplash images for each slot
const imageSpecs = {
  // Hero: Woman with head in shampoo wash basin being rinsed with shower sprayer
  'hero.jpg': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=85',
  
  // Why Us: Modern salon interior with barber/styling chairs, mirrors, dark ceiling
  'why-us.jpg': 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&h=1050&q=85',

  // Work 2x2:
  // Top-left: Stylist curling client's hair with curling iron
  'work-1.jpg': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&h=720&q=85',
  // Top-right: Salon stations with circular backlit mirrors
  'work-2.jpg': 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&h=720&q=85',
  // Bottom-left: Scissor haircut trimming close-up
  'work-3.jpg': 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&h=720&q=85',
  // Bottom-right: Blow drying with round brush and dryer
  'work-4.jpg': 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=800&h=720&q=85',

  // Team: Exactly matching the 3 reference crops
  // 1: Blonde curls being curled with iron
  'team-1.jpg': 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&h=1067&q=85',
  // 2: Stylist cutting dark textured hair with scissors & comb
  'team-2.jpg': 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&h=1067&q=85',
  // 3: Sleek dark hair precision trim with scissors
  'team-3.jpg': 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&h=1067&q=85',

  // Gallery 4x2:
  // 1: Wash basin rinse
  'gallery-1.jpg': 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=600&h=900&q=85',
  // 2: Updo braided hairstyle
  'gallery-2.jpg': 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=600&h=900&q=85',
  // 3: Black & white hair cutting with shears
  'gallery-3.jpg': 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&h=900&q=85',
  // 4: Blow dry styling blonde hair
  'gallery-4.jpg': 'https://images.unsplash.com/photo-1519500599-47098864ce12?auto=format&fit=crop&w=600&h=900&q=85',
  // 5: Brunette waves
  'gallery-5.jpg': 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=600&h=900&q=85',
  // 6: Salon styling workstation & tools
  'gallery-6.jpg': 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&h=900&q=85',
  // 7: Hair treatment basin wash
  'gallery-7.jpg': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&h=900&q=85',
  // 8: Hair color / styling in salon
  'gallery-8.jpg': 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&h=900&q=85'
};

async function updateAll() {
  console.log('Fetching aligned images...');
  for (const [filename, url] of Object.entries(imageSpecs)) {
    const dest = path.join(targetDir, filename);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
      console.log(`✓ Updated ${filename}`);
    } catch (e) {
      console.error(`✗ Error on ${filename}:`, e.message);
    }
  }
  console.log('All images updated.');
}

updateAll();
