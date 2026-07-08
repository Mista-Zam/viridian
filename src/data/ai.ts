import type { ChatMessage } from '../types';

export const cropRecommendations = [
  { crop: 'Tomato', suitability: 94, reason: 'Ideal for loamy soil with current temperature range', season: 'Dry season', water: 'Moderate' },
  { crop: 'Eggplant', suitability: 89, reason: 'Well-suited to your soil type and recent crop history', season: 'Dry season', water: 'Moderate' },
  { crop: 'Bell Pepper', suitability: 82, reason: 'High market demand with good soil compatibility', season: 'Dry season', water: 'Moderate' },
  { crop: 'Rice', suitability: 91, reason: 'Excellent for wet season with your farm location', season: 'Wet season', water: 'High' },
  { crop: 'Corn', suitability: 78, reason: 'Good rotation option after legumes', season: 'Any', water: 'Low-Moderate' },
  { crop: 'Okra', suitability: 86, reason: 'Fast-growing crop suited to warm climate', season: 'Dry season', water: 'Moderate' },
  { crop: 'String Beans', suitability: 83, reason: 'Nitrogen-fixing crop good for soil health', season: 'Any', water: 'Moderate' },
  { crop: 'Cabbage', suitability: 74, reason: 'Performs well with proper irrigation in cooler months', season: 'Wet season', water: 'High' },
];

export const diseaseData = [
  { name: 'Early Blight', crops: ['Tomato', 'Potato'], symptoms: 'Dark spots on leaves with concentric rings', treatment: 'Apply copper-based fungicide; remove infected leaves' },
  { name: 'Powdery Mildew', crops: ['Squash', 'Cucumber', 'Eggplant'], symptoms: 'White powder on leaf surfaces', treatment: 'Apply sulfur spray; ensure good air circulation' },
  { name: 'Rice Blast', crops: ['Rice'], symptoms: 'Diamond-shaped lesions on leaves', treatment: 'Use resistant varieties; apply fungicide at early signs' },
  { name: 'Corn Smut', crops: ['Corn'], symptoms: 'Galls on ears and tassels', treatment: 'Remove galls before they burst; rotate crops' },
  { name: 'Bacterial Wilt', crops: ['Tomato', 'Eggplant', 'Bell Pepper'], symptoms: 'Sudden wilting of leaves, vascular browning', treatment: 'Use resistant varieties; practice crop rotation; remove infected plants' },
  { name: 'Leaf Spot', crops: ['Okra', 'String Beans'], symptoms: 'Small brown spots with yellow halos on leaves', treatment: 'Apply fungicide; avoid overhead irrigation' },
];

export const fertilizerSuggestions = [
  { crop: 'Tomato', recommendation: '14-14-14 NPK at planting, then calcium nitrate every 2 weeks', organic: 'Compost tea + bone meal' },
  { crop: 'Rice', recommendation: 'Complete fertilizer 16-20-0 at basal, then urea at tillering', organic: 'Chicken manure 2 weeks before planting' },
  { crop: 'Eggplant', recommendation: '14-14-14 NPK, side-dress with ammonium sulfate', organic: 'Vermicompost + fish emulsion' },
  { crop: 'Corn', recommendation: '16-20-0 at planting, urea at knee-high stage', organic: 'Green manure + compost' },
  { crop: 'Okra', recommendation: '14-14-14 NPK at planting, side-dress after 30 days', organic: 'Vermicompost + fish emulsion' },
  { crop: 'String Beans', recommendation: 'Low nitrogen, high phosphorus (0-20-0) at planting', organic: 'Bone meal + compost' },
  { crop: 'Bell Pepper', recommendation: '14-14-14 NPK, calcium nitrate for fruit development', organic: 'Compost tea + seaweed extract' },
];

export const weatherForecast = [
  { day: 'Today', temp: '28°C', condition: 'Partly Cloudy', humidity: 72, rain: 10 },
  { day: 'Tomorrow', temp: '27°C', condition: 'Light Rain', humidity: 80, rain: 60 },
  { day: 'Wed', temp: '26°C', condition: 'Thunderstorms', humidity: 85, rain: 80 },
  { day: 'Thu', temp: '28°C', condition: 'Cloudy', humidity: 70, rain: 20 },
  { day: 'Fri', temp: '29°C', condition: 'Sunny', humidity: 65, rain: 5 },
  { day: 'Sat', temp: '30°C', condition: 'Sunny', humidity: 60, rain: 0 },
  { day: 'Sun', temp: '29°C', condition: 'Partly Cloudy', humidity: 68, rain: 15 },
];

export const marketTrends = [
  { product: 'Tomato', currentPrice: 45, trend: 'up', change: 12, demand: 'High' },
  { product: 'Rice', currentPrice: 52, trend: 'stable', change: 2, demand: 'Very High' },
  { product: 'Eggplant', currentPrice: 38, trend: 'up', change: 8, demand: 'Moderate' },
  { product: 'Corn', currentPrice: 28, trend: 'down', change: 5, demand: 'Stable' },
  { product: 'Bell Pepper', currentPrice: 65, trend: 'up', change: 15, demand: 'High' },
  { product: 'Okra', currentPrice: 25, trend: 'stable', change: 1, demand: 'Moderate' },
  { product: 'String Beans', currentPrice: 42, trend: 'up', change: 7, demand: 'Moderate' },
  { product: 'Cabbage', currentPrice: 35, trend: 'down', change: 4, demand: 'Stable' },
  { product: 'Calabaza', currentPrice: 30, trend: 'up', change: 6, demand: 'Moderate' },
];

export const chatMessages: ChatMessage[] = [
  { id: 'm1', sender: 'ai', text: 'Hello! I am your Viridian farming assistant. How can I help you today?', timestamp: new Date().toISOString() },
];
