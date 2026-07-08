import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { productCatalog, categoryLabels } from '../../data/products';
import { formatPeso } from '../../lib/utils';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import PageHeader from '../../components/ui/PageHeader';
import SearchInput from '../../components/ui/SearchInput';
import Badge from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function MarketplacePage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const addItem = useCartStore((s) => s.addItem);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = productCatalog.filter((p) => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAddToCart = (e: React.MouseEvent, product: typeof productCatalog[0]) => {
    e.stopPropagation();
    if (!user) { navigate('/login'); return; }
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      qty: 1,
      image: product.image,
      checked: true,
      sellerName: product.sellerName,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      <PageHeader
        title="Marketplace"
        actions={
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search products..."
            className="w-full sm:w-80"
          />
        }
      />

      <section>
        <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                activeCategory === key
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <Card
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer p-0"
            >
              <div className="aspect-square bg-gray-50 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>
              <div className="p-3 space-y-1.5">
                <Badge variant="primary" size="sm">{product.category}</Badge>
                <h3 className="font-semibold text-gray-900 text-sm leading-tight">{product.title}</h3>
                <p className="text-xs text-gray-400">{product.weight}</p>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={14} fill="currentColor" />
                  <span className="text-xs font-medium text-gray-700">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviewCount})</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-lg font-bold text-primary-500">{formatPeso(product.price)}</span>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<ShoppingCart size={14} />}
                    onClick={(e) => handleAddToCart(e, product)}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-12">No products found matching your criteria.</p>
        )}
      </section>
    </div>
  );
}
