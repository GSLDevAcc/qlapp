// src/lib/audit-data.ts
import { 
  Database, 
  // Answer, 
  // User, 
  // UserCompany, 
  // Client, 
  // ScoreSummary, 
  // Section, 
  // Item, 
  // Report,
  SectionData
} from '@/types/audit'

const auditData: Partial<Database> = {
  // Users
  users: [
    {
      id: '1',
      name: 'John',
      surname: 'Doe',
      email: 'john@example.com',
      phone: '1234567890'
    }
  ],

  // User Companies
  userCompanies: [
    {
      id: '1',
      userId: '1',
      companyName: 'Audit Company Ltd',
      address: '123 Main Street'
    }
  ],

  // Clients
  clients: [
    {
      id: '1',
      companyId: '1',
      userId: '1',
      clientName: 'Sample Hotel Group',
      hotelName: 'Grand Hotel',
      address: '456 Hotel Avenue',
      contactPersonOnSite: 'Jane Smith',
      positionOfContactPerson: 'Hotel Manager'
    }
  ],

  // Score Summaries (main sections)
  scoreSummaries: [
    {
      id: '1',
      companyId: '1',
      userId: '1',
      item: 'Front food handling area',
      percentagePerSection: 100,
      minorNC: 0,
      majorNC: 0
    },
    {
      id: '1.1',
      companyId: '1',
      userId: '1',
      item: 'Front food handling area 2',
      percentagePerSection: 100,
      minorNC: 0,
      majorNC: 0
    },
    {
      id: '1.2',
      companyId: '1',
      userId: '1',
      item: 'Front food handling area 2',
      percentagePerSection: 100,
      minorNC: 0,
      majorNC: 0
    },
    {
      id: '2',
      companyId: '1',
      userId: '1',
      item: 'Dry store',
      percentagePerSection: 100,
      minorNC: 0,
      majorNC: 0
    },
    {
      id: '3',
      companyId: '1',
      userId: '1',
      item: 'Cold room',
      percentagePerSection: 100,
      minorNC: 0,
      majorNC: 0
    },
    {
      id: '4',
      companyId: '1',
      userId: '1',
      item: 'Chill room',
      percentagePerSection: 100,
      minorNC: 0,
      majorNC: 0
    },
    {
      id: '5',
      companyId: '1',
      userId: '1',
      item: 'Butchery/fish preparation area',
      percentagePerSection: 100,
      minorNC: 0,
      majorNC: 0
    },
    {
      id: '6',
      companyId: '1',
      userId: '1',
      item: 'Food prep area',
      percentagePerSection: 100,
      minorNC: 0,
      majorNC: 0
    },
    {
      id: '7',
      companyId: '1',
      userId: '1',
      item: 'Potwash/dishwash area',
      percentagePerSection: 100,
      minorNC: 0,
      majorNC: 0
    },
    {
      id: '8',
      companyId: '1',
      userId: '1',
      item: 'Bar',
      percentagePerSection: 100,
      minorNC: 0,
      majorNC: 0
    },
    {
      id: '9',
      companyId: '1',
      userId: '1',
      item: 'Waste disposal',
      percentagePerSection: 100,
      minorNC: 0,
      majorNC: 0
    },
    {
      id: '10',
      companyId: '1',
      userId: '1',
      item: 'Bottling plant',
      percentagePerSection: 100,
      minorNC: 0,
      majorNC: 0
    },
    {
      id: '11',
      companyId: '1',
      userId: '1',
      item: 'Staff locker & toilet',
      percentagePerSection: 100,
      minorNC: 0,
      majorNC: 0
    },
    {
      id: '12',
      companyId: '1',
      userId: '1',
      item: 'Documentation and Good manufacturing practices',
      percentagePerSection: 100,
      minorNC: 0,
      majorNC: 0
    }
  ],

  // Sections
  sections: [
     // Front food handling area (ID: 1) sections
  {
    id: '1',
    companyId: '1',
    scoreSummaryId: '1',
    item: 'Infrastructure',
    weightage: 10
  },
  {
    id: '2',
    companyId: '1',
    scoreSummaryId: '1',
    item: 'Equipment & Utensils',
    weightage: 15
  },
  {
    id: '3',
    companyId: '1',
    scoreSummaryId: '1',
    item: 'Product storage',
    weightage: 15
  },
  {
    id: '4',
    companyId: '1',
    scoreSummaryId: '1',
    item: 'Product Hygiene and Safety',
    weightage: 30
  },
  {
    id: '5',
    companyId: '1',
    scoreSummaryId: '1',
    item: 'Staff control',
    weightage: 10
  },
  {
    id: '6',
    companyId: '1',
    scoreSummaryId: '1',
    item: 'Cleaning & sanitation/Pest control',
    weightage: 20
  },

  // Dry store (ID: 2) sections
  {
    id: '7',
    companyId: '1',
    scoreSummaryId: '2',
    item: 'Infrastructure',
    weightage: 20
  },
  {
    id: '8',
    companyId: '1',
    scoreSummaryId: '2',
    item: 'Storage Practices',
    weightage: 40
  },
  {
    id: '9',
    companyId: '1',
    scoreSummaryId: '2',
    item: 'Personal Hygiene & Habits',
    weightage: 40
  },

  // Cold room (ID: 3) sections
  {
    id: '10',
    companyId: '1',
    scoreSummaryId: '3',
    item: 'Equipment, Storage conditions and Food Handling',
    weightage: 100
  },

  // Chill room (ID: 4) sections
  {
    id: '11',
    companyId: '1',
    scoreSummaryId: '4',
    item: 'Equipment, Storage conditions and Food Handling',
    weightage: 100
  },

  // Butchery/fish preparation area (ID: 5) sections
  {
    id: '12',
    companyId: '1',
    scoreSummaryId: '5',
    item: 'Infrastructure',
    weightage: 10
  },
  {
    id: '13',
    companyId: '1',
    scoreSummaryId: '5',
    item: 'Equipment & Utensils',
    weightage: 15
  },
  {
    id: '14',
    companyId: '1',
    scoreSummaryId: '5',
    item: 'Product storage',
    weightage: 15
  },
  {
    id: '15',
    companyId: '1',
    scoreSummaryId: '5',
    item: 'Staff control',
    weightage: 10
  },
  {
    id: '16',
    companyId: '1',
    scoreSummaryId: '5',
    item: 'Product Hygiene/Safety',
    weightage: 30
  },
  {
    id: '17',
    companyId: '1',
    scoreSummaryId: '5',
    item: 'Cleaning & sanitation/Pest control',
    weightage: 20
  },

  // Food prep area (ID: 6) sections
  {
    id: '18',
    companyId: '1',
    scoreSummaryId: '6',
    item: 'Infrastructure',
    weightage: 5
  },
  {
    id: '19',
    companyId: '1',
    scoreSummaryId: '6',
    item: 'Equipment & Utensils',
    weightage: 10
  },
  {
    id: '20',
    companyId: '1',
    scoreSummaryId: '6',
    item: 'Product storage',
    weightage: 10
  },
  {
    id: '21',
    companyId: '1',
    scoreSummaryId: '6',
    item: 'Food prep assembly',
    weightage: 20
  },
  {
    id: '22',
    companyId: '1',
    scoreSummaryId: '6',
    item: 'Product Hygiene and Safety',
    weightage: 30
  },
  {
    id: '23',
    companyId: '1',
    scoreSummaryId: '6',
    item: 'Staff control',
    weightage: 10
  },
  {
    id: '24',
    companyId: '1',
    scoreSummaryId: '6',
    item: 'Cleaning & sanitation/Pest control',
    weightage: 15
  },

  // Potwash/dishwash area (ID: 7) sections
  {
    id: '25',
    companyId: '1',
    scoreSummaryId: '7',
    item: 'Infrastructure',
    weightage: 25
  },
  {
    id: '26',
    companyId: '1',
    scoreSummaryId: '7',
    item: 'Equipment & Utensils',
    weightage: 30
  },
  {
    id: '27',
    companyId: '1',
    scoreSummaryId: '7',
    item: 'Staff control',
    weightage: 15
  },
  {
    id: '28',
    companyId: '1',
    scoreSummaryId: '7',
    item: 'Cleaning & sanitation/Pest control',
    weightage: 30
  },

  // Bar (ID: 8) sections
  {
    id: '29',
    companyId: '1',
    scoreSummaryId: '8',
    item: 'Infrastructure',
    weightage: 15
  },
  {
    id: '30',
    companyId: '1',
    scoreSummaryId: '8',
    item: 'Equipment & Utensils',
    weightage: 20
  },
  {
    id: '31',
    companyId: '1',
    scoreSummaryId: '8',
    item: 'Product storage',
    weightage: 15
  },
  {
    id: '32',
    companyId: '1',
    scoreSummaryId: '8',
    item: 'Staff control',
    weightage: 20
  },
  {
    id: '33',
    companyId: '1',
    scoreSummaryId: '8',
    item: 'Cleaning & sanitation/Pest control',
    weightage: 30
  },

  // Waste disposal (ID: 9) section
  {
    id: '34',
    companyId: '1',
    scoreSummaryId: '9',
    item: 'Waste disposal area & process',
    weightage: 100
  },

  // Bottling plant (ID: 10) sections
  {
    id: '35',
    companyId: '1',
    scoreSummaryId: '10',
    item: 'Infrastructure',
    weightage: 10
  },
  {
    id: '36',
    companyId: '1',
    scoreSummaryId: '10',
    item: 'Equipment & Utensils',
    weightage: 40
  },
  {
    id: '37',
    companyId: '1',
    scoreSummaryId: '10',
    item: 'Staff control',
    weightage: 20
  },
  {
    id: '38',
    companyId: '1',
    scoreSummaryId: '10',
    item: 'Cleaning & sanitation/Pest control',
    weightage: 30
  },

  // Staff locker & toilet (ID: 11) sections
  {
    id: '39',
    companyId: '1',
    scoreSummaryId: '11',
    item: 'Locker/Changing room',
    weightage: 50
  },
  {
    id: '40',
    companyId: '1',
    scoreSummaryId: '11',
    item: 'Staff Toilet',
    weightage: 50
  },

  // Documentation and GMP (ID: 12) sections
  {
    id: '41',
    companyId: '1',
    scoreSummaryId: '12',
    item: 'Sanitation & cleaning',
    weightage: 10
  },
  {
    id: '42',
    companyId: '1',
    scoreSummaryId: '12',
    item: 'Pest Control & Maintenance',
    weightage: 10
  },
  {
    id: '43',
    companyId: '1',
    scoreSummaryId: '12',
    item: 'Suppliers',
    weightage: 10
  },
  {
    id: '44',
    companyId: '1',
    scoreSummaryId: '12',
    item: 'Visitors',
    weightage: 5
  },
  {
    id: '45',
    companyId: '1',
    scoreSummaryId: '12',
    item: 'Temperature Controls',
    weightage: 20
  },
  {
    id: '46',
    companyId: '1',
    scoreSummaryId: '12',
    item: 'Staff control',
    weightage: 20
  },
  {
    id: '47',
    companyId: '1',
    scoreSummaryId: '12',
    item: 'Product Processing',
    weightage: 20
  },
  {
    id: '48',
    companyId: '1',
    scoreSummaryId: '12',
    item: 'Allergen Management',
    weightage: 5
  }
  ],

  // Items
  items: [
    {
      id: '2.1',
      companyId: '1',
      sectionId: '1',
      question: 'State of Cleanliness & Conditions | Floors',
      tpp: 2
    },
    {
      id: '2.2',
      companyId: '1',
      sectionId: '1',
      question: 'State of Cleanliness & Conditions | Drains',
      tpp: 2
    },
    {
      id: '2.3',
      companyId: '1',
      sectionId: '1',
      question: 'State of Cleanliness & Conditions | Walls',
      tpp: 2
    },
    {
      id: '2.4',
      companyId: '1',
      sectionId: '1',
      question: 'State of Cleanliness & Conditions | Ceiling',
      tpp: 2
    },
    {
      id: '2.5',
      companyId: '1',
      sectionId: '1',
      question: 'State of Cleanliness & Conditions | Ventillation & Extraction',
      tpp: 2
    },
    {
      id: '2.6',
      companyId: '1',
      sectionId: '1',
      question: 'State of Cleanliness & Conditions | Lighting',
      tpp: 2
    },
    {
      id: '2.7',
      companyId: '1',
      sectionId: '1',
      question: 'State of Cleanliness & Conditions | Doors & Windows',
      tpp: 2
    },
    {
      id: '2.8',
      companyId: '1',
      sectionId: '1',
      question: 'State of Cleanliness & Conditions | Preparation tables',
      tpp: 2
    },
    {
      id: '2.9',
      companyId: '1',
      sectionId: '1',
      question: 'State of Cleanliness & Conditions | Others/non product contact surfaces',
      tpp: 2
    },
  
    // Section 2 - Equipment & Utensils items
    {
      id: '3.0',
      companyId: '1',
      sectionId: '2',
      question: 'Utensils & Equipment in good condition (Rust/falking/damage/no openings & seams)',
      tpp: 40
    },
    {
      id: '3.1',
      companyId: '1',
      sectionId: '2',
      question: 'Are the food contact surfaces hygienic and in good repair?',
      tpp: 40
    },
    {
      id: '3.2',
      companyId: '1',
      sectionId: '2',
      question: 'Hygenic design of equipment/utensils in use (Can equipment/utensil be easily cleaned?)',
      tpp: 20
    },
    {
      id: '3.3',
      companyId: '1',
      sectionId: '2',
      question: 'Has obsolete equipment been taken offsite?',
      tpp: 20
    },
    {
      id: '3.4',
      companyId: '1',
      sectionId: '2',
      question: 'Condition of wooden equipment/utensil (use of wooden utensils/equipment not recommended)',
      tpp: 40
    },
    {
      id: '3.5',
      companyId: '1',
      sectionId: '2',
      question: 'Equipment & utensils visually clean during the audit (direct product contact surfaces)',
      tpp: 20
    },
  
    // Section 3 - Product Storage items
    {
      id: '3.6',
      companyId: '1',
      sectionId: '3',
      question: 'State of Cleanliness & Conditions | Cold storage',
      tpp: 10
    },
    {
      id: '3.7',
      companyId: '1',
      sectionId: '3',
      question: 'State of Cleanliness & Conditions | Dry storage',
      tpp: 10
    },
    {
      id: '3.8',
      companyId: '1',
      sectionId: '3',
      question: 'Product Storage Practices | Is the food safe from contamination by foreign materials?',
      tpp: 10
    },
    {
      id: '3.9',
      companyId: '1',
      sectionId: '3',
      question: 'Product Storage Practices | Is food wrapped / stored in suitable food grade containers / materials?',
      tpp: 10
    },
    {
      id: '4.0',
      companyId: '1',
      sectionId: '3',
      question: 'Product Storage Practices | Is the correct storage of ready-to-eat and potentially hazardous products maintained in the cold storage unit?',
      tpp: 10
    },
    {
      id: '4.1',
      companyId: '1',
      sectionId: '3',
      question: 'Product Storage Practices | Allergen containing products stored separate/segregated from non allergic products',
      tpp: 10
    },
    {
      id: '4.2',
      companyId: '1',
      sectionId: '3',
      question: 'Product Storage Practices | Freshness of food on display',
      tpp: 20
    },
    {
      id: '4.3',
      companyId: '1',
      sectionId: '3',
      question: 'Product Storage Practices | Condition and cleanliness of sauces & condiment dispensers',
      tpp: 10
    },
    {
      id: '4.4',
      companyId: '1',
      sectionId: '3',
      question: 'Product Storage Practices | Condition of products & ingredients',
      tpp: 10
    },
    {
      id: '4.5',
      companyId: '1',
      sectionId: '3',
      question: 'Product Storage Practices | Absence of expired products',
      tpp: 10
    },
    {
      id: '4.6',
      companyId: '1',
      sectionId: '3',
      question: 'Product Storage Practices | Food correctly covered and labelled',
      tpp: 10
    },
  
    // Section 4 - Product Hygiene and Safety items
    {
      id: '4.7',
      companyId: '1',
      sectionId: '4',
      question: 'Temperature monitoring | Cold storage/display: temperature measured at the time of the audit acceptable as per spec',
      tpp: 40
    },
    {
      id: '4.8',
      companyId: '1',
      sectionId: '4',
      question: 'Temperature monitoring | Hot holding: temperature measured at the time of the audit acceptable as per spec',
      tpp: 40
    },
    {
      id: '4.9',
      companyId: '1',
      sectionId: '4',
      question: 'Temperature monitoring | Is chilled food being held below 5 degrees C? ( +3degC added variation limit when held at ambient)',
      tpp: 40
    },
    {
      id: '5.0',
      companyId: '1',
      sectionId: '4',
      question: 'Temperature monitoring | All cold storage units/display/cooler boxes with ice included in the monitoring system',
      tpp: 10
    },
    {
      id: '5.1',
      companyId: '1',
      sectionId: '4',
      question: 'Temperature monitoring | All hot holding units included in the temperature monitoring system',
      tpp: 10
    },
    {
      id: '5.2',
      companyId: '1',
      sectionId: '4',
      question: 'Chilled display/holding | Is all cold food discarded if it has been displayed longer than 4 hours at above 5°C?',
      tpp: 40
    },
    {
      id: '5.3',
      companyId: '1',
      sectionId: '4',
      question: 'Chilled display/holding | Are foods not held for more than 2 hours in hot holding units?',
      tpp: 40
    },
    {
      id: '5.4',
      companyId: '1',
      sectionId: '4',
      question: 'Chilled display/holding | Are hot holding units adequately preheated before use/water level sufficient?',
      tpp: 40
    },
    {
      id: '5.5',
      companyId: '1',
      sectionId: '4',
      question: 'Chilled display/holding | Are foods in cold display or holding units sufficiently protected from contamination risks?',
      tpp: 40
    },
    {
      id: '5.6',
      companyId: '1',
      sectionId: '4',
      question: 'Chilled display/holding | Is the amount of food kept on display kept to the minimum necessary?',
      tpp: 20
    },
    {
      id: '5.7',
      companyId: '1',
      sectionId: '4',
      question: 'Chilled display/holding | Are designated serving utensils provided for foods?',
      tpp: 10
    },
    {
      id: '5.8',
      companyId: '1',
      sectionId: '4',
      question: 'Allergen Management | Client made aware of possible allergens handled in production area (e.g notices/menu)',
      tpp: 10
    },
    {
      id: '5.9',
      companyId: '1',
      sectionId: '4',
      question: 'Allergen Management | Evidence of cross contamination is controlled',
      tpp: 40
    },
    {
      id: '6.0',
      companyId: '1',
      sectionId: '4',
      question: 'Allergen Management | Separate work areas/or utensils/or staff available for allergen handling or clear instructions available to ensure cleaning & disinfection and hand washing after handling allergens',
      tpp: 10
    },
  
    // Section 5 - Staff Control items
    {
      id: '6.1',
      companyId: '1',
      sectionId: '5',
      question: 'Personnel Hygiene & Habits | Appropriate and clean protective clothing',
      tpp: 20
    },
    {
      id: '6.2',
      companyId: '1',
      sectionId: '5',
      question: 'Personnel Hygiene & Habits | State of cleanliness and condition of PPE',
      tpp: 20
    },
    {
      id: '6.3',
      companyId: '1',
      sectionId: '5',
      question: 'Personnel Hygiene & Habits | Correct use of PPE',
      tpp: 20
    },
    {
      id: '6.4',
      companyId: '1',
      sectionId: '5',
      question: 'Personnel Hygiene & Habits | Finger nails short, clean, unvarnished',
      tpp: 20
    },
    {
      id: '6.5',
      companyId: '1',
      sectionId: '5',
      question: 'Personnel Hygiene & Habits | Are personal items of staff not located in food preparation zones?',
      tpp: 20
    },
    {
      id: '6.6',
      companyId: '1',
      sectionId: '5',
      question: 'Personnel Hygiene & Habits | Absence of jewellery, including watches',
      tpp: 20
    },
    {
      id: '6.7',
      companyId: '1',
      sectionId: '5',
      question: 'Personnel Hygiene & Habits | No observation of poor personal hygiene practices',
      tpp: 20
    },
    {
      id: '6.8',
      companyId: '1',
      sectionId: '5',
      question: 'Personnel Hygiene & Habits | No evidence of eating / drinking / spitting, coughing or smoking',
      tpp: 20
    },
    {
      id: '6.9',
      companyId: '1',
      sectionId: '5',
      question: 'Personnel Hygiene & Habits | Observation of open cuts/lessions, not covered with waterproof plaster',
      tpp: 20
    },
    {
      id: '7.0',
      companyId: '1',
      sectionId: '5',
      question: 'Personnel Hygiene & Habits | Observation of poor working habits',
      tpp: 20
    },
    {
      id: '7.1',
      companyId: '1',
      sectionId: '5',
      question: 'Hand Basins | Hand wash basins in good working order and easily accessible',
      tpp: 40
    },
    {
      id: '7.2',
      companyId: '1',
      sectionId: '5',
      question: 'Hand Basins | Paper towel/hand dryer, soap & sanitizer available',
      tpp: 40
    },
    {
      id: '7.3',
      companyId: '1',
      sectionId: '5',
      question: 'Hand Basins | Proper hand washing procedure followed',
      tpp: 20
    },
  
    // Section 6 - Cleaning & Sanitation/Pest Control items
    {
      id: '7.4',
      companyId: '1',
      sectionId: '6',
      question: 'Cleaning Practices | Is good housekeeping practices evident (E.g no cluttering on shelves/work space)',
      tpp: 10
    },
    {
      id: '7.5',
      companyId: '1',
      sectionId: '6',
      question: 'Cleaning Practices | Is clean as you go practice employed?',
      tpp: 10
    },
    {
      id: '7.6',
      companyId: '1',
      sectionId: '6',
      question: 'Cleaning Practices | Are correct cleaning practices employed? (1. cleaning with detergents, 2. Removal of visible dirt, 3. Desinfection with sanitisers, 4 Adequate contact time)',
      tpp: 10
    },
    {
      id: '7.7',
      companyId: '1',
      sectionId: '6',
      question: 'Cleaning Practices | Sanitiser and detergent available for cleaning',
      tpp: 20
    },
    {
      id: '7.8',
      companyId: '1',
      sectionId: '6',
      question: 'Cleaning Practices | Correct use and storage of cleaned equipment/utensil',
      tpp: 20
    },
    {
      id: '7.9',
      companyId: '1',
      sectionId: '6',
      question: 'Cleaning Equipment | Is cleaning equipment in good condition and regularly cleaned / disinfected?',
      tpp: 10
    },
    {
      id: '8.0',
      companyId: '1',
      sectionId: '6',
      question: 'Cleaning Equipment | Correct storage practices/wall brackets available',
      tpp: 10
    },
    {
      id: '8.1',
      companyId: '1',
      sectionId: '6',
      question: 'Cleaning Equipment | Correct use and storage of wiping cloth/sponge',
      tpp: 20
    },
    {
      id: '8.2',
      companyId: '1',
      sectionId: '6',
      question: 'Cleaning Chemical | Cleaning chemical storage container adequately marked',
      tpp: 10
    },
    {
      id: '8.3',
      companyId: '1',
      sectionId: '6',
      question: 'Cleaning Chemical | Cleaning chemical in sprays bottles/buckets adequately marked when in use',
      tpp: 10
    },
    {
      id: '8.4',
      companyId: '1',
      sectionId: '6',
      question: 'Pest Control | Pedal-operated disposal bins - clean, lined & covered',
      tpp: 40
    },
    {
      id: '8.5',
      companyId: '1',
      sectionId: '6',
      question: 'Pest Control | Pest free conditions',
      tpp: 40
    },
    {
      id: '8.6',
      companyId: '1',
      sectionId: '6',
      question: 'Pest Control | Droppings due to pest activity',
      tpp: 40
    },
    {
      id: '8.7',
      companyId: '1',
      sectionId: '6',
      question: 'Pest Control | Are there an adequate number of operational electric fly killers in the food areas, and are they correctly positioned (not installed directly above processing area)?',
      tpp: 10
    }
  ],
 
  answers: [
    { id: 1, answer: 'Complying' },
    { id: 2, answer: 'Need Improvement' },
    { id: 3, answer: 'NC' },
    { id: 4, answer: 'NA' }
  ],

  // Reports
  reports: [
    {
      id: '1',
      companyId: '1',
      userId: '1',
      clientId: '1',
      scoreSummaryId: '1',
      sectionId: '1',
      itemId: '2.1',
      dateTimeOfAudit: new Date(),
      issueDate: new Date(),
      inspector: 'John Doe',
      inspectionBody: 'Audit Company Ltd',
      address: '789 Inspection St',
      reviewedBy: 'Senior Inspector',
      averageFloorAudit: 100,
      totalMarkFloorAudit: 70,
      totalMarkForSampling: 30,
      overallQuality: 100
    }
  ]
}



// Helper functions with proper type annotations
// Then, in audit-data.ts, let's update the getSectionData function:
export const getSectionData = (scoreSummaryId: string): SectionData | null => {
  const scoreSummary = auditData.scoreSummaries?.find(s => s.id === scoreSummaryId)
  if (!scoreSummary) return null

  const sections = auditData.sections?.filter(
    section => section.scoreSummaryId === scoreSummaryId
  ) || []

  const sectionsWithItems = sections.map(section => {
    const items = auditData.items?.filter(
      item => item.sectionId === section.id
    ) || []
    return {
      ...section,
      items
    }
  })

  return {
    scoreSummary,
    sections: sectionsWithItems
  }
}

export const getClientData = (userId: string) => {
  return auditData.clients?.filter(client => client.userId === userId)
}

export const getUserCompany = (userId: string) => {
  return auditData.userCompanies?.find(company => company.userId === userId)
}

export const getReportData = (reportId: string) => {
  const report = auditData.reports?.find(r => r.id === reportId)
  if (!report) return null

  const client = auditData.clients?.find(c => c.id === report.clientId)
  const scoreSummary = auditData.scoreSummaries?.find(s => s.id === report.scoreSummaryId)
  
  return {
    report,
    client,
    scoreSummary
  }
}

export default auditData;