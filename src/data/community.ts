import type { ForumPost } from '../types';

export const forumPosts: ForumPost[] = [
  { id: 'fp1', userId: 'u3', userName: 'Maria Santos', title: 'Best organic fertilizer for tomatoes?', content: 'I am looking for recommendations on organic fertilizers that work well for tomato plants in loamy soil. Any suggestions?', tags: ['fertilizers', 'tomatoes', 'organic'], replies: 12, likes: 24, createdAt: '2026-04-08' },
  { id: 'fp2', userId: 'u4', userName: 'Juan Dela Cruz', title: 'Dealing with pests during wet season', content: 'The rainy season is causing more pest problems in my rice field. What pest control methods work best?', tags: ['pest-control', 'rice', 'wet-season'], replies: 8, likes: 15, createdAt: '2026-04-05' },
  { id: 'fp3', userId: 'u5', userName: 'Elena Rodriguez', title: 'Looking for reliable seed suppliers', content: 'Need recommendations for certified seed suppliers in Mindanao. Prefer varieties resistant to drought.', tags: ['seeds', 'suppliers', 'mindanao'], replies: 6, likes: 10, createdAt: '2026-04-01' },
  { id: 'fp4', userId: 'u6', userName: 'Pedro Lim', title: 'Smart irrigation tips for small farms', content: 'I want to set up an affordable drip irrigation system for my 1-hectare vegetable farm. Any tips?', tags: ['irrigation', 'small-farm', 'drip'], replies: 15, likes: 32, createdAt: '2026-03-28' },
  { id: 'fp5', userId: 'u7', userName: 'Carla Reyes', title: 'Government grants for young farmers', content: 'Share experiences with government programs that support young farmers. What grants are available?', tags: ['government', 'grants', 'young-farmers'], replies: 9, likes: 28, createdAt: '2026-03-25' },
  { id: 'fp6', userId: 'u8', userName: 'Ramon Diaz', title: 'Best rice varieties for wet season planting', content: 'Looking for high-yield rice varieties that perform well during heavy rainfall. Any recommendations from fellow rice growers?', tags: ['rice', 'wet-season', 'varieties'], replies: 14, likes: 19, createdAt: '2026-04-12' },
  { id: 'fp7', userId: 'u9', userName: 'Teresa Garcia', title: 'Organic vs synthetic fertilizers debate', content: 'I have been using synthetic fertilizers but considering switching to organic. What has been your experience with yield differences?', tags: ['fertilizers', 'organic', 'debate'], replies: 22, likes: 41, createdAt: '2026-04-02' },
  { id: 'fp8', userId: 'u10', userName: 'Benny Tan', title: 'Livestock integration with crop farming', content: 'I want to integrate goat raising with my vegetable farm. Any tips on managing both successfully?', tags: ['livestock', 'integration', 'tips'], replies: 7, likes: 13, createdAt: '2026-03-30' },
];

export const educationalResources = [
  { id: 'e1', title: 'Introduction to Organic Farming', type: 'article', author: 'DA Philippines', duration: '10 min read', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=250&fit=crop' },
  { id: 'e2', title: 'Pest Management Best Practices', type: 'video', author: 'AgriExpert', duration: '15 min', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop' },
  { id: 'e3', title: 'Soil Health & Composting Guide', type: 'article', author: 'Farmers Weekly', duration: '8 min read', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=250&fit=crop' },
  { id: 'e4', title: 'Modern Irrigation Techniques', type: 'video', author: 'IrrigationPH', duration: '20 min', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=250&fit=crop' },
  { id: 'e5', title: 'Crop Rotation Planning', type: 'article', author: 'AgriScience', duration: '12 min read', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=250&fit=crop' },
  { id: 'e6', title: 'Smart Greenhouses 101', type: 'video', author: 'TechFarm PH', duration: '18 min', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=250&fit=crop' },
  { id: 'e7', title: 'Water Management during Drought', type: 'article', author: 'DA Philippines', duration: '7 min read', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop' },
  { id: 'e8', title: 'Intermediate Rice Farming', type: 'video', author: 'RiceBoard PH', duration: '25 min', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=250&fit=crop' },
  { id: 'e9', title: 'Post-Harvest Handling Guide', type: 'article', author: 'AgriTraining', duration: '15 min read', image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=250&fit=crop' },
  { id: 'e10', title: 'Disease Identification Walk', type: 'video', author: 'PlantDoc PH', duration: '12 min', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop' },
];

export const farmerGroups = [
  { id: 'g1', name: 'Organic Farmers PH', members: 1250, description: 'For farmers practicing organic methods', category: 'Organic' },
  { id: 'g2', name: 'Rice Growers Network', members: 890, description: 'Rice farming techniques and support', category: 'Rice' },
  { id: 'g3', name: 'Young Agri Entrepreneurs', members: 450, description: 'Supporting young farmers and agri-startups', category: 'Youth' },
  { id: 'g4', name: 'Vegetable Growers Circle', members: 320, description: 'Vegetable farming tips, seed swaps, and market links', category: 'Vegetables' },
  { id: 'g5', name: 'Livestock Raisers PH', members: 280, description: 'For cattle, goat, and poultry raisers across the Philippines', category: 'Livestock' },
  { id: 'g6', name: 'Sustainable Farming Alliance', members: 560, description: 'Promoting sustainable and regenerative agriculture practices', category: 'Sustainability' },
];
