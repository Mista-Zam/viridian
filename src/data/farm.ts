import type { FarmProfile, CropRecord, ActivityLog, FinancialRecord, FarmInventory } from '../types';

export const demoFarm: FarmProfile = {
  id: 'f1',
  userId: 'u1',
  name: 'Green Valley Farm',
  size: 5.5,
  soilType: 'Loamy',
  location: 'Kabacan, Philippines',
  cropHistory: ['Tomato', 'Rice', 'Corn', 'Eggplant'],
};

export const cropRecords: CropRecord[] = [
  { id: 'c1', farmId: 'f1', cropName: 'Tomato', plantedDate: '2026-03-01', harvestDate: '2026-06-15', status: 'growing', area: 1.5, expectedYield: 500 },
  { id: 'c2', farmId: 'f1', cropName: 'Rice', plantedDate: '2026-01-15', harvestDate: '2026-05-20', status: 'growing', area: 2.0, expectedYield: 1200 },
  { id: 'c3', farmId: 'f1', cropName: 'Corn', plantedDate: '2025-11-01', harvestDate: '2026-02-28', status: 'harvested', area: 1.0, expectedYield: 800, actualYield: 750 },
  { id: 'c4', farmId: 'f1', cropName: 'Eggplant', plantedDate: '2026-07-01', harvestDate: '2026-10-15', status: 'planned', area: 1.0, expectedYield: 400 },
  { id: 'c5', farmId: 'f1', cropName: 'Okra', plantedDate: '2026-04-20', harvestDate: '2026-07-30', status: 'growing', area: 0.5, expectedYield: 200 },
  { id: 'c6', farmId: 'f1', cropName: 'String Beans', plantedDate: '2026-02-10', harvestDate: '2026-05-05', status: 'growing', area: 0.8, expectedYield: 350 },
];

export const activityLogs: ActivityLog[] = [
  { id: 'a1', farmId: 'f1', type: 'fertilizer', description: 'Applied organic fertilizer to tomato beds', date: '2026-04-10', cost: 350 },
  { id: 'a2', farmId: 'f1', type: 'irrigation', description: 'Drip irrigation system run for 30 min', date: '2026-04-11', cost: 45 },
  { id: 'a3', farmId: 'f1', type: 'pest_control', description: 'Neem oil spray on tomato plants', date: '2026-04-08', cost: 120 },
  { id: 'a4', farmId: 'f1', type: 'planting', description: 'Planted rice seedlings in main field', date: '2026-01-15', cost: 800 },
  { id: 'a5', farmId: 'f1', type: 'harvesting', description: 'Harvested corn from east field', date: '2026-02-28', cost: 500 },
  { id: 'a6', farmId: 'f1', type: 'fertilizer', description: 'Side-dress fertilizer application on rice', date: '2026-03-20', cost: 420 },
  { id: 'a7', farmId: 'f1', type: 'irrigation', description: 'Flood irrigation for rice field', date: '2026-03-25', cost: 60 },
  { id: 'a8', farmId: 'f1', type: 'pest_control', description: 'Applied fungicide on tomato plants', date: '2026-04-05', cost: 180 },
];

export const financialRecords: FinancialRecord[] = [
  { id: 'fin1', farmId: 'f1', type: 'income', category: 'Crop Sales', amount: 45000, date: '2026-03-01', description: 'Corn harvest sale' },
  { id: 'fin2', farmId: 'f1', type: 'expense', category: 'Seeds', amount: 3200, date: '2026-01-10', description: 'Rice seeds purchase' },
  { id: 'fin3', farmId: 'f1', type: 'expense', category: 'Fertilizers', amount: 2800, date: '2026-02-15', description: 'Organic fertilizer' },
  { id: 'fin4', farmId: 'f1', type: 'income', category: 'Crop Sales', amount: 12000, date: '2026-01-20', description: 'Eggplant sale' },
  { id: 'fin5', farmId: 'f1', type: 'expense', category: 'Equipment', amount: 5500, date: '2026-03-05', description: 'Irrigation repair' },
  { id: 'fin6', farmId: 'f1', type: 'expense', category: 'Labor', amount: 8000, date: '2026-02-28', description: 'Harvest labor' },
  { id: 'fin7', farmId: 'f1', type: 'income', category: 'Crop Sales', amount: 18000, date: '2026-04-10', description: 'Tomato batch sale' },
  { id: 'fin8', farmId: 'f1', type: 'expense', category: 'Fertilizers', amount: 1500, date: '2026-04-01', description: 'Urea fertilizer' },
  { id: 'fin9', farmId: 'f1', type: 'expense', category: 'Labor', amount: 5000, date: '2026-03-28', description: 'Weeding labor' },
  { id: 'fin10', farmId: 'f1', type: 'income', category: 'Crop Sales', amount: 7500, date: '2026-02-15', description: 'Okra harvest sale' },
];

export const farmInventoryItems: FarmInventory[] = [
  { id: 'inv1', farmId: 'f1', name: 'Rice Seeds (NSIC Rc222)', category: 'seeds', quantity: 50, unit: 'kg', cost: 3200 },
  { id: 'inv2', farmId: 'f1', name: 'Organic Fertilizer', category: 'fertilizers', quantity: 120, unit: 'kg', cost: 2800 },
  { id: 'inv3', farmId: 'f1', name: 'Drip Irrigation Kit', category: 'equipment', quantity: 3, unit: 'units', cost: 13500 },
  { id: 'inv4', farmId: 'f1', name: 'Neem Oil', category: 'chemicals', quantity: 5, unit: 'L', cost: 1200 },
  { id: 'inv5', farmId: 'f1', name: 'Hand Trowels', category: 'equipment', quantity: 8, unit: 'pcs', cost: 1200 },
  { id: 'inv6', farmId: 'f1', name: 'Fungicide (Mancozeb)', category: 'chemicals', quantity: 2, unit: 'kg', cost: 450 },
  { id: 'inv7', farmId: 'f1', name: 'Garden Hoe', category: 'equipment', quantity: 4, unit: 'pcs', cost: 800 },
  { id: 'inv8', farmId: 'f1', name: 'Corn Seeds (NK 8840)', category: 'seeds', quantity: 25, unit: 'kg', cost: 1800 },
  { id: 'inv9', farmId: 'f1', name: 'Urea Fertilizer (46-0-0)', category: 'fertilizers', quantity: 80, unit: 'kg', cost: 1500 },
];
