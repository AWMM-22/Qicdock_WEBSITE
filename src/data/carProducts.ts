import ertigaImg from '../assets/images/Ertiga.webp';
import fronxEtcImg from '../assets/images/Fronx, Taisor, Glanza and Baleno.webp';
import swiftDzireImg from '../assets/images/Dzire and Swift.webp';
import threeXoImg from '../assets/images/3XO.webp';
import universalPadImg from '../assets/images/Universal_.webp';
import centerMountImg from '../assets/images/center_mount_1788721138616.webp';
import centerMountTransparentImg from '../assets/images/center-mount-transparent.webp';
import leftCarMountImg from '../assets/images/left_car_mount_1788721155876.webp';
import rightCarMountImg from '../assets/images/right_car_mount_1788721169113.webp';

export interface CarProduct {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  brand: 'Maruti Suzuki' | 'Toyota' | 'Mahindra' | 'Universal';
  subtitle: string;
  price: number;
  originalPrice: number;
  discountPercentage: string;
  isHot: boolean;
  years: string;
  slot: string;
  badge: string;
  images: string[];
  category: string;
  tags: string[];
  description: string;
  features: string[];
  specs: {
    chargingSpeed: string;
    compatibility: string;
    material: string;
    installation: string;
    warranty: string;
  };
}

export const CAR_PRODUCTS: CarProduct[] = [
  {
    id: 'ertiga',
    slug: 'ertiga',
    name: 'Maruti Suzuki Ertiga Wireless Phone Charger | Charging Pad',
    shortName: 'Maruti Suzuki Ertiga',
    brand: 'Maruti Suzuki',
    subtitle: 'Maruti Suzuki Ertiga | Car Wireless Mag-Safe iPhone Charger | Charging Pad',
    price: 2349,
    originalPrice: 3449,
    discountPercentage: '-32%',
    isHot: true,
    years: '2019 - 2025',
    slot: 'Center Console Cooled Cup Space',
    badge: 'High Demand',
    images: [
      ertigaImg,
      centerMountImg,
      leftCarMountImg,
      rightCarMountImg
    ],
    category: 'Car Specific',
    tags: ['Charging Pad', 'Fast Charging', 'Magnetic Charging', 'Magsafe', 'Maruti Suzuki Ertiga', 'Wireless Phone Charger'],
    description: 'Custom-tailored 3D laser-scanned wireless charging pad designed exclusively for the Maruti Suzuki Ertiga center console cavity. Features built-in airflow ventilation, Qi2 25W super-fast magnetic charging, and seamless plug-and-play factory look.',
    features: [
      'Precision 3D contour engineered to fit the Ertiga console with zero rattle or wobble.',
      'True 25W Qi2 fast magnetic alignment compatible with iPhone MagSafe and Android Qi devices.',
      'Active thermal channel utilizing console ventilation to keep phones ice cold during navigation.',
      'Anti-slip high-grade silicone grip ensures your phone remains locked even on rough roads.',
      'Non-destructive installation — plug directly into the 12V socket with zero wire cutting.'
    ],
    specs: {
      chargingSpeed: '25W Max Qi2 / 15W MagSafe Fast Charge',
      compatibility: 'Ertiga (2019 - 2025, ZXi, VXi, ZXi+ & Tour M)',
      material: 'Heat-Resistant Automotive Grade Polycarbonate & ABS',
      installation: '100% Plug & Play (Zero Wire Splicing)',
      warranty: '1 Year Official Replacement Guarantee'
    }
  },
  {
    id: 'fronx',
    slug: 'fronx',
    name: 'Maruti Suzuki Fronx Wireless Phone Charger | Charging Pad',
    shortName: 'Maruti Suzuki Fronx',
    brand: 'Maruti Suzuki',
    subtitle: 'Maruti Suzuki Fronx | Car Wireless Mag-Safe iPhone Charger | Charging Pad',
    price: 2349,
    originalPrice: 3449,
    discountPercentage: '-32%',
    isHot: true,
    years: '2023 - 2025',
    slot: 'Center Console Lower Tray',
    badge: 'Best Seller',
    images: [
      fronxEtcImg,
      centerMountImg,
      leftCarMountImg,
      rightCarMountImg
    ],
    category: 'Car Specific',
    tags: ['Charging Pad', 'Fast Charging', 'Magnetic Charging', 'Magsafe', 'Maruti Suzuki Fronx', 'Wireless Phone Charger'],
    description: 'Specially fabricated for the Maruti Suzuki Fronx center console utility tray. Perfectly matches the factory dashboard textures and copper/carbon interior accents with ultra-stable MagSafe hold.',
    features: [
      'Tailor-made for Fronx (Sigma, Delta, Delta+, Zeta, Alpha models).',
      'Ultra-slim flush profile maintains accessibility to the USB and 12V power port.',
      'Industrial-strength neodymium magnets provide instant 1-second snap-on lock.',
      'Integrated intelligent protection against over-voltage, short-circuit, and overheating.',
      'Hidden cable routing channels for a 100% wireless look.'
    ],
    specs: {
      chargingSpeed: '25W Qi2 Peak Output (Supports iPhone 12–16 & Qi Androids)',
      compatibility: 'Fronx All Variants (2023, 2024, 2025)',
      material: 'UV-Stabilized Automotive Polymer',
      installation: 'Instant 30-Second Magnetic / Adhesive Drop-In',
      warranty: '1 Year Official Replacement Guarantee'
    }
  },
  {
    id: '3xo',
    slug: '3xo',
    name: 'Mahindra XUV 3XO Wireless Phone Charger | Charging Pad',
    shortName: 'Mahindra XUV 3XO',
    brand: 'Mahindra',
    subtitle: 'Mahindra XUV 3XO | Car Wireless Mag-Safe iPhone Charger | Charging Pad',
    price: 2349,
    originalPrice: 3449,
    discountPercentage: '-32%',
    isHot: true,
    years: '2024 - 2025',
    slot: 'Center Console Tray',
    badge: 'New Arrival',
    images: [
      threeXoImg,
      centerMountImg,
      leftCarMountImg,
      rightCarMountImg
    ],
    category: 'Car Specific',
    tags: ['Charging Pad', 'Fast Charging', 'Magnetic Charging', 'Magsafe', 'Mahindra XUV 3XO', 'Wireless Phone Charger'],
    description: 'Engineered specifically for the bold interior cockpit of the Mahindra XUV 3XO. Drops into the front console cavity without obstructing the gear shifter or ambient LED lighting.',
    features: [
      'Exact contour matching the 3XO center console pocket.',
      'High-output 25W multi-layer induction coil for rapid charging through thick cases.',
      'Matte black stealth finish seamlessly integrates with Mahindra factory cockpit.',
      'Over-temperature auto-throttling keeps battery health at peak condition.',
      'Plug-and-play cable included with right-angled low-profile connector.'
    ],
    specs: {
      chargingSpeed: '25W Qi2 Max Charging (Backward compatible with 15W/10W/7.5W)',
      compatibility: 'Mahindra XUV 3XO (MX1, MX2, MX3, AX5, AX7, AX7L)',
      material: 'Impact-Resistant ABS with Silicone Traction Ring',
      installation: 'Drop-In Precision Fit (Zero Tools Required)',
      warranty: '1 Year Official Replacement Guarantee'
    }
  },
  {
    id: 'swift',
    slug: 'swift',
    name: 'Maruti Suzuki Swift (4th Gen) Wireless Phone Charger | Charging Pad',
    shortName: 'Maruti Suzuki Swift (4th Gen)',
    brand: 'Maruti Suzuki',
    subtitle: 'Maruti Suzuki Swift | Car Wireless Mag-Safe iPhone Charger | Charging Pad',
    price: 2349,
    originalPrice: 3449,
    discountPercentage: '-32%',
    isHot: true,
    years: '2024 - 2025',
    slot: 'Dedicated Wireless Tray',
    badge: 'Latest Gen',
    images: [
      swiftDzireImg,
      centerMountImg,
      leftCarMountImg,
      rightCarMountImg
    ],
    category: 'Car Specific',
    tags: ['Charging Pad', 'Fast Charging', 'Magnetic Charging', 'Magsafe', 'Maruti Suzuki Swift', 'Wireless Phone Charger'],
    description: 'Designed specifically for the 4th Generation Maruti Suzuki Swift cockpit console. Replaces slippery rubber mats with a dedicated MagSafe-compatible 25W magnetic wireless charging pad.',
    features: [
      'Contoured to fit the distinct 2024–2025 Swift cabin layout.',
      'Magnetic lock prevents phone sliding during emergency braking and sharp turns.',
      'Compatible with all MagSafe iPhones and Qi-certified Android phones.',
      'Ultra-compact low profile with zero obstruction to gear throw.',
      'Non-destructive OEM integration with plug-and-play adapter.'
    ],
    specs: {
      chargingSpeed: '25W Qi2 Protocol / 15W Apple MagSafe Fast Charge',
      compatibility: 'Swift 4th Generation (LXi, VXi, ZXi, ZXi+ 2024–2025)',
      material: 'Automotive Heat-Resistant Thermoplastic',
      installation: 'OEM Snap-In Replacement Fit',
      warranty: '1 Year Official Replacement Guarantee'
    }
  },
  {
    id: 'baleno',
    slug: 'baleno',
    name: 'Maruti Suzuki Baleno Wireless Phone Charger | Charging Pad',
    shortName: 'Maruti Suzuki Baleno',
    brand: 'Maruti Suzuki',
    subtitle: 'Maruti Suzuki Baleno | Car Wireless Mag-Safe iPhone Charger | Charging Pad',
    price: 2349,
    originalPrice: 3449,
    discountPercentage: '-32%',
    isHot: false,
    years: '2022 - 2025',
    slot: 'Cup Holder & Storage Cavity',
    badge: 'Direct OEM Fit',
    images: [
      fronxEtcImg,
      centerMountImg,
      leftCarMountImg,
      rightCarMountImg
    ],
    category: 'Car Specific',
    tags: ['Charging Pad', 'Fast Charging', 'Magnetic Charging', 'Magsafe', 'Maruti Suzuki Baleno', 'Wireless Phone Charger'],
    description: 'Precision molded for the Maruti Suzuki Baleno premium hatchback interior. Provides an OEM-grade factory appearance with rapid 25W wireless charging capability.',
    features: [
      'Tailored fitment for Baleno Sigma, Delta, Zeta, and Alpha models.',
      'Magnetic grip locks device firmly in place even on rugged city streets.',
      'Preserves access to dual USB ports and 12V auxiliary power.',
      'Thermally optimized PCB design avoids heat buildup during long drives.',
      'Includes high-current USB-C charging harness.'
    ],
    specs: {
      chargingSpeed: '25W Qi2 Fast Wireless Induction',
      compatibility: 'Baleno 2nd Gen (2022, 2023, 2024, 2025)',
      material: 'Scratch-Proof Matte Automotive Finish',
      installation: 'Direct Tray Insert',
      warranty: '1 Year Official Replacement Guarantee'
    }
  },
  {
    id: 'taisor',
    slug: 'taisor',
    name: 'Toyota Urban Cruiser Taisor Wireless Phone Charger | Charging Pad',
    shortName: 'Toyota Urban Cruiser Taisor',
    brand: 'Toyota',
    subtitle: 'Toyota Urban Cruiser Taisor | Car Wireless Mag-Safe iPhone Charger | Charging Pad',
    price: 2349,
    originalPrice: 3449,
    discountPercentage: '-32%',
    isHot: false,
    years: '2024 - 2025',
    slot: 'Under-Dashboard Console Tray',
    badge: 'New Release',
    images: [
      fronxEtcImg,
      centerMountImg,
      leftCarMountImg,
      rightCarMountImg
    ],
    category: 'Car Specific',
    tags: ['Charging Pad', 'Fast Charging', 'Magnetic Charging', 'Magsafe', 'Toyota Taisor', 'Wireless Phone Charger'],
    description: 'Custom-designed charging pad engineered to drop directly into the Toyota Urban Cruiser Taisor dashboard console. Sleek OEM finish matches Toyota cabin trims.',
    features: [
      '100% custom-fit for Toyota Urban Cruiser Taisor E, S, S+, G, and V variants.',
      'Powerful multi-magnet ring prevents misalignment and charging dropouts.',
      'Operates seamlessly with heavy-duty phone cases up to 4mm thickness.',
      'Low thermal emission design ensures phone battery stays cool.',
      'Plug and play via OEM 12V / USB socket.'
    ],
    specs: {
      chargingSpeed: '25W High-Efficiency Qi2 Induction',
      compatibility: 'Toyota Urban Cruiser Taisor (2024 - 2025)',
      material: 'Automotive Grade PC/ABS Matte Composite',
      installation: 'Zero-Tool Drop-In',
      warranty: '1 Year Official Replacement Guarantee'
    }
  },
  {
    id: 'glanza',
    slug: 'glanza',
    name: 'Toyota Glanza Wireless Phone Charger | Charging Pad',
    shortName: 'Toyota Glanza',
    brand: 'Toyota',
    subtitle: 'Toyota Glanza | Car Wireless Mag-Safe iPhone Charger | Charging Pad',
    price: 2349,
    originalPrice: 3449,
    discountPercentage: '-32%',
    isHot: false,
    years: '2022 - 2025',
    slot: 'Gear Lever Lower Storage',
    badge: 'Direct OEM Fit',
    images: [
      fronxEtcImg,
      centerMountImg,
      leftCarMountImg,
      rightCarMountImg
    ],
    category: 'Car Specific',
    tags: ['Charging Pad', 'Fast Charging', 'Magnetic Charging', 'Magsafe', 'Toyota Glanza', 'Wireless Phone Charger'],
    description: 'Molded specifically for the Toyota Glanza gear lever lower console storage area. Offers instant one-touch magnetic wireless fast charging.',
    features: [
      'Perfect fit for Toyota Glanza E, S, G, and V variants.',
      '25W Qi2 rapid charging for flagship iPhones, Samsungs, and Pixel devices.',
      'High-traction silicone pad dampens road vibrations and noise.',
      'Smart foreign object detection (FOD) prevents heating of coins and keys.',
      'Discrete cable path retains factory clean appearance.'
    ],
    specs: {
      chargingSpeed: '25W Max Power Delivery',
      compatibility: 'Toyota Glanza (2022, 2023, 2024, 2025)',
      material: 'UV-Protected Reinforced Polymer',
      installation: 'Drop-In Factory Tray Placement',
      warranty: '1 Year Official Replacement Guarantee'
    }
  },
  {
    id: 'dzire',
    slug: 'dzire',
    name: 'Maruti Suzuki Swift Dzire Wireless Phone Charger | Charging Pad',
    shortName: 'Maruti Suzuki Swift Dzire',
    brand: 'Maruti Suzuki',
    subtitle: 'Maruti Suzuki Swift Dzire | Car Wireless Mag-Safe iPhone Charger | Charging Pad',
    price: 2349,
    originalPrice: 3449,
    discountPercentage: '-32%',
    isHot: false,
    years: '2020 - 2025',
    slot: 'Center Console Lower Pocket',
    badge: 'Direct OEM Fit',
    images: [
      swiftDzireImg,
      centerMountImg,
      leftCarMountImg,
      rightCarMountImg
    ],
    category: 'Car Specific',
    tags: ['Charging Pad', 'Fast Charging', 'Magnetic Charging', 'Magsafe', 'Swift Dzire', 'Wireless Phone Charger'],
    description: 'Custom fitment for Maruti Suzuki Swift Dzire compact sedan. Transforms unused console storage pocket into a cutting-edge 25W magnetic charging hub.',
    features: [
      'Form-fitted for Dzire (2020–2025, LXi, VXi, ZXi, ZXi+).',
      'Heavy-duty magnetic ring holds phones steady on speed breakers and highways.',
      'High-efficiency coil architecture minimizes power loss and heat generation.',
      'Non-slip textured surface protects phone back glass and camera bumps.',
      'Includes premium braided automotive power cable.'
    ],
    specs: {
      chargingSpeed: '25W Qi2 Peak Output',
      compatibility: 'Swift Dzire (2020 - 2025)',
      material: 'Automotive Fire-Retardant ABS',
      installation: 'Drop-In Console Placement',
      warranty: '1 Year Official Replacement Guarantee'
    }
  },
  {
    id: 'universal',
    slug: 'universal',
    name: 'Universal Automotive Wireless Phone Charger | Charging Pad',
    shortName: 'Universal Automotive Dock',
    brand: 'Universal',
    subtitle: 'Universal Automotive | Car Wireless Mag-Safe iPhone Charger | Charging Pad',
    price: 2098,
    originalPrice: 3299,
    discountPercentage: '-36%',
    isHot: false,
    years: 'All Models & Makes',
    slot: 'Flat Dash & Console Surfaces',
    badge: 'Universal Fit',
    images: [
      universalPadImg,
      centerMountImg,
      leftCarMountImg,
      rightCarMountImg
    ],
    category: 'Car Specific',
    tags: ['Charging Pad', 'Fast Charging', 'Magnetic Charging', 'Magsafe', 'Universal Fit', 'Wireless Phone Charger'],
    description: 'The versatile Qi2 25W magnetic wireless charging pad designed to fit any car dashboard, center armrest, or storage console tray. Comes with non-residue nano-suction base.',
    features: [
      'Universal compatibility with all cars: sedans, SUVs, hatchbacks, trucks, and vans.',
      'Ultra-thin aerodynamic pad with 25W Qi2 rapid magnetic charging.',
      'Nano-adhesive reusable base sticks securely to any flat or gently curved surface.',
      'Foreign object detection with smart LED charging indicator.',
      'Can be transferred between cars or used on home/office desks.'
    ],
    specs: {
      chargingSpeed: '25W Qi2 Super-Fast Wireless',
      compatibility: 'All Vehicles with Flat Console or Dashboard',
      material: 'Aerospace Grade Silicone & Heat-Dissipating Alloy',
      installation: 'Nano-Suction Surface Stick (Residue Free)',
      warranty: '1 Year Official Replacement Guarantee'
    }
  }
];

export function getCarProductBySlug(slug: string): CarProduct | undefined {
  const clean = slug.toLowerCase().trim();
  return CAR_PRODUCTS.find(p => p.slug === clean || p.id === clean);
}

export function getRelatedCarProducts(currentId: string, count: number = 4): CarProduct[] {
  return CAR_PRODUCTS.filter(p => p.id !== currentId).slice(0, count);
}
