import centerMountImg from '../assets/images/center_mount_1788721138616.webp';
import centerMountTransparentImg from '../assets/images/center-mount-transparent.webp';
import airVentImg from '../assets/images/air_vent_mount.webp';
import headrestMountImg from '../assets/images/headrest_mount.webp';
import tableStandImg from '../assets/images/table_stand_mount.webp';
import wallStandImg from '../assets/images/wall_stand_mount.webp';
import combinedImg from '../assets/images/3in1 copy.webp';
import universalPadImg from '../assets/images/Universal_.webp';
import fronxEtcImg from '../assets/images/Fronx, Taisor, Glanza and Baleno.webp';
import ertigaImg from '../assets/images/Ertiga.webp';
import swiftDzireImg from '../assets/images/Dzire and Swift.webp';
import threeXoImg from '../assets/images/3XO.webp';

export interface SearchItem {
  id: string;
  name: string;
  category: string;
  type: 'Combo' | 'Vehicle Dock' | 'Charger' | 'Mount' | 'Category';
  description: string;
  price: string;
  oldPrice?: string;
  savings?: string;
  image: string;
  link: string;
  tags: string[];
  compatibility: string[];
}

export const SEARCH_CATALOG: SearchItem[] = [
  // Combos
  {
    id: 'combo-ultimate',
    name: 'Ultimate All-in-One Kit',
    category: 'Combos & Bundles',
    type: 'Combo',
    description: 'Complete 25W Qi2 wireless charger ecosystem with 5 mounts: table stand, wall mount, air vent, car pad, and rear seat headrest.',
    price: '₹2,594',
    oldPrice: '₹3,694',
    savings: 'Save ₹1,100',
    image: combinedImg,
    link: '/category/all-in-one',
    tags: ['bundle', 'combo', 'magsafe', 'qi2', 'all-in-one', 'full kit', 'fast wireless'],
    compatibility: ['Universal', 'All Cars', 'Desk', 'Office', 'Wall', 'Home']
  },
  {
    id: 'combo-car',
    name: 'Car Combo Bundle (Front & Rear)',
    category: 'Combos & Bundles',
    type: 'Combo',
    description: 'Automotive charging kit with 25W magnetic dock, anti-slip center console pad, 360° air vent clip, and rear seat passenger clamp.',
    price: '₹2,346',
    oldPrice: '₹2,996',
    savings: 'Save ₹650',
    image: centerMountImg,
    link: '/category/car-combo',
    tags: ['car combo', 'vehicle pack', 'automotive', 'air vent', 'headrest', 'cockpit', 'magsafe'],
    compatibility: ['All Cars', 'Sedan', 'SUV', 'Hatchback']
  },
  {
    id: 'combo-home-office',
    name: 'Home & Office Workstation Combo',
    category: 'Combos & Bundles',
    type: 'Combo',
    description: 'Workstation wireless charging package with weighted CNC aluminum table stand and damage-free magnetic wall base.',
    price: '₹2,247',
    oldPrice: '₹2,697',
    savings: 'Save ₹450',
    image: tableStandImg,
    link: '/category/home-office',
    tags: ['workstation', 'desk', 'office', 'table stand', 'wall mount', 'bedside', 'nightstand'],
    compatibility: ['Desk', 'Wall', 'Home Office', 'Workstation', 'Nightstand']
  },
  {
    id: 'combo-mega',
    name: 'Dual Charger Mega Bundle',
    category: 'Combos & Bundles',
    type: 'Combo',
    description: 'Two complete 25W Qi2 core chargers plus all 5 universal mount bases for seamless home and car dual setup.',
    price: '₹4,293',
    oldPrice: '₹5,693',
    savings: 'Save ₹1,400',
    image: combinedImg,
    link: '/category/all-in-one',
    tags: ['dual charger', 'mega bundle', 'two chargers', 'home and car', 'all mounts'],
    compatibility: ['Home & Car', 'All Cars', 'Universal']
  },

  // Vehicle Specific Docks
  {
    id: 'car-fronx',
    name: 'Maruti Suzuki Fronx 25W Qi2 Dock',
    category: 'Vehicle Specific',
    type: 'Vehicle Dock',
    description: 'Custom-molded 25W Qi2 wireless charging pad engineered specifically for Maruti Suzuki Fronx center console tray.',
    price: '₹2,349',
    oldPrice: '₹3,449',
    savings: 'Save ₹1,100',
    image: fronxEtcImg,
    link: '/product/fronx',
    tags: ['fronx', 'maruti suzuki', 'oem fit', 'console tray', 'car charger', 'qi2 wireless'],
    compatibility: ['Maruti Suzuki Fronx', 'Fronx 2023', 'Fronx 2024', 'Fronx 2025']
  },
  {
    id: 'car-baleno',
    name: 'Maruti Suzuki Baleno 25W Qi2 Dock',
    category: 'Vehicle Specific',
    type: 'Vehicle Dock',
    description: 'Precision fit 25W magnetic wireless charging dock seamlessly integrated into Baleno console cavity.',
    price: '₹2,349',
    oldPrice: '₹3,449',
    savings: 'Save ₹1,100',
    image: fronxEtcImg,
    link: '/product/baleno',
    tags: ['baleno', 'maruti suzuki', 'oem fit', 'center console', 'car charger', 'wireless'],
    compatibility: ['Maruti Suzuki Baleno', 'Baleno 2022', 'Baleno 2023', 'Baleno 2024', 'Baleno 2025']
  },
  {
    id: 'car-glanza',
    name: 'Toyota Glanza 25W Qi2 Dock',
    category: 'Vehicle Specific',
    type: 'Vehicle Dock',
    description: 'Custom-fit wireless charging tray engineered for Toyota Glanza center console lower gear storage.',
    price: '₹2,349',
    oldPrice: '₹3,449',
    savings: 'Save ₹1,100',
    image: fronxEtcImg,
    link: '/product/glanza',
    tags: ['glanza', 'toyota', 'toyota glanza', 'oem fit', 'wireless charger'],
    compatibility: ['Toyota Glanza', 'Glanza 2022', 'Glanza 2023', 'Glanza 2024', 'Glanza 2025']
  },
  {
    id: 'car-taisor',
    name: 'Toyota Urban Cruiser Taisor Dock',
    category: 'Vehicle Specific',
    type: 'Vehicle Dock',
    description: 'OEM-fit wireless fast charging pad designed exclusively for Toyota Urban Cruiser Taisor dash console.',
    price: '₹2,349',
    oldPrice: '₹3,449',
    savings: 'Save ₹1,100',
    image: fronxEtcImg,
    link: '/product/taisor',
    tags: ['taisor', 'toyota taisor', 'urban cruiser', 'toyota', 'car charger'],
    compatibility: ['Toyota Taisor', 'Urban Cruiser Taisor', 'Taisor 2024', 'Taisor 2025']
  },
  {
    id: 'car-ertiga',
    name: 'Maruti Suzuki Ertiga 25W Qi2 Dock',
    category: 'Vehicle Specific',
    type: 'Vehicle Dock',
    description: 'Multi-device 25W fast wireless charging console integration with air cooling for Maruti Suzuki Ertiga.',
    price: '₹2,349',
    oldPrice: '₹3,449',
    savings: 'Save ₹1,100',
    image: ertigaImg,
    link: '/product/ertiga',
    tags: ['ertiga', 'maruti suzuki ertiga', 'mpv', 'cooled cavity', 'fast wireless'],
    compatibility: ['Maruti Suzuki Ertiga', 'Ertiga 2019 - 2025']
  },
  {
    id: 'car-swift',
    name: 'Maruti Suzuki Swift 25W Dock (4th Gen)',
    category: 'Vehicle Specific',
    type: 'Vehicle Dock',
    description: 'Precision molded 25W magnetic fast charging pad tailored for 4th generation Swift dashboard console tray.',
    price: '₹2,349',
    oldPrice: '₹3,449',
    savings: 'Save ₹1,100',
    image: swiftDzireImg,
    link: '/product/swift',
    tags: ['swift', 'maruti suzuki swift', 'swift 2024', 'swift 2025', 'hatchback dock'],
    compatibility: ['Maruti Suzuki Swift', 'Swift 2024', 'Swift 2025']
  },
  {
    id: 'car-dzire',
    name: 'Maruti Suzuki Swift Dzire Dock',
    category: 'Vehicle Specific',
    type: 'Vehicle Dock',
    description: 'Custom-contoured 25W wireless charging dock designed precisely for Swift Dzire console pocket.',
    price: '₹2,349',
    oldPrice: '₹3,449',
    savings: 'Save ₹1,100',
    image: swiftDzireImg,
    link: '/product/dzire',
    tags: ['dzire', 'swift dzire', 'maruti suzuki dzire', 'sedan charger'],
    compatibility: ['Maruti Suzuki Dzire', 'Swift Dzire 2020 - 2025']
  },
  {
    id: 'car-3xo',
    name: 'Mahindra XUV 3XO 25W Dock',
    category: 'Vehicle Specific',
    type: 'Vehicle Dock',
    description: 'Precision-molded wireless charging center console tray designed specifically for Mahindra XUV 3XO.',
    price: '₹2,349',
    oldPrice: '₹3,449',
    savings: 'Save ₹1,100',
    image: threeXoImg,
    link: '/product/3xo',
    tags: ['3xo', 'mahindra 3xo', 'xuv 3xo', 'mahindra', 'suv dock', 'console tray'],
    compatibility: ['Mahindra XUV 3XO', '3XO 2024', '3XO 2025']
  },
  {
    id: 'car-universal',
    name: 'Universal Automotive Charging Pad',
    category: 'Universal Charging',
    type: 'Charger',
    description: 'Universal 25W Qi2 fast wireless charging pad with secure dashboard and center console grip for any car.',
    price: '₹2,098',
    oldPrice: '₹3,299',
    savings: 'Save ₹1,201',
    image: universalPadImg,
    link: '/product/universal',
    tags: ['universal', 'car pad', 'universal charger', 'dashboard mat', 'any vehicle', 'all cars'],
    compatibility: ['Universal', 'All Vehicles', 'Sedan', 'SUV', 'Hatchback', 'Truck']
  },

  // Modular Stand-Alone Mounts
  {
    id: 'mount-vent',
    name: 'Air Vent 360° Rotating Holder Base',
    category: 'Mounts & Bases',
    type: 'Mount',
    description: 'Steel-core AC vent blade clamp with lockable 360° rotating ball pivot for horizontal or vertical automotive louvers.',
    price: '₹299',
    oldPrice: '₹499',
    savings: 'Save ₹200',
    image: airVentImg,
    link: '/category/stand-alone',
    tags: ['air vent', 'vent mount', 'vent clip', '360 mount', 'car holder', 'ac vent'],
    compatibility: ['All Cars', 'Horizontal Vents', 'Vertical Vents']
  },
  {
    id: 'mount-table',
    name: 'Weighted Aluminum Table Stand Base',
    category: 'Mounts & Bases',
    type: 'Mount',
    description: 'Solid CNC-machined aluminum desktop pedestal with rubberized non-scratch base and ergonomic 65-degree tilt.',
    price: '₹399',
    oldPrice: '₹599',
    savings: 'Save ₹200',
    image: tableStandImg,
    link: '/category/stand-alone',
    tags: ['table stand', 'desk stand', 'desktop mount', 'workstation', 'aluminum stand'],
    compatibility: ['Desk', 'Office', 'Workstation', 'Bedside', 'Table']
  },
  {
    id: 'mount-wall',
    name: 'Flush Wall & Nightstand Magnetic Base',
    category: 'Mounts & Bases',
    type: 'Mount',
    description: 'Low-profile magnetic dock plate with ultra-strong damage-free 3M VHB adhesive for wall, tile, or bedside nightstand.',
    price: '₹299',
    oldPrice: '₹499',
    savings: 'Save ₹200',
    image: wallStandImg,
    link: '/category/stand-alone',
    tags: ['wall mount', 'nightstand', 'bedside', 'flush base', '3m mount'],
    compatibility: ['Wall', 'Tile', 'Bedside Table', 'Cabinet', 'Smooth Surfaces']
  },
  {
    id: 'mount-rear',
    name: 'Rear Seat Headrest Clamp Base',
    category: 'Mounts & Bases',
    type: 'Mount',
    description: 'Dual-bracket stainless headrest post mount giving rear passengers easy access to magnetic charging and movie watching.',
    price: '₹399',
    oldPrice: '₹599',
    savings: 'Save ₹200',
    image: headrestMountImg,
    link: '/category/stand-alone',
    tags: ['headrest', 'rear seat', 'back seat', 'passenger mount', 'headrest clamp'],
    compatibility: ['Car Headrest Posts', 'All Vehicles']
  },
  {
    id: 'mount-pad',
    name: 'Car Console Charging Pad Base',
    category: 'Mounts & Bases',
    type: 'Mount',
    description: 'High-friction silicone automotive console mat with cable guide channel. Snaps directly around your Qicdock core.',
    price: '₹299',
    oldPrice: '₹499',
    savings: 'Save ₹200',
    image: centerMountImg,
    link: '/category/stand-alone',
    tags: ['console pad', 'silicone pad', 'car mat', 'dash mount', 'tray base'],
    compatibility: ['All Flat Consoles', 'Automotive']
  }
];

// Levenshtein distance for fuzzy matching
export function getLevenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// Tokenize text into normalized unique words
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 0);
}

// Check if a query token matches a candidate word (exact, prefix, or fuzzy)
export function matchToken(queryToken: string, candidateToken: string): { matches: boolean; score: number } {
  if (queryToken === candidateToken) {
    return { matches: true, score: 1.0 };
  }

  // Prefix match (e.g., 'charg' -> 'charger')
  if (candidateToken.startsWith(queryToken) && queryToken.length >= 3) {
    return { matches: true, score: 0.9 };
  }

  // Substring match
  if (candidateToken.includes(queryToken) && queryToken.length >= 4) {
    return { matches: true, score: 0.8 };
  }

  // Fuzzy match tolerance:
  // length 4-6: allow 1 edit distance
  // length > 6: allow 2 edit distances
  const qLen = queryToken.length;
  const maxDistance = qLen >= 7 ? 2 : qLen >= 4 ? 1 : 0;

  if (maxDistance > 0 && Math.abs(qLen - candidateToken.length) <= maxDistance) {
    const dist = getLevenshteinDistance(queryToken, candidateToken);
    if (dist <= maxDistance) {
      const score = dist === 1 ? 0.75 : 0.55;
      return { matches: true, score };
    }
  }

  return { matches: false, score: 0 };
}

export interface SearchResult {
  item: SearchItem;
  score: number;
  matchedAttributes: string[];
}

export function searchEngine(query: string): SearchResult[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  const queryTokens = tokenize(cleanQuery);
  if (queryTokens.length === 0) return [];

  const results: SearchResult[] = [];

  for (const item of SEARCH_CATALOG) {
    let totalScore = 0;
    const matchedTokensCount = new Set<string>();
    const matchedAttributes: string[] = [];

    const nameTokens = tokenize(item.name);
    const categoryTokens = tokenize(item.category);
    const descTokens = tokenize(item.description);
    const tagTokens = item.tags.flatMap(t => tokenize(t));
    const compatTokens = item.compatibility.flatMap(c => tokenize(c));

    // Direct exact name match bonus
    if (item.name.toLowerCase().includes(cleanQuery)) {
      totalScore += 120;
      matchedAttributes.push('Name');
    }

    // Token-based matching: evaluate each query token
    for (const qToken of queryTokens) {
      let tokenMaxScore = 0;
      let attributeMatched = '';

      // Check Name tokens (Highest weight)
      for (const nToken of nameTokens) {
        const { matches, score } = matchToken(qToken, nToken);
        if (matches && score * 50 > tokenMaxScore) {
          tokenMaxScore = score * 50;
          attributeMatched = 'Name';
        }
      }

      // Check Compatibility tokens (High weight for car models like Fronx, Baleno, etc.)
      for (const cToken of compatTokens) {
        const { matches, score } = matchToken(qToken, cToken);
        if (matches && score * 45 > tokenMaxScore) {
          tokenMaxScore = score * 45;
          attributeMatched = 'Compatibility';
        }
      }

      // Check Category / Type tokens
      for (const catToken of [...categoryTokens, tokenize(item.type)].flat()) {
        const { matches, score } = matchToken(qToken, catToken);
        if (matches && score * 35 > tokenMaxScore) {
          tokenMaxScore = score * 35;
          attributeMatched = 'Category';
        }
      }

      // Check Tag / Keyword tokens
      for (const tToken of tagTokens) {
        const { matches, score } = matchToken(qToken, tToken);
        if (matches && score * 30 > tokenMaxScore) {
          tokenMaxScore = score * 30;
          attributeMatched = 'Tags';
        }
      }

      // Check Description tokens
      for (const dToken of descTokens) {
        const { matches, score } = matchToken(qToken, dToken);
        if (matches && score * 20 > tokenMaxScore) {
          tokenMaxScore = score * 20;
          attributeMatched = 'Description';
        }
      }

      if (tokenMaxScore > 0) {
        totalScore += tokenMaxScore;
        matchedTokensCount.add(qToken);
        if (attributeMatched && !matchedAttributes.includes(attributeMatched)) {
          matchedAttributes.push(attributeMatched);
        }
      }
    }

    // For multi-word queries, reward items matching all or most query tokens
    const matchRatio = matchedTokensCount.size / queryTokens.length;
    if (queryTokens.length > 1) {
      if (matchRatio === 1) {
        totalScore += 50; // Matched all words
      } else if (matchRatio >= 0.65) {
        totalScore += 20;
      } else {
        // Did not match enough tokens of the query
        totalScore *= 0.3;
      }
    }

    if (totalScore >= 20) {
      results.push({
        item,
        score: Math.round(totalScore),
        matchedAttributes
      });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results;
}
