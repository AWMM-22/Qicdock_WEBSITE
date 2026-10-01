import ertigaImg from '../assets/images/Ertiga.webp';
import fronxEtcImg from '../assets/images/Fronx, Taisor, Glanza and Baleno.webp';
import swiftDzireImg from '../assets/images/Dzire and Swift.webp';
import threeXoImg from '../assets/images/3XO.webp';
import universalPadImg from '../assets/images/Universal_.webp';
import centerMountImg from '../assets/images/center_mount_1788721138616.webp';
import centerMountTransparentImg from '../assets/images/center-mount-transparent.webp';
import leftCarMountImg from '../assets/images/left_car_mount_1788721155876.webp';
import rightCarMountImg from '../assets/images/right_car_mount_1788721169113.webp';
import wallStandImg from '../assets/images/wall_stand_mount.webp';
import tableStandImg from '../assets/images/table_stand_mount.webp';
import airVentImg from '../assets/images/air_vent_mount.webp';
import headrestMountImg from '../assets/images/headrest_mount.webp';

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
  aboutThisItem?: string[];
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
  },
  {
    id: 'wall-stand',
    slug: 'wall-stand',
    name: 'QicDock Wall Stand with 25W Wireless Charger | Charging Pad + Wall Mount Phone Stand | Magnetic Safe iPhone Charger | Space Saving Charging Dock for Home & Office',
    shortName: 'QicDock Wall Stand 25W',
    brand: 'Universal',
    subtitle: 'Charging Pad + Wall Mount Phone Stand | Magnetic Safe iPhone Charger | Space Saving Charging Dock for Home & Office',
    price: 2098,
    originalPrice: 2298,
    discountPercentage: '-9%',
    isHot: false,
    years: 'Bedside, Office & Home Walls',
    slot: 'Dedicated Wall Mount Setup',
    badge: 'Space Saving',
    images: [
      wallStandImg,
      centerMountImg,
      tableStandImg
    ],
    category: 'Home & Office',
    tags: ['Wall Stand', 'Wireless Charger', 'Charging Pad', 'Wall Mount', 'Magnetic Safe', 'iPhone Charger', 'Space Saving', 'Home & Office'],
    description: 'The QicDock Wall Stand with 25W Wireless Charging Pad creates a dedicated charging spot without taking up valuable desk or table space. The charging pad fits securely into the Wall Stand, giving you a clean setup for your home, office, bedside area, study space or any convenient wall location. Keep your phone in one familiar place instead of leaving it loose around the room.\n\nThe 25W wireless charging pad uses magnetic alignment to help position a compatible phone correctly on the charging surface. The wall-mounted setup keeps the phone visible and easy to access while charging, making it convenient for checking notifications or picking up your phone when needed. The compact design keeps the charging area neat while fitting naturally into your everyday space.',
    aboutThisItem: [
      '**25W Wireless Charging Pad + Wall Stand:** Includes one QicDock 25W wireless charging pad and a Wall Stand for a dedicated wall-mounted charging setup.',
      '**Saves Table & Desk Space:** Moves your charging point onto the wall, helping keep desks, bedside tables and other surfaces clear and organised.',
      '**Easy Phone Access:** Keeps your phone in a fixed, familiar location where it is easy to see, reach and pick up whenever needed.',
      '**Magnetic Alignment:** The charging pad helps position a compatible phone correctly on the charging surface for convenient wireless charging.',
      '**Home & Office Ready:** Suitable for bedrooms, workspaces, study areas, office desks and other indoor spaces where a dedicated charging point is useful.'
    ],
    features: [
      '25W Wireless Charging Pad + Wall Stand: Includes one QicDock 25W wireless charging pad and a Wall Stand for a dedicated wall-mounted charging setup.',
      'Saves Table & Desk Space: Moves your charging point onto the wall, helping keep desks, bedside tables and other surfaces clear and organised.',
      'Easy Phone Access: Keeps your phone in a fixed, familiar location where it is easy to see, reach and pick up whenever needed.',
      'Magnetic Alignment: The charging pad helps position a compatible phone correctly on the charging surface for convenient wireless charging.',
      'Home & Office Ready: Suitable for bedrooms, workspaces, study areas, office desks and other indoor spaces where a dedicated charging point is useful.'
    ],
    specs: {
      chargingSpeed: '25W Qi2 / MagSafe Fast Wireless Charging',
      compatibility: 'All MagSafe iPhones & Qi Wireless Compatible Phones',
      material: 'Heat-Dissipating Matte Polymer & 3M Damage-Free Mounting',
      installation: 'Flush Wall Mount / Adhesive / Screws Included',
      warranty: '1 Year Official Replacement Guarantee'
    }
  },
  {
    id: 'table-stand',
    slug: 'table-stand',
    name: 'QicDock Table Stand with 25W Wireless Charger | Charging Pad + Desktop Phone Stand | Magnetic Safe iPhone Charger | Compact Charging Dock for Home, Office & Bedside',
    shortName: 'QicDock Table Stand 25W',
    brand: 'Universal',
    subtitle: 'Charging Pad + Desktop Phone Stand | Magnetic Safe iPhone Charger | Compact Charging Dock for Home, Office & Bedside',
    price: 2148,
    originalPrice: 2398,
    discountPercentage: '-10%',
    isHot: true,
    years: 'Desks, Workstations & Bedside Tables',
    slot: 'Upright Desktop Stand Setup',
    badge: 'Best Seller',
    images: [
      tableStandImg,
      centerMountImg,
      wallStandImg
    ],
    category: 'Home & Office',
    tags: ['Table Stand', 'Desktop Stand', 'Wireless Charger', 'Charging Pad', 'Magnetic Safe', 'iPhone Charger', 'Bedside Dock'],
    description: 'The QicDock Table Stand with 25W Wireless Charging Pad turns your everyday tabletop into a neat, dedicated charging station. The charging pad fits into the Table Stand, keeping your phone raised instead of lying flat on your desk or bedside table. It is designed for spaces where you regularly use your phone, whether you are working, studying, relaxing or getting ready for the day.\n\nThe 25W wireless charging pad uses magnetic alignment to help position a compatible phone correctly while charging. The upright stand keeps the screen easy to see and the phone within reach, so you can quickly check notifications, view the display or pick up your phone without disturbing the charging setup. Its compact footprint makes it easy to keep beside your laptop, on a work desk or next to your bed.',
    aboutThisItem: [
      '**25W Wireless Charging Pad + Table Stand:** Includes one QicDock 25W wireless charging pad and a Table Stand for an organised tabletop charging setup.',
      '**Upright Phone Position:** Keeps your phone raised and visible while charging, rather than leaving it flat on your desk or bedside table.',
      '**Easy to View & Reach:** Lets you quickly check the screen, notifications or other information while keeping your phone within comfortable reach.',
      '**Compact Desktop Setup:** Designed to occupy minimal tabletop space while giving your phone a dedicated place to charge.',
      '**For Home, Office & Bedside:** Ideal for work desks, study tables, bedside tables and other everyday indoor surfaces.'
    ],
    features: [
      '25W Wireless Charging Pad + Table Stand: Includes one QicDock 25W wireless charging pad and a Table Stand for an organised tabletop charging setup.',
      'Upright Phone Position: Keeps your phone raised and visible while charging, rather than leaving it flat on your desk or bedside table.',
      'Easy to View & Reach: Lets you quickly check the screen, notifications or other information while keeping your phone within comfortable reach.',
      'Compact Desktop Setup: Designed to occupy minimal tabletop space while giving your phone a dedicated place to charge.',
      'For Home, Office & Bedside: Ideal for work desks, study tables, bedside tables and other everyday indoor surfaces.'
    ],
    specs: {
      chargingSpeed: '25W Qi2 Peak Output (Supports Apple StandBy Mode)',
      compatibility: 'All MagSafe iPhones & Qi-Enabled Android Devices',
      material: 'Weighted CNC Aluminum Alloy & Anti-Slip Base',
      installation: 'Desktop Stand-Alone Base (Zero Assembly)',
      warranty: '1 Year Official Replacement Guarantee'
    }
  },
  {
    id: 'air-vent-stand',
    slug: 'air-vent-stand',
    name: 'QicDock Air Vent Stand with 25W Wireless Charger | Charging Pad + Car Vent Phone Mount | Magnetic Safe iPhone Charger | Wireless Charging Dock for Car Navigation',
    shortName: 'QicDock Air Vent Stand 25W',
    brand: 'Universal',
    subtitle: 'Charging Pad + Car Vent Phone Mount | Magnetic Safe iPhone Charger | Wireless Charging Dock for Car Navigation',
    price: 2098,
    originalPrice: 2298,
    discountPercentage: '-9%',
    isHot: true,
    years: 'Horizontal & Vertical Car AC Vents',
    slot: 'Air Vent Louver Mount',
    badge: 'Navigation Ready',
    images: [
      airVentImg,
      centerMountImg,
      headrestMountImg
    ],
    category: 'Car Specific',
    tags: ['Air Vent Stand', 'Car Vent Mount', 'Wireless Charger', 'Charging Pad', 'Magnetic Safe', 'Navigation Dock', 'Car Mount'],
    description: 'The QicDock Air Vent Stand with 25W Wireless Charging Pad brings charging and phone positioning together in one compact car setup. The charging pad fits into the Air Vent Stand, keeping your phone within convenient view while driving without leaving it loose on the dashboard, seat or centre console. It is designed for everyday driving, navigation and journeys where having your phone accessible matters.\n\nThe 25W wireless charging pad uses magnetic alignment to help keep a compatible phone correctly positioned on the charging surface. The Air Vent Stand places the phone at a practical viewing position, making navigation easier to follow while helping keep the front of the car more organised. The magnetic connection helps maintain alignment during normal driving movement, including everyday road vibrations and bumps.',
    aboutThisItem: [
      '**25W Wireless Charging Pad + Air Vent Stand:** Includes one QicDock 25W wireless charging pad and an Air Vent Stand for a compact in-car charging setup.',
      '**Made for Navigation:** Positions your phone within convenient view, making it easier to follow maps and navigation while driving.',
      '**Magnetic Phone Alignment:** Helps keep a compatible phone centred on the charging pad for convenient wireless charging during the journey.',
      '**Keeps the Dashboard Clear:** Combines phone mounting and charging in one setup, reducing loose cables and keeping the phone off the dashboard and seats.',
      '**Secure Everyday Car Use:** Designed to keep the phone positioned on the stand during normal driving movement, including everyday road vibrations and bumps.'
    ],
    features: [
      '25W Wireless Charging Pad + Air Vent Stand: Includes one QicDock 25W wireless charging pad and an Air Vent Stand for a compact in-car charging setup.',
      'Made for Navigation: Positions your phone within convenient view, making it easier to follow maps and navigation while driving.',
      'Magnetic Phone Alignment: Helps keep a compatible phone centred on the charging pad for convenient wireless charging during the journey.',
      'Keeps the Dashboard Clear: Combines phone mounting and charging in one setup, reducing loose cables and keeping the phone off the dashboard and seats.',
      'Secure Everyday Car Use: Designed to keep the phone positioned on the stand during normal driving movement, including everyday road vibrations and bumps.'
    ],
    specs: {
      chargingSpeed: '25W Qi2 Rapid Induction Fast Charge',
      compatibility: 'Universal Air Vents (Horizontal, Vertical, Slanted)',
      material: 'Reinforced Steel Vent Clamp & Heat-Dissipating Core',
      installation: '360° Rotatable Vent Blade Clamp (No Tools)',
      warranty: '1 Year Official Replacement Guarantee'
    }
  },
  {
    id: 'rear-passenger-stand',
    slug: 'rear-passenger-stand',
    name: 'QicDock Rear Passenger Seat Stand with 25W Wireless Charger | Charging Pad + Back Seat Phone Mount | Magnetic Safe iPhone Charger | Car Charging Dock for Rear Passengers',
    shortName: 'QicDock Rear Seat Stand 25W',
    brand: 'Universal',
    subtitle: 'Charging Pad + Back Seat Phone Mount | Magnetic Safe iPhone Charger | Car Charging Dock for Rear Passengers',
    price: 2148,
    originalPrice: 2398,
    discountPercentage: '-10%',
    isHot: false,
    years: 'All Vehicle Headrest Rods',
    slot: 'Rear Headrest Post Mount',
    badge: 'Passenger Comfort',
    images: [
      headrestMountImg,
      centerMountImg,
      airVentImg
    ],
    category: 'Car Specific',
    tags: ['Rear Passenger Stand', 'Back Seat Phone Mount', 'Wireless Charger', 'Charging Pad', 'Magnetic Safe', 'Headrest Dock', 'Road Trip'],
    description: 'The QicDock Rear Passenger Seat Stand with 25W Wireless Charging Pad gives passengers in the back seat a dedicated place to keep and charge their phone during the journey. The charging pad fits into the Rear Passenger Seat Stand, keeping the phone off the seat and within easy reach. It is useful for everyday family drives, long journeys and road trips where rear passengers need convenient access to their phones.\n\nThe 25W wireless charging pad uses magnetic alignment to help position a compatible phone correctly on the charging surface. The stand keeps the phone raised and accessible, making it easier for passengers to check notifications, view content or pick up the phone without constantly holding it. It also gives the back seat a more organised setup by creating a specific place for the phone while travelling.',
    aboutThisItem: [
      '**25W Wireless Charging Pad + Rear Passenger Stand:** Includes one QicDock 25W wireless charging pad and a Rear Passenger Seat Stand for convenient back-seat charging.',
      '**Made for Rear Passengers:** Gives passengers in the back seat their own dedicated place to keep and charge their phone during the journey.',
      '**Easy Viewing & Access:** Keeps the phone raised and within reach, making it convenient to check the screen or pick it up when needed.',
      '**Keeps the Seat Organised:** Provides a dedicated spot for the phone instead of leaving it loose on the seat, in a pocket or between passengers.',
      '**Ideal for Daily Drives & Road Trips:** A practical setup for family journeys, long drives and everyday travel where rear passengers need convenient phone access.'
    ],
    features: [
      '25W Wireless Charging Pad + Rear Passenger Stand: Includes one QicDock 25W wireless charging pad and a Rear Passenger Seat Stand for convenient back-seat charging.',
      'Made for Rear Passengers: Gives passengers in the back seat their own dedicated place to keep and charge their phone during the journey.',
      'Easy Viewing & Access: Keeps the phone raised and within reach, making it convenient to check the screen or pick it up when needed.',
      'Keeps the Seat Organised: Provides a dedicated spot for the phone instead of leaving it loose on the seat, in a pocket or between passengers.',
      'Ideal for Daily Drives & Road Trips: A practical setup for family journeys, long drives and everyday travel where rear passengers need convenient phone access.'
    ],
    specs: {
      chargingSpeed: '25W Qi2 Wireless Output (Quick Backseat Charge)',
      compatibility: 'All Vehicles with Standard Headrest Posts',
      material: 'Heavy-Duty Shock-Absorbing Steel Bracket & Polymer',
      installation: 'Dual-Post Snap-Lock Clamp',
      warranty: '1 Year Official Replacement Guarantee'
    }
  }
];

export function getCarProductBySlug(slug: string): CarProduct | undefined {
  const clean = slug.toLowerCase().trim();
  const aliasMap: Record<string, string> = {
    'wall-charger': 'wall-stand',
    'wall': 'wall-stand',
    'desk-stand': 'table-stand',
    'table': 'table-stand',
    'car-vent': 'air-vent-stand',
    'vent': 'air-vent-stand',
    'car-rear': 'rear-passenger-stand',
    'rear': 'rear-passenger-stand',
    'headrest': 'rear-passenger-stand',
    'car-pad': 'universal'
  };
  const target = aliasMap[clean] || clean;
  return CAR_PRODUCTS.find(p => p.slug === target || p.id === target || p.slug === clean || p.id === clean);
}

export function getRelatedCarProducts(currentId: string, count: number = 4): CarProduct[] {
  return CAR_PRODUCTS.filter(p => p.id !== currentId).slice(0, count);
}
