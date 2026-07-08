import type { Product } from '../types';

export const productCatalog: Product[] = [
  { id: 'p1', title: 'Organic Fertilizer', category: 'fertilizers', price: 67.69, weight: '5kg bag', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop', alt: 'Organic Fertilizer', stock: 42, sellerId: 's1', sellerName: 'Green Farm Supplies', rating: 4.5, reviewCount: 128, createdAt: '2026-01-15' },
  { id: 'p2', title: 'Vegetable Seeds Pack', category: 'seeds', price: 45.00, weight: '500g', image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&h=400&fit=crop', alt: 'Vegetable Seeds', stock: 65, sellerId: 's1', sellerName: 'Green Farm Supplies', rating: 4.3, reviewCount: 95, createdAt: '2026-02-01' },
  { id: 'p3', title: 'Garden Tool Set', category: 'tools', price: 350.00, weight: '5 pieces', image: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=400&h=400&fit=crop', alt: 'Garden Tools', stock: 28, sellerId: 's2', sellerName: 'Agri Tech Store', rating: 4.7, reviewCount: 203, createdAt: '2026-01-10' },
  { id: 'p4', title: 'Plant Spray Bottle', category: 'crop-protection', price: 89.00, weight: '1L', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', alt: 'Plant Spray', stock: 15, sellerId: 's2', sellerName: 'Agri Tech Store', rating: 4.1, reviewCount: 47, createdAt: '2026-03-05' },
  { id: 'p5', title: 'Tomato Saplings', category: 'saplings', price: 120.00, weight: 'Bundle of 10', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=400&fit=crop', alt: 'Saplings', stock: 50, sellerId: 's1', sellerName: 'Green Farm Supplies', rating: 4.6, reviewCount: 78, createdAt: '2026-02-20' },
  { id: 'p6', title: 'Premium Soil Mix', category: 'soil-care', price: 180.00, weight: '10kg bag', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=400&fit=crop', alt: 'Soil Mix', stock: 33, sellerId: 's3', sellerName: 'Soil Masters', rating: 4.4, reviewCount: 156, createdAt: '2026-01-25' },
  { id: 'p7', title: 'Herb Seeds Collection', category: 'seeds', price: 75.00, weight: '6 varieties', image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=400&h=400&fit=crop', alt: 'Herb Seeds', stock: 0, sellerId: 's1', sellerName: 'Green Farm Supplies', rating: 4.2, reviewCount: 64, createdAt: '2026-03-10' },
  { id: 'p8', title: 'Pruning Shears', category: 'tools', price: 250.00, weight: 'Professional', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop', alt: 'Pruning Shears', stock: 20, sellerId: 's2', sellerName: 'Agri Tech Store', rating: 4.8, reviewCount: 312, createdAt: '2026-01-05' },
  { id: 'p9', title: 'Drip Irrigation Kit', category: 'irrigation', price: 450.00, weight: '50m tubing', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=400&fit=crop', alt: 'Drip Irrigation', stock: 11, sellerId: 's3', sellerName: 'Soil Masters', rating: 4.9, reviewCount: 89, createdAt: '2026-02-14' },
  { id: 'p10', title: 'Compost Bin', category: 'soil-care', price: 220.00, weight: '80L', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=400&fit=crop', alt: 'Compost Bin', stock: 17, sellerId: 's3', sellerName: 'Soil Masters', rating: 4.0, reviewCount: 41, createdAt: '2026-03-20' },
  { id: 'p11', title: 'Neem Oil Spray', category: 'crop-protection', price: 55.00, weight: '500ml', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', alt: 'Neem Oil', stock: 38, sellerId: 's2', sellerName: 'Agri Tech Store', rating: 4.3, reviewCount: 173, createdAt: '2026-01-30' },
  { id: 'p12', title: 'Watering Can', category: 'irrigation', price: 199.00, weight: '5L', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=400&fit=crop', alt: 'Watering Can', stock: 25, sellerId: 's2', sellerName: 'Agri Tech Store', rating: 4.5, reviewCount: 210, createdAt: '2026-02-10' },
  { id: 'p13', title: 'Soil pH Tester', category: 'tools', price: 150.00, weight: 'Digital', image: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=400&h=400&fit=crop', alt: 'Soil pH Tester', stock: 30, sellerId: 's2', sellerName: 'Agri Tech Store', rating: 4.2, reviewCount: 56, createdAt: '2026-03-15' },
  { id: 'p14', title: 'Organic Pesticide', category: 'crop-protection', price: 95.00, weight: '1L bottle', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', alt: 'Organic Pesticide', stock: 22, sellerId: 's3', sellerName: 'Soil Masters', rating: 4.4, reviewCount: 134, createdAt: '2026-02-25' },
  { id: 'p15', title: 'Coconut Coir Blocks', category: 'soil-care', price: 65.00, weight: '650g block', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=400&fit=crop', alt: 'Coconut Coir', stock: 45, sellerId: 's1', sellerName: 'Green Farm Supplies', rating: 4.6, reviewCount: 87, createdAt: '2026-01-20' },
  { id: 'p16', title: 'Greenhouse Film Roll', category: 'tools', price: 420.00, weight: '10m x 2m', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop', alt: 'Greenhouse Film', stock: 8, sellerId: 's3', sellerName: 'Soil Masters', rating: 4.7, reviewCount: 42, createdAt: '2026-03-01' },
  { id: 'p17', title: 'Liquid Seaweed Fertilizer', category: 'fertilizers', price: 85.00, weight: '500ml', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop', alt: 'Seaweed Fertilizer', stock: 36, sellerId: 's1', sellerName: 'Green Farm Supplies', rating: 4.3, reviewCount: 98, createdAt: '2026-02-05' },
  { id: 'p18', title: 'Seedling Trays (Pack of 10)', category: 'saplings', price: 55.00, weight: '10 pcs', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=400&fit=crop', alt: 'Seedling Trays', stock: 60, sellerId: 's2', sellerName: 'Agri Tech Store', rating: 4.1, reviewCount: 33, createdAt: '2026-03-25' },
  { id: 'p19', title: 'Mulch Film Roll', category: 'soil-care', price: 160.00, weight: '5kg roll', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=400&fit=crop', alt: 'Mulch Film', stock: 14, sellerId: 's3', sellerName: 'Soil Masters', rating: 4.5, reviewCount: 71, createdAt: '2026-01-12' },
  { id: 'p20', title: 'Hand Sprayer Pump', category: 'irrigation', price: 280.00, weight: '16L capacity', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=400&fit=crop', alt: 'Hand Sprayer', stock: 19, sellerId: 's2', sellerName: 'Agri Tech Store', rating: 4.0, reviewCount: 115, createdAt: '2026-02-18' },
];

export const featuredCategories = [
  { key: 'fertilizers', label: 'Fertilizers', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=200&fit=crop' },
  { key: 'saplings', label: 'Saplings', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=200&h=200&fit=crop' },
  { key: 'crop-protection', label: 'Agricultural Spray', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop' },
  { key: 'tools', label: 'Gardening Tools', image: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=200&h=200&fit=crop' },
  { key: 'irrigation', label: 'Irrigation', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=200&h=200&fit=crop' },
  { key: 'seeds', label: 'Plant Seeds', image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=200&h=200&fit=crop' },
  { key: 'soil-care', label: 'Soil Care', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=200&h=200&fit=crop' },
];

export const categoryLabels: Record<string, string> = {
  all: 'All', fertilizers: 'Fertilizers', saplings: 'Saplings',
  'crop-protection': 'Agricultural Spray', seeds: 'Seeds',
  'soil-care': 'Soil Care', tools: 'Tools', irrigation: 'Irrigation',
};

export const sellers = [
  { id: 's1', name: 'Green Farm Supplies', rating: 4.6, totalSales: 1520, joined: '2024-03-15', verified: true },
  { id: 's2', name: 'Agri Tech Store', rating: 4.4, totalSales: 890, joined: '2024-06-20', verified: true },
  { id: 's3', name: 'Soil Masters', rating: 4.7, totalSales: 2100, joined: '2023-11-01', verified: true },
];
