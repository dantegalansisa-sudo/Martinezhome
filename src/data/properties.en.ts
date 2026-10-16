import type { Property } from './properties';

/** English copy for each listing, keyed by slug. Only text fields; prices, coordinates and images come from properties.ts. */
export type ListingCopy = Partial<Pick<Property, 'title' | 'summary' | 'description' | 'highlights' | 'sections' | 'units' | 'payment' | 'tags' | 'zone' | 'area' | 'baths' | 'parking' | 'beds' | 'delivery'>>;

export const LISTINGS_EN: Record<string, ListingCopy> = {
  'casa-duplex-prado-oriental': {
    title: 'Exclusive duplex home in Prado Oriental',
    summary: 'Duplex with a 41 m² backyard, an 87.50 m² rooftop ready for a terrace and a carport for 4 vehicles.',
    description:
      'A home designed for family living: generous social areas on the first floor, three bedrooms upstairs and an 87.50 m² rooftop ready to become your terrace. Premium finishes, plus pre-installation for a pool, jacuzzi and solar water heater.',
    highlights: ['~41 m² backyard', '87.50 m² rooftop terrace', 'Carport for 4 vehicles', 'Pre-installation for a pool'],
    sections: [
      { title: 'First floor', items: ['Living and dining room', 'Kitchen with breakfast bar', 'Guest half bath', 'Maid\'s room with bathroom', 'Laundry area', 'Carport for 4 vehicles', 'Spacious backyard'] },
      { title: 'Second floor', items: ['3 bedrooms', 'Primary suite with private bath, walk-in closet and backyard view', 'Family room', '1 shared bathroom', 'Balcony in one of the bedrooms'] },
      { title: 'Amenities and extras', items: ['Motorized gate', 'Cistern and well', 'Pre-installation for a pool', 'Pre-installation for a rooftop jacuzzi', 'Pre-installation for a solar water heater', 'Pre-installation for air conditioning', 'Utility room', 'Rooftop terrace access'] },
      { title: 'Finishes', items: ['Imported porcelain tile floors', 'Modular kitchen with granite countertop', 'Hardwood front door', 'High-quality ceramic tile in bathrooms'] },
    ],
    tags: ['Duplex'],
  },
  'residencial-gaia-3-prado-oriental': {
    title: 'Residencial Gaia 3 — Apartments and Penthouse',
    summary: 'Spacious units with terraces of up to 60 m² and 2 parking spaces at Residencial Gaia 3.',
    description:
      'Generous spaces, a terrace and an excellent layout in one of the most sought-after residential areas of Santo Domingo Este. Choose between the first-floor unit with a large terrace or the penthouse.',
    highlights: ['Terraces of up to 60.78 m²', '2.5 bathrooms', '2 parking spaces per unit', 'Penthouse option'],
    sections: [{ title: 'Includes', items: ['2.5 bathrooms', '2 parking spaces', 'Terrace / balcony', 'Excellent layout'] }],
    units: [
      { name: 'First floor', area: '197.67 m² total', detail: '136.89 m² of interior space + 60.78 m² of terrace/balcony', price: { amount: 164268, currency: 'USD' } },
      { name: 'Penthouse', area: '250.86 m² total', detail: '199.86 m² of interior space + 51 m² of terrace', price: { amount: 255132, currency: 'USD' } },
    ],
    tags: ['Penthouse available'],
  },
  'villa-amueblada-punta-cana': {
    title: 'Furnished villa in Brisa Punta Cana',
    summary: 'Pool, jacuzzi and BBQ area, just 5 minutes from Coco Bongo and Downtown Center.',
    description:
      'Comfort, privacy and a prime location in Punta Cana. A fully furnished villa, ideal as a home, a vacation getaway or a short-term rental investment.',
    highlights: ['Fully furnished', 'Pool + jacuzzi', 'BBQ area', '5 min from Downtown Center'],
    sections: [{ title: 'Features', items: ['3 bedrooms', '3 bathrooms', 'Pool and jacuzzi', 'BBQ area', '250 m² lot', 'Fully furnished'] }],
    tags: ['Furnished', 'Pool'],
  },
  'torre-apartamentos-prado-oriental': {
    title: 'Apartment tower with appliances included',
    summary: 'Modern development with pool, elevator, full backup generator and 24/7 security. Appliances included.',
    description:
      'Invest in a modern development designed for comfort, security and excellent finishes. Your apartment comes with appliances included and a structured payment plan to secure your unit today.',
    highlights: ['Appliances included', 'Pool and social area', 'Full backup generator', '24/7 security'],
    sections: [{ title: 'Project features', items: ['3-bedroom apartments', 'Appliances included', 'Pool and social area', 'Elevator', 'Full backup generator', 'Covered parking', '24/7 security', 'Modern finishes'] }],
    payment: [
      { label: 'Hold deposit', value: 'US$2,000' },
      { label: 'Reservation', value: 'US$8,000' },
      { label: 'Balance of down payment', value: '30%' },
      { label: 'Remaining balance', value: 'Financing through the bank of your choice' },
    ],
    tags: ['Elevator'],
    parking: 'Covered',
    delivery: 'July 2027',
  },
  'apartamentos-autopista-san-isidro': {
    title: '3-bedroom apartments on Autopista de San Isidro',
    summary: 'Spacious layouts, reliable water supply and additional terraces from 32 m².',
    description:
      'Live in a strategic area of Santo Domingo Este with direct access to Autopista de San Isidro. Spacious apartments with excellent finishes and the option of additional terraces.',
    highlights: ['Terraces from 32 m²', 'Reliable water supply', 'Security intercom', 'Covered parking'],
    sections: [{ title: 'Features', items: ['From 115 m² of interior space', '3 bedrooms', 'Primary with private bathroom', 'Living and dining room', '1 covered parking space', 'Premium finishes', 'Reliable water supply', 'Security intercom', 'Additional terraces from 32 m²'] }],
    tags: [],
    area: 'From 115 m²',
  },
  'casas-brisa-oriental': {
    title: 'Brand-new homes in Brisa Oriental',
    summary: 'Every bedroom with its own bath, kitchen with island, family room and a spacious terrace.',
    description:
      'Move into the brand-new home your family deserves! Modern design, a kitchen with island, family room and pre-installation for a jacuzzi, inverter, cameras and an electric gate.',
    highlights: ['3 bedrooms with en-suite baths', 'Modern kitchen with island', 'Family room', '2 covered parking spaces'],
    sections: [
      { title: 'Layout', items: ['201 m² of interior space', '3 bedrooms, each with its own bathroom', 'Primary with walk-in closet', 'Living room, dining room and family room', 'Modern kitchen with island', 'Spacious terrace', '2 covered parking spaces', 'Maid\'s room with bathroom'] },
      { title: 'Pre-installations', items: ['Jacuzzi', 'Kitchenette', 'Air conditioning', 'Inverter', 'Cameras', 'Electric gate'] },
    ],
    units: [
      { name: 'Interior home', price: { amount: 204000, currency: 'USD' } },
      { name: 'Corner home', price: { amount: 209000, currency: 'USD' } },
    ],
    tags: ['Brand new'],
  },
  'residencial-dn-honduras': {
    title: 'Residencial DN in the Honduras neighborhood',
    summary: 'Strategic location with immediate access to Av. Independencia, Churchill and the Malecón.',
    description:
      'Live or invest in one of the fastest-growing areas of the Distrito Nacional. A development designed for comfort, functionality and quality of life, just minutes from universities, hospitals and shopping centers.',
    highlights: ['High-growth area', 'Near the Malecón', 'Ideal for investment', 'Access to main roads'],
    sections: [
      { title: 'Immediate access to', items: ['Av. Independencia', 'Av. Winston Churchill', 'Av. Italia', 'Av. George Washington (Malecón)'] },
      { title: 'Minutes from', items: ['Universities', 'Hospitals', 'Supermarkets', 'Shopping centers', 'Restaurants', 'Recreational areas'] },
    ],
    tags: ['Distrito Nacional'],
  },
  'apartamentos-mirador-del-este': {
    title: 'Apartments and penthouses in Mirador del Este',
    summary: 'Two-level penthouses with private terrace and jacuzzi. Several units already sold.',
    description:
      'Exclusive apartments with premium finishes, generous spaces and an excellent layout for the whole family. Two-level penthouses with a private terrace, jacuzzi and lounge are also available.',
    highlights: ['Two-level penthouses', 'Private terrace with jacuzzi', 'Maid\'s room', 'Parking for 2 vehicles'],
    sections: [
      { title: 'Features', items: ['3 bedrooms', 'Up to 3½ bathrooms', 'Living and dining room', 'Modern kitchen', 'Laundry area', 'Maid\'s room', 'Balcony (subject to availability)', 'Parking for 2 vehicles'] },
      { title: 'Also available', items: ['Two-level penthouses with private terrace, jacuzzi and lounge', 'Apartments with spacious terraces'] },
    ],
    tags: ['Last units'],
    baths: 'Up to 3.5',
  },
  'ultimas-unidades-prado-oriental': {
    title: 'Apartment and penthouse — last units',
    summary: 'Quiet residential area with easy access to Autopista San Isidro and Av. Ecológica.',
    description:
      'Spacious, modern apartments in one of the best areas of Santo Domingo Este, with strong appreciation and close to supermarkets, schools, pharmacies and shopping plazas.',
    highlights: ['Penthouse with private terrace', 'Strong appreciation', 'Quiet, safe area', 'Excellent layout'],
    sections: [{ title: 'Benefits', items: ['Spacious interiors', 'Excellent layout', 'Quiet, safe residential area', 'Strong appreciation', 'Easy access to Autopista San Isidro, Av. Ecológica and main roads', 'Close to supermarkets, schools, pharmacies and shopping plazas'] }],
    units: [
      { name: '3rd-floor apartment', area: '141 m²', price: { amount: 136000, currency: 'USD' } },
      { name: 'Exclusive penthouse', area: '237 m²', detail: 'Spacious private terrace', price: { amount: 185250, currency: 'USD' } },
    ],
    tags: ['Last units'],
  },
  'apartamentos-nuevo-amanecer': {
    title: 'Move-in-ready apartments in Nuevo Amanecer',
    summary: 'Between Autopista San Isidro and Av. Ecológica. Ready for delivery.',
    description:
      'Live or invest in one of the fastest-growing areas of Santo Domingo Este. Second-floor unit with a 65 m² terrace, premium finishes and two parking spaces.',
    highlights: ['65 m² terrace', 'Ready for delivery', 'Walk-in closet', 'Granite countertop'],
    sections: [
      { title: 'Features', items: ['3 bedrooms', 'Primary with bathroom and walk-in closet', 'Maid\'s room with bathroom', 'Open living and dining room', 'Modern kitchen with breakfast bar and granite countertop', 'Laundry area', 'Covered parking', 'Electric gate', 'Central gas', 'Pre-installation for air conditioning'] },
      { title: 'Finishes', items: ['Porcelain tile floors', 'Hardwood', 'Plaster crown molding'] },
    ],
    tags: [],
    area: '116 m² + 65 m² terrace',
  },
  'casa-moderna-terraza-bbq': {
    title: 'Modern home with terrace, pergola and BBQ',
    summary: 'Kitchen with island, large backyard with garden and an optional pool and jacuzzi.',
    description:
      'The ideal home for family living with comfort, privacy and style: a kitchen with island, a primary suite with dressing room and two balconies, and a terrace with pergola, bathroom and BBQ area.',
    highlights: ['Optional pool and jacuzzi', 'Terrace with pergola and BBQ', 'Primary suite with 2 balconies', 'Backyard with garden'],
    sections: [{ title: 'Features', items: ['Kitchen with island', '3 bedrooms', 'Primary with dressing room and 2 balconies', 'Maid\'s room with bathroom', 'Large backyard with garden', 'Optional pool and jacuzzi', 'Terrace with pergola, bathroom and BBQ area', '2 parking spaces'] }],
    tags: ['Optional pool'],
  },
  'casa-con-piscina-ciudad-jardin': {
    title: 'Modern home with pool in Ciudad Jardín',
    summary: 'Private pool, A/C included and a gated community with clubhouse, 7 min from the airport.',
    description:
      'A spacious, modern home in pre-construction within a gated community featuring 24/7 security, a clubhouse with pool, a restaurant and even a natural cave. Just 7 minutes from Las Américas International Airport.',
    highlights: ['Private pool', 'Air conditioning included', 'Clubhouse with pool', '24/7 security'],
    sections: [
      { title: 'The home', items: ['4 bedrooms', '4 bathrooms + guest bath', 'Private pool', 'Show kitchen and working kitchen', 'Family room', 'Maid\'s room', 'Open-air terrace', 'Double carport'] },
      { title: 'Includes', items: ['Air conditioning in all 4 bedrooms', 'Stove', 'Electric gate', 'Electric fence'] },
      { title: 'Community amenities', items: ['24/7 security', 'Access control', 'Clubhouse with pool', 'Restaurant', 'Motorized patrols', 'Natural cave'] },
      { title: 'Location', items: ['7 minutes from Las Américas Airport', 'Close to supermarkets, shops and services', 'Easy access to San Isidro, Av. Ecológica and Las Américas'] },
    ],
    tags: ['Pool', 'High demand'],
  },
  'proyecto-cerrado-prado-oriental': {
    title: 'Apartments in a gated development',
    summary: 'Fully air-conditioned units, wood-style terraces and penthouse-style options.',
    description:
      'Apartments in one of the fastest-growing, highest-appreciation areas of Santo Domingo Este. A gated development with covered parking, fully air-conditioned units and private terraces.',
    highlights: ['Gated development', 'Fully air-conditioned', 'Pre-installation for jacuzzi', 'North, south and west views'],
    sections: [
      { title: 'The development', items: ['Gated development', 'Covered parking', '2- and 3-bedroom apartments', 'Penthouse-style options with private terrace', 'Second-floor units with spacious private terrace'] },
      { title: 'Standout options', items: ['Fully air-conditioned apartments', 'Spacious wood-style terraces', 'Pre-installation for jacuzzi', 'North, south and west views', 'Up to 3.5 bathrooms', '2 parking spaces per unit'] },
    ],
    tags: ['High appreciation'],
    baths: 'Up to 3.5',
  },
  'villa-vista-cana-punta-cana': {
    title: 'Modern villa in Vista Cana',
    summary: 'Villa with pool and jacuzzi in one of the most exclusive communities in Punta Cana.',
    description:
      'Live in a modern villa made for family life, with comfortable, functional spaces. Perfect for those seeking comfort, privacy and a peaceful Caribbean lifestyle.',
    highlights: ['Exclusive community', 'Terrace with jacuzzi', 'Walk-in closet', 'Parking for 2'],
    sections: [
      { title: 'First floor', items: ['Parking for 2 vehicles', 'Spacious living room', 'Dining room', 'Kitchen', 'Guest half bath', 'Terrace', 'Jacuzzi'] },
      { title: 'Second floor', items: ['Primary bedroom with bathroom and walk-in closet', '2 secondary bedrooms', 'Shared bathroom'] },
    ],
    tags: ['Pool'],
  },
  'apartamentos-bani': {
    title: 'Exclusive 6-apartment development in Baní',
    summary: 'Only 2 apartments per floor and a social area with a 110 m² terrace.',
    description:
      'An intimate, modern residence with only six apartments, separate living and dining rooms, a modular kitchen and premium finishes. Ideal to live in or invest.',
    highlights: ['Only 6 apartments', '110 m² social area', 'Premium finishes', 'Security'],
    sections: [{ title: 'Features', items: ['3 bedrooms', '2 bathrooms', 'Separate living and dining rooms', 'Modular kitchen', '1–2 parking spaces', 'Balcony / terrace (3rd floor)', 'Social area with terrace (110 m²)', 'Premium finishes + security'] }],
    tags: ['Only 6 units'],
    delivery: 'November 2026',
  },
  'casa-de-lujo-avenida-ecologica': {
    title: 'Luxury home with pool and waterfall',
    summary: 'Lower level with pool and waterfall, show and working kitchens, and Brazilian oak doors.',
    description:
      'A home designed to deliver comfort, elegance and every detail your family deserves. A sensor-lit staircase, indoor dry garden, office area and a lower-level entertainment area with a waterfall pool. Ready for immediate move-in.',
    highlights: ['Pool with waterfall', 'Smart lock', 'Brazilian oak doors', 'Immediate delivery'],
    sections: [
      { title: 'First floor', items: ['Spacious living and dining room', 'Guest half bath', 'Foyer', 'Equipped working kitchen', 'Fully equipped show kitchen', 'Kitchen island', 'Laundry area', 'Double carport', 'Cistern, water tank and submersible well', 'Conduit for security cameras'] },
      { title: 'Lower level', items: ['Bedroom with bathroom and closet', 'Half bath for the pool area', 'Pool with waterfall', 'Covered and open-air social area', 'Functional storage room'] },
      { title: 'Second floor', items: ['2 bedrooms with bathroom and walk-in closet (one with balcony)', 'Primary with cedar-lined walk-in closet + bathroom', 'Office area', 'Sensor-lit staircase', 'Indoor dry garden', 'Linen closet'] },
      { title: 'Details', items: ['Brazilian oak doors', 'Front door with smart lock'] },
    ],
    tags: ['Pool', 'Luxury'],
  },
  'residencial-avenida-ecologica': {
    title: 'Home with 75 m² terrace and BBQ',
    summary: 'High-gloss kitchen with quartz countertop and pre-wiring for an electric vehicle charger.',
    description:
      'Live with style, space and elegance in a home designed for your whole family\'s comfort: 233.37 m² of interior space plus a 75 m² covered terrace with BBQ.',
    highlights: ['75 m² covered terrace', 'Quartz countertop', 'Electric vehicle charger', 'Payment plan'],
    sections: [
      { title: 'Layout', items: ['3 bedrooms', 'Primary with bathroom and walk-in closet', '2.5 bathrooms', 'Open living and dining room', '233.37 m² of interior space', '185 m² lot', '75 m² covered terrace'] },
      { title: 'Finishes', items: ['Imported porcelain and ceramic tile', 'Modern structural design', 'Decorative fascia in living, dining and family rooms', 'Imported oak front door', 'Plaster ceilings', 'High-gloss melamine kitchen with quartz countertop'] },
      { title: 'Pre-installations', items: ['Inverter', 'Air conditioning', 'Electric gate motors', 'Electric vehicle charger', 'Cistern'] },
      { title: 'Terrace', items: ['BBQ with cabinet and granite countertop', 'Half bath in social area'] },
    ],
    payment: [
      { label: 'Reservation', value: 'US$2,000' },
      { label: 'Contract signing', value: 'Within 15 days' },
      { label: '10% down payment', value: 'At signing' },
      { label: '20% down payment', value: 'In monthly or bimonthly installments' },
      { label: 'Remaining 70%', value: 'Upon delivery (financing available)' },
    ],
    tags: [],
  },
  'residencia-brisa-oriental': {
    title: 'Spacious residence in Brisa Oriental',
    summary: 'Three levels with a self-contained lower level, gallery, terrace and 3 en-suite bedrooms.',
    description:
      'An ideal property for families seeking space, comfort and room to enjoy every moment. The lower level works as a self-contained unit with its own living room, kitchen and three bedrooms.',
    highlights: ['Self-contained lower level', 'Primary with balcony', 'Gallery and backyard', 'Double carport'],
    sections: [
      { title: 'Lower level', items: ['3 bedrooms', '1 bathroom', 'Living room', 'Kitchen', 'Dining room', 'Storage room'] },
      { title: 'First floor', items: ['Living room and foyer', 'Dining room', 'Kitchen', 'Guest bathroom', 'Maid\'s room with bathroom', 'Backyard and gallery', 'Double carport', 'Laundry area'] },
      { title: 'Second floor', items: ['Family room and den', 'Terrace', '3 bedrooms, each with its own bathroom', 'Primary bedroom with balcony'] },
    ],
    tags: ['Great for families'],
  },
  'apartamentos-ensanche-isabelita': {
    title: 'Modern apartments in Ensanche Isabelita',
    summary: '2- and 3-bedroom floor plans with walk-in closet, 24/7 security and a 1-year builder warranty.',
    description:
      'Modern, functional apartments designed for comfort, security and excellent finishes. Built with a reinforced-concrete structure to ASTM standards and finished to American standards.',
    highlights: ['1-year builder warranty', '24/7 security', 'Inverter for common areas', 'Spanish porcelain bathrooms'],
    sections: [
      { title: 'Typical floor plan', items: ['2 and 3 bedrooms', 'Living / dining room', 'Modular kitchen with breakfast bar', 'Primary bedroom with walk-in closet + bathroom', 'Additional parking space(s) available — conditions apply'] },
      { title: 'Finishes', items: ['Reinforced-concrete structure (ASTM standards)', 'Porcelain tile floors', 'Spanish porcelain bathrooms', 'Oak veneer doors', 'Pressed oak front door', 'One-piece bathroom fixtures', 'American standards throughout'] },
      { title: 'Project amenities', items: ['Cistern', 'Well', 'Pre-installation for water tanks', 'Clothesline area', 'Inverter for common areas', 'Electric gate', '24/7 security', '1-year builder warranty'] },
    ],
    tags: ['1-year warranty'],
  },
  'penthouse-alquiler-avenida-espana': {
    title: 'Penthouse for rent with private terrace',
    summary: 'Spacious 256 m² penthouse with a covered private terrace, terrace bathroom and 2 covered parking spaces.',
    description:
      'A spacious, comfortable home, ideal for those who want to enjoy a private terrace and a great location near Avenida España, with open city views.',
    highlights: ['256 m²', 'Covered private terrace', 'Terrace bathroom', '2 covered parking spaces'],
    sections: [
      { title: 'Layout', items: ['3 bedrooms', 'Living and dining room', 'Kitchen', 'Laundry area', 'Maid\'s room'] },
      { title: 'Extras', items: ['Covered private terrace', 'Bathroom in the terrace area', '2 covered parking spaces'] },
    ],
    tags: ['Private terrace'],
    zone: 'Near Av. España',
  },
  'apartamento-amueblado-vista-al-mar': {
    title: 'Furnished apartment with ocean view',
    summary: 'Fully furnished, with an ocean-view balcony, pool, elevator and 24-hour security. Ready to move in.',
    description:
      'Enjoy comfort, security and a beautiful ocean view in a fully furnished, move-in-ready apartment, with easy access to Autopista San Isidro and just minutes from shopping plazas, supermarkets and services.',
    highlights: ['Fully furnished', 'Ocean-view balcony', 'Rooftop pool', '24-hour security'],
    sections: [
      { title: 'The apartment', items: ['3 bedrooms', '2 bedrooms with air conditioning', 'Living and dining room', 'Kitchen', 'Ocean-view balcony', 'Fully furnished'] },
      { title: 'The building', items: ['Elevator', 'Air-conditioned lobby', '24-hour security', 'Plunge pool', 'Social area', 'Parking'] },
    ],
    tags: ['Furnished', 'Ocean view'],
    parking: 'Yes',
  },
  'casa-gurabo-santiago': {
    title: 'Elegant home in Gurabo, Santiago',
    summary: 'Gated community with 24/7 security: 4 en-suite bedrooms, show kitchen with island and a 100 m² backyard.',
    description:
      'Located in Urbanización Don Fernando, a gated community with controlled access and 24/7 security. An elegant home with a family room, show kitchen with island and working kitchen, a terrace that opens onto a 100 m² backyard, and premium finishes.',
    highlights: ['In the finishing stage', '100 m² backyard', 'Kitchen with island and quartz countertop', 'Carport for 4 vehicles'],
    sections: [
      { title: 'First floor', items: ['Foyer and living room', 'Spacious dining room', 'Bedroom with closet and bathroom', 'Show kitchen with island', 'Working kitchen', 'Laundry area', 'Terrace with direct backyard access', 'Guest bathroom'] },
      { title: 'Second floor', items: ['Family room', 'Linen closet', 'Primary with walk-in closet, bathroom and balcony', '2 bedrooms with walk-in closet and bathroom'] },
      { title: 'Equipment and finishes', items: ['Built-in cooktop, range hood and gas oven', 'Quartz countertops', 'P92 windows', 'Camera and alarm system', 'Electric water heater', '4,000-gallon cistern'] },
    ],
    tags: ['Gated community'],
  },
  'viviendas-exclusivas-prado-oriental': {
    title: 'Exclusive project of only 4 homes',
    summary: '47.56 m² private rooftop terrace with pre-installation for a gas BBQ and a jacuzzi.',
    description:
      'Live the way you always dreamed in a modern project of only four homes. Premium finishes, plaster ceilings, crown moldings and a spectacular private rooftop terrace to enjoy with your family.',
    highlights: ['Only 4 units', '47.56 m² rooftop terrace', 'Premium finishes', 'Flexible payment plan'],
    sections: [
      { title: 'Layout', items: ['3 spacious bedrooms', 'Primary bedroom with walk-in closet and private bath', 'Living room, dining room and family room', 'Modern kitchen', 'Laundry area', '3.5 bathrooms', "Maid's room with bathroom", 'EV charging outlet'] },
      { title: 'Areas', items: ['252.56 m² in total', '205.97 m² built', '47.56 m² terrace', '8 m² patio', '110 m² lot'] },
      { title: 'Premium finishes', items: ['Imported porcelain and ceramic tile', 'Modern façade', 'Crown moldings and plaster ceilings', 'Decorative fascia in living, dining and family room', 'Independent cistern and water pump'] },
      { title: 'Rooftop terrace', items: ['Pre-installation for a gas BBQ', 'Space for a jacuzzi', '1 bathroom', 'Porcelain tile finish'] },
      { title: 'Pre-installations', items: ['Air conditioning', 'Power inverter', 'Security cameras', 'Gas', 'Water heater'] },
    ],
    payment: [
      { label: 'Reservation', value: 'US$3,000' },
      { label: 'Contract signing', value: 'Within 15 days' },
      { label: '10% down payment', value: 'At contract signing' },
      { label: '20% down payment', value: 'Monthly or bimonthly installments' },
      { label: 'Remaining 70%', value: 'On delivery (bank financing or direct payment)' },
    ],
    tags: ['Only 4 units'],
  },
  'penthouse-avenida-ecologica': {
    title: 'Penthouse with jacuzzi on Av. Ecológica',
    area: '174 m² + 19 m² terrace',
    summary: 'Ready to move in: 3 bedrooms with en-suite baths, jacuzzi included, private terrace and a social area with plunge pool and BBQ.',
    description:
      'A move-in-ready penthouse on Avenida Ecológica, with 174 m² of built area and a 19 m² private terrace. Three bedrooms, each with its own bathroom, a family room, a jacuzzi included and a rooftop social area with a plunge pool, BBQ and terrace.',
    highlights: ['Ready to move in', 'Jacuzzi included', '19 m² private terrace', '2 covered parking spaces'],
    sections: [
      { title: 'Layout', items: ['3 bedrooms, each with its own bathroom', 'Family room', 'Living and dining room', 'Modular kitchen', "Maid's room", 'Laundry area', 'Jacuzzi included'] },
      { title: 'Amenities', items: ['Social area with plunge pool', 'BBQ area', 'Rooftop terrace', 'Access control', 'Security cameras', '2 covered parking spaces'] },
    ],
    payment: [
      { label: 'Reservation', value: 'US$2,000' },
      { label: 'Down payment', value: '20%' },
      { label: 'Remaining balance', value: 'On delivery (bank financing or direct payment)' },
    ],
    tags: ['Jacuzzi included'],
  },
  'villas-brisas-punta-cana': {
    title: 'Villas Brisas de Punta Cana',
    delivery: 'in 23 months',
    summary: 'A resort-style project of 13 two-story villas with a private club and pool, near Downtown Punta Cana.',
    description:
      'An exclusive resort-style project of 13 detached two-story villas in Brisas de Punta Cana, Calle del Sol, close to Downtown Punta Cana, shopping centers, restaurants and entertainment. Comfort, privacy and an excellent investment opportunity.',
    highlights: ['Only 13 villas', 'Private club with pool', '40 m² private patio', 'Optional jacuzzi'],
    sections: [
      { title: 'The villas', items: ['3 spacious bedrooms', '2.5 bathrooms', 'Living room, dining room and breakfast nook', 'Modern kitchen', 'Laundry area', '40 m² private patio', '2 parking spaces', 'Optional 4-person jacuzzi'] },
      { title: 'Amenities', items: ['Private club', 'Pool', 'Covered social area', "Children's playground", 'Security gatehouse', 'Cameras and access control', 'Visitor parking'] },
      { title: 'Finishes', items: ['Imported porcelain tile floors', 'Modular kitchen and doors', 'White quartz countertops', 'Glass sliding windows and doors with black aluminum frames'] },
    ],
    payment: [
      { label: 'Reservation', value: 'US$1,000' },
      { label: '10% down payment', value: 'Includes the reservation' },
      { label: '20% during construction', value: 'In installments' },
      { label: 'Remaining 70%', value: 'On delivery' },
    ],
    tags: ['Private club'],
  },
};
