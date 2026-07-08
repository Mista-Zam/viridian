import type {
  User, Product, Order, Notification, FarmProfile, CropRecord,
  ActivityLog, FinancialRecord, FarmInventory, ForumPost, Review,
  SellerProfile, PromoCampaign,
} from '../types';

const users: User[] = [
  { id: 'u1', email: 'farmer@viridian.com', username: 'zaldy_mar', name: 'Zaldy Mar Ybañez', role: 'farmer', verified: true, phone: '+63 912 345 6789', gender: 'male', dob: '2005-01-26', createdAt: '2026-01-01' },
  { id: 'u2', email: 'buyer@viridian.com', username: 'maria_santos', name: 'Maria Santos', role: 'buyer', verified: true, phone: '+63 923 456 7890', gender: 'female', dob: '1998-07-15', createdAt: '2026-01-10' },
  { id: 'u3', email: 'supplier@viridian.com', username: 'green_farm', name: 'Green Farm Supplies', role: 'supplier', verified: true, phone: '+63 934 567 8901', createdAt: '2026-01-05' },
  { id: 'u4', email: 'admin@viridian.com', username: 'viridian_admin', name: 'Admin User', role: 'admin', verified: true, phone: '+63 945 678 9012', createdAt: '2025-12-01' },
];

const products: Product[] = [
  { id: 'p1', title: 'Organic Fertilizer', category: 'fertilizers', price: 67.69, weight: '5kg bag', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop', alt: 'Organic Fertilizer', stock: 42, sellerId: 's1', sellerName: 'Green Farm Supplies', rating: 4.5, reviewCount: 128, description: 'Premium organic fertilizer enriched with natural nutrients for healthy crop growth. Suitable for all soil types.', createdAt: '2026-01-15' },
  { id: 'p2', title: 'Vegetable Seeds Pack', category: 'seeds', price: 45.00, weight: '500g', image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=400&fit=crop', alt: 'Vegetable Seeds', stock: 65, sellerId: 's1', sellerName: 'Green Farm Supplies', rating: 4.3, reviewCount: 95, description: 'Assorted vegetable seeds including pechay, kangkong, and string beans. High germination rate.', createdAt: '2026-02-01' },
  { id: 'p3', title: 'Garden Tool Set', category: 'tools', price: 350.00, weight: '5 pieces', image: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=400&h=400&fit=crop', alt: 'Garden Tools', stock: 28, sellerId: 's2', sellerName: 'Agri Tech Store', rating: 4.7, reviewCount: 203, description: 'Professional-grade garden tool set including trowel, pruner, cultivator, gloves, and kneeling pad.', createdAt: '2026-01-10' },
  { id: 'p4', title: 'Plant Spray Bottle', category: 'crop-protection', price: 89.00, weight: '1L', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', alt: 'Plant Spray', stock: 15, sellerId: 's2', sellerName: 'Agri Tech Store', rating: 4.1, reviewCount: 47, description: 'Adjustable nozzle spray bottle for pesticides and fertilizers. Durable construction.', createdAt: '2026-03-05' },
  { id: 'p5', title: 'Tomato Saplings', category: 'saplings', price: 120.00, weight: 'Bundle of 10', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=400&fit=crop', alt: 'Saplings', stock: 50, sellerId: 's1', sellerName: 'Green Farm Supplies', rating: 4.6, reviewCount: 78, description: 'Healthy tomato saplings ready for transplant. Disease-resistant variety.', createdAt: '2026-02-20' },
  { id: 'p6', title: 'Premium Soil Mix', category: 'soil-care', price: 180.00, weight: '10kg bag', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=400&fit=crop', alt: 'Soil Mix', stock: 33, sellerId: 's3', sellerName: 'Soil Masters', rating: 4.4, reviewCount: 156, description: 'Rich organic soil mix with compost and vermicast. Perfect for potting and raised beds.', createdAt: '2026-01-25' },
  { id: 'p7', title: 'Herb Seeds Collection', category: 'seeds', price: 75.00, weight: '6 varieties', image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=400&h=400&fit=crop', alt: 'Herb Seeds', stock: 0, sellerId: 's1', sellerName: 'Green Farm Supplies', rating: 4.2, reviewCount: 64, description: 'Collection of 6 herb varieties: basil, cilantro, mint, oregano, thyme, and rosemary.', createdAt: '2026-03-10' },
  { id: 'p8', title: 'Pruning Shears', category: 'tools', price: 250.00, weight: 'Professional', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop', alt: 'Pruning Shears', stock: 20, sellerId: 's2', sellerName: 'Agri Tech Store', rating: 4.8, reviewCount: 312, description: 'Professional bypass pruning shears with ergonomic handles and precision-ground blade.', createdAt: '2026-01-05' },
  { id: 'p9', title: 'Drip Irrigation Kit', category: 'irrigation', price: 450.00, weight: '50m tubing', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=400&fit=crop', alt: 'Drip Irrigation', stock: 11, sellerId: 's3', sellerName: 'Soil Masters', rating: 4.9, reviewCount: 89, description: 'Complete drip irrigation system with 50m tubing, connectors, drippers, and filter.', createdAt: '2026-02-14' },
  { id: 'p10', title: 'Compost Bin', category: 'soil-care', price: 220.00, weight: '80L', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=400&fit=crop', alt: 'Compost Bin', stock: 17, sellerId: 's3', sellerName: 'Soil Masters', rating: 4.0, reviewCount: 41, description: '80-liter compost bin with aeration system and easy-access door for harvesting compost.', createdAt: '2026-03-20' },
  { id: 'p11', title: 'Neem Oil Spray', category: 'crop-protection', price: 55.00, weight: '500ml', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', alt: 'Neem Oil', stock: 38, sellerId: 's2', sellerName: 'Agri Tech Store', rating: 4.3, reviewCount: 173, description: 'Cold-pressed neem oil concentrate. Effective organic pest control for common farm pests.', createdAt: '2026-01-30' },
  { id: 'p12', title: 'Watering Can', category: 'irrigation', price: 199.00, weight: '5L', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=400&fit=crop', alt: 'Watering Can', stock: 25, sellerId: 's2', sellerName: 'Agri Tech Store', rating: 4.5, reviewCount: 210, description: 'Galvanized steel watering can with detachable rose spout for gentle watering.', createdAt: '2026-02-10' },
];

const sellers: SellerProfile[] = [
  { id: 's1', userId: 'u3', storeName: 'Green Farm Supplies', description: 'Your trusted source for quality farm inputs and organic products.', rating: 4.6, totalSales: 1520, joinedDate: '2024-03-15', verified: true },
  { id: 's2', userId: 'u3', storeName: 'Agri Tech Store', description: 'Modern farming tools and equipment for the progressive farmer.', rating: 4.4, totalSales: 890, joinedDate: '2024-06-20', verified: true },
  { id: 's3', userId: 'u3', storeName: 'Soil Masters', description: 'Specialists in soil care, irrigation systems, and organic amendments.', rating: 4.7, totalSales: 2100, joinedDate: '2023-11-01', verified: true },
];

const orders: Order[] = [
  {
    id: 'VRD-260501-014', userId: 'u1',
    items: [{ title: 'Organic Fertilizer', qty: 2, price: 67.69 }, { title: 'Vegetable Seeds Pack', qty: 1, price: 45.00 }],
    total: 180.38, status: 'Out for delivery', courier: 'Viridian Logistics', eta: 'May 05, 2026',
    createdAt: '2026-05-01T09:20:00+08:00',
    address: { fullName: 'Zaldy Mar Ybañez', phoneNumber: '+63 912 345 6789', province: 'Cotabato', city: 'Kabacan', barangay: 'Poblacion', postalCode: '9407', street: '123 Rizal St', defaultAddress: true },
    steps: [
      { label: 'Order placed', time: 'May 01, 9:20 AM', done: true },
      { label: 'Packed by seller', time: 'May 02, 2:45 PM', done: true },
      { label: 'In transit', time: 'May 04, 8:10 AM', done: true },
      { label: 'Out for delivery', time: 'May 05, 10:30 AM', done: true },
      { label: 'Delivered', time: 'Pending', done: false },
    ],
  },
  {
    id: 'VRD-260428-009', userId: 'u1',
    items: [{ title: 'Premium Soil Mix', qty: 4, price: 180.00 }],
    total: 720.00, status: 'Delivered', courier: 'Kabacan Express', eta: 'Delivered May 02, 2026',
    createdAt: '2026-04-28T13:05:00+08:00',
    address: { fullName: 'Zaldy Mar Ybañez', phoneNumber: '+63 912 345 6789', province: 'Cotabato', city: 'Kabacan', barangay: 'Poblacion', postalCode: '9407', street: '123 Rizal St', defaultAddress: true },
    steps: [
      { label: 'Order placed', time: 'Apr 28, 1:05 PM', done: true },
      { label: 'Packed by seller', time: 'Apr 29, 4:15 PM', done: true },
      { label: 'In transit', time: 'May 01, 9:00 AM', done: true },
      { label: 'Delivered', time: 'May 02, 3:40 PM', done: true },
    ],
  },
  {
    id: 'VRD-260415-003', userId: 'u1',
    items: [{ title: 'Drip Irrigation Kit', qty: 1, price: 450.00 }, { title: 'Garden Tool Set', qty: 1, price: 350.00 }],
    total: 845.00, status: 'Processing', courier: 'Viridian Logistics', eta: 'Apr 20, 2026',
    createdAt: '2026-04-15T14:30:00+08:00',
    address: { fullName: 'Zaldy Mar Ybañez', phoneNumber: '+63 912 345 6789', province: 'Cotabato', city: 'Kabacan', barangay: 'Poblacion', postalCode: '9407', street: '123 Rizal St', defaultAddress: true },
    steps: [
      { label: 'Order placed', time: 'Apr 15, 2:30 PM', done: true },
      { label: 'Packed by seller', time: 'Pending', done: false },
      { label: 'In transit', time: 'Pending', done: false },
      { label: 'Delivered', time: 'Pending', done: false },
    ],
  },
];

const reviews: Review[] = [
  { id: 'r1', userId: 'u2', userName: 'Maria Santos', productId: 'p1', rating: 5, comment: 'Excellent fertilizer! My tomatoes have never looked better.', createdAt: '2026-03-15' },
  { id: 'r2', userId: 'u1', userName: 'Zaldy Mar Ybañez', productId: 'p3', rating: 4, comment: 'Good quality tools. The pruner is especially sharp.', createdAt: '2026-03-20' },
  { id: 'r3', userId: 'u2', userName: 'Maria Santos', productId: 'p9', rating: 5, comment: 'Easy to install and works perfectly. Saved so much water!', createdAt: '2026-04-01' },
  { id: 'r4', userId: 'u1', userName: 'Zaldy Mar Ybañez', productId: 'p6', rating: 4, comment: 'Rich soil mix, plants are thriving.', createdAt: '2026-02-10' },
];

const notifications: Notification[] = [
  { id: 'n1', userId: 'u1', type: 'order', title: 'Order Shipped', message: 'Your order VRD-260501-014 is out for delivery and arriving soon.', read: false, createdAt: new Date(Date.now() - 3600000).toISOString(), link: '/orders' },
  { id: 'n2', userId: 'u1', type: 'ai', title: 'Planting Recommendation', message: 'AI suggests this week is ideal for planting tomatoes. Favorable weather expected.', read: false, createdAt: new Date(Date.now() - 7200000).toISOString(), link: '/ai' },
  { id: 'n3', userId: 'u1', type: 'weather', title: 'Weather Advisory', message: 'Heavy rainfall expected in Kabacan area tomorrow. Consider postponing outdoor activities.', read: true, createdAt: new Date(Date.now() - 86400000).toISOString(), link: '/ai' },
  { id: 'n4', userId: 'u1', type: 'crop', title: 'Harvest Reminder', message: 'Your tomato crop is estimated to be ready for harvest in approximately 2 weeks.', read: false, createdAt: new Date(Date.now() - 172800000).toISOString(), link: '/farm' },
  { id: 'n5', userId: 'u1', type: 'promotion', title: 'Flash Sale Alert', message: '40% off on all fertilizers this weekend! Stock up for the planting season.', read: true, createdAt: new Date(Date.now() - 259200000).toISOString() },
  { id: 'n6', userId: 'u1', type: 'community', title: 'New Reply', message: 'Maria Santos replied to your forum post about organic fertilizers.', read: false, createdAt: new Date(Date.now() - 43200000).toISOString(), link: '/community' },
];

const farm: FarmProfile = {
  id: 'f1', userId: 'u1', name: 'Green Valley Farm', size: 5.5,
  soilType: 'Loamy', location: 'Kabacan, Cotabato',
  cropHistory: ['Tomato', 'Rice', 'Corn', 'Eggplant', 'String Beans'],
};

const crops: CropRecord[] = [
  { id: 'c1', farmId: 'f1', cropName: 'Tomato', plantedDate: '2026-03-01', harvestDate: '2026-06-15', status: 'growing', area: 1.5, expectedYield: 500 },
  { id: 'c2', farmId: 'f1', cropName: 'Rice', plantedDate: '2026-01-15', harvestDate: '2026-05-20', status: 'growing', area: 2.0, expectedYield: 1200 },
  { id: 'c3', farmId: 'f1', cropName: 'Corn', plantedDate: '2025-11-01', harvestDate: '2026-02-28', status: 'harvested', area: 1.0, expectedYield: 800, actualYield: 750 },
  { id: 'c4', farmId: 'f1', cropName: 'Eggplant', plantedDate: '2026-07-01', harvestDate: '2026-10-15', status: 'planned', area: 1.0, expectedYield: 400 },
  { id: 'c5', farmId: 'f1', cropName: 'String Beans', plantedDate: '2026-04-01', harvestDate: '2026-07-01', status: 'growing', area: 0.5, expectedYield: 200 },
];

const activities: ActivityLog[] = [
  { id: 'a1', farmId: 'f1', type: 'fertilizer', description: 'Applied organic fertilizer (14-14-14) to tomato beds', date: '2026-04-10', cost: 350 },
  { id: 'a2', farmId: 'f1', type: 'irrigation', description: 'Drip irrigation system run for 30 minutes on vegetable beds', date: '2026-04-11', cost: 45 },
  { id: 'a3', farmId: 'f1', type: 'pest_control', description: 'Applied neem oil spray on tomato plants for aphids', date: '2026-04-08', cost: 120 },
  { id: 'a4', farmId: 'f1', type: 'planting', description: 'Transplanted tomato seedlings to main field', date: '2026-03-01', cost: 500 },
  { id: 'a5', farmId: 'f1', type: 'planting', description: 'Planted rice seedlings in 2-hectare main field', date: '2026-01-15', cost: 800 },
  { id: 'a6', farmId: 'f1', type: 'harvesting', description: 'Harvested corn from 1-hectare east field', date: '2026-02-28', cost: 500 },
  { id: 'a7', farmId: 'f1', type: 'fertilizer', description: 'Side-dressed rice field with urea (46-0-0)', date: '2026-03-20', cost: 280 },
  { id: 'a8', farmId: 'f1', type: 'irrigation', description: 'Flood irrigation for rice field', date: '2026-03-25', cost: 60 },
];

const finances: FinancialRecord[] = [
  { id: 'fin1', farmId: 'f1', type: 'income', category: 'Crop Sales', amount: 45000, date: '2026-03-01', description: 'Corn harvest sale to local trader' },
  { id: 'fin2', farmId: 'f1', type: 'income', category: 'Crop Sales', amount: 12000, date: '2026-01-20', description: 'Eggplant harvest sale at public market' },
  { id: 'fin3', farmId: 'f1', type: 'income', category: 'Crop Sales', amount: 8500, date: '2026-02-15', description: 'String beans sale to wholesaler' },
  { id: 'fin4', farmId: 'f1', type: 'expense', category: 'Seeds', amount: 3200, date: '2026-01-10', description: 'Rice seeds (NSIC Rc222) - 50kg' },
  { id: 'fin5', farmId: 'f1', type: 'expense', category: 'Fertilizers', amount: 2800, date: '2026-02-15', description: 'Organic fertilizer for vegetable beds' },
  { id: 'fin6', farmId: 'f1', type: 'expense', category: 'Fertilizers', amount: 1680, date: '2026-03-20', description: 'Urea fertilizer for rice field' },
  { id: 'fin7', farmId: 'f1', type: 'expense', category: 'Equipment', amount: 5500, date: '2026-03-05', description: 'Irrigation system repair parts' },
  { id: 'fin8', farmId: 'f1', type: 'expense', category: 'Labor', amount: 8000, date: '2026-02-28', description: 'Harvest labor wages (4 workers)' },
  { id: 'fin9', farmId: 'f1', type: 'expense', category: 'Pest Control', amount: 1200, date: '2026-04-08', description: 'Neem oil and organic pesticide' },
  { id: 'fin10', farmId: 'f1', type: 'income', category: 'Crop Sales', amount: 15000, date: '2025-12-15', description: 'Previous rice harvest sale' },
];

const inventory: FarmInventory[] = [
  { id: 'inv1', farmId: 'f1', name: 'Rice Seeds (NSIC Rc222)', category: 'seeds', quantity: 50, unit: 'kg', cost: 3200 },
  { id: 'inv2', farmId: 'f1', name: 'Corn Seeds (IPB Var 1)', category: 'seeds', quantity: 25, unit: 'kg', cost: 1800 },
  { id: 'inv3', farmId: 'f1', name: 'Organic Fertilizer (14-14-14)', category: 'fertilizers', quantity: 120, unit: 'kg', cost: 2800 },
  { id: 'inv4', farmId: 'f1', name: 'Urea (46-0-0)', category: 'fertilizers', quantity: 80, unit: 'kg', cost: 1680 },
  { id: 'inv5', farmId: 'f1', name: 'Drip Irrigation Kit', category: 'equipment', quantity: 3, unit: 'units', cost: 13500 },
  { id: 'inv6', farmId: 'f1', name: 'Hand Trowels', category: 'equipment', quantity: 8, unit: 'pcs', cost: 1200 },
  { id: 'inv7', farmId: 'f1', name: 'Pruning Shears', category: 'equipment', quantity: 4, unit: 'pcs', cost: 1000 },
  { id: 'inv8', farmId: 'f1', name: 'Neem Oil', category: 'chemicals', quantity: 5, unit: 'L', cost: 1200 },
  { id: 'inv9', farmId: 'f1', name: 'Copper Fungicide', category: 'chemicals', quantity: 3, unit: 'kg', cost: 900 },
  { id: 'inv10', farmId: 'f1', name: 'Knapsack Sprayer', category: 'equipment', quantity: 2, unit: 'units', cost: 3200 },
];

const forumPosts: ForumPost[] = [
  { id: 'fp1', userId: 'u2', userName: 'Maria Santos', title: 'Best organic fertilizer for tomatoes?', content: 'I am looking for recommendations on organic fertilizers that work well for tomato plants in loamy soil. I have tried vermicast but want to explore other options. Any suggestions from experienced farmers?', tags: ['fertilizers', 'tomatoes', 'organic'], replies: 12, likes: 24, createdAt: '2026-04-08' },
  { id: 'fp2', userId: 'u1', userName: 'Zaldy Mar Ybañez', title: 'Dealing with pests during wet season', content: 'The rainy season is causing more pest problems in my rice field. Aphids and leafhoppers are becoming prevalent. What pest control methods work best during wet conditions?', tags: ['pest-control', 'rice', 'wet-season'], replies: 8, likes: 15, createdAt: '2026-04-05' },
  { id: 'fp3', userId: 'u5', userName: 'Elena Rodriguez', title: 'Looking for reliable seed suppliers in Mindanao', content: 'Need recommendations for certified seed suppliers in Mindanao. Prefer varieties resistant to drought and common pests. Looking for both rice and vegetable seeds.', tags: ['seeds', 'suppliers', 'mindanao'], replies: 6, likes: 10, createdAt: '2026-04-01' },
  { id: 'fp4', userId: 'u6', userName: 'Pedro Lim', title: 'Smart irrigation tips for small farms', content: 'I want to set up an affordable drip irrigation system for my 1-hectare vegetable farm. My budget is around PHP 15,000. Any tips on brands or DIY setups?', tags: ['irrigation', 'small-farm', 'drip'], replies: 15, likes: 32, createdAt: '2026-03-28' },
  { id: 'fp5', userId: 'u7', userName: 'Carla Reyes', title: 'Government grants available for young farmers', content: 'Share your experiences with government programs that support young farmers. What grants are available through DA and DAR? How do I apply?', tags: ['government', 'grants', 'young-farmers'], replies: 9, likes: 28, createdAt: '2026-03-25' },
  { id: 'fp6', userId: 'u4', userName: 'Admin User', title: 'Viridian Platform Update v2.0', content: 'We are excited to announce the new Farm Management module! Track your crops, activities, and finances all in one place.', tags: ['announcement', 'update', 'features'], replies: 22, likes: 45, createdAt: '2026-03-20' },
];

const promoCampaigns: PromoCampaign[] = [
  { id: 'pr1', sellerId: 's1', title: 'Spring Planting Sale', discount: 20, startDate: '2026-04-01', endDate: '2026-04-30', products: ['p1', 'p2', 'p5'], active: true },
  { id: 'pr2', sellerId: 's2', title: 'Tool Clearance', discount: 15, startDate: '2026-04-15', endDate: '2026-05-15', products: ['p3', 'p8'], active: true },
  { id: 'pr3', sellerId: 's3', title: 'Irrigation Special', discount: 10, startDate: '2026-04-10', endDate: '2026-05-10', products: ['p9', 'p12'], active: true },
];

export {
  users, products, sellers, orders, reviews, notifications,
  farm, crops, activities, finances, inventory,
  forumPosts, promoCampaigns,
};
