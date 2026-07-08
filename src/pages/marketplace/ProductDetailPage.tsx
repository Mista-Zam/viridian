import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, ShoppingCart, Minus, Plus, ThumbsUp, MessageSquare, Verified } from 'lucide-react';
import { productCatalog, categoryLabels } from '../../data/products';
import { formatPeso, generateId } from '../../lib/utils';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import Breadcrumbs from '../../components/ui/Breadcrumbs';
import Badge from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const dummyReviews = [
  { id: 'r1', author: 'Maria Santos', avatar: 'MS', rating: 5, date: '2 weeks ago', verified: true, text: 'Excellent quality! The produce was fresh and well-packaged. Delivered earlier than expected. Will definitely order again.', helpful: 24 },
  { id: 'r2', author: 'Juan Dela Cruz', avatar: 'JD', rating: 4, date: '1 month ago', verified: true, text: 'Good product for the price. The weight was accurate and the seller was responsive to my questions. Minor issue with packaging but overall satisfied.', helpful: 18 },
  { id: 'r3', author: 'Ana Gonzales', avatar: 'AG', rating: 5, date: '3 weeks ago', verified: true, text: 'My go-to supplier for organic produce. Consistent quality every time. Highly recommended for fellow farmers!', helpful: 32 },
  { id: 'r4', author: 'Pedro Reyes', avatar: 'PR', rating: 3, date: '2 months ago', verified: false, text: 'Decent product but shipping took longer than expected. The item itself was good though.', helpful: 7 },
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);

  const product = productCatalog.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        <Link to="/marketplace" className="text-primary-500 mt-2 inline-block hover:underline">Back to Marketplace</Link>
      </div>
    );
  }

  const similar = productCatalog.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 8);

  const handleAddToCart = () => {
    if (!user) { navigate('/login'); return; }
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      qty,
      image: product.image,
      checked: true,
      sellerName: product.sellerName,
    });
  };

  const handleBuyNow = () => {
    if (!user) { navigate('/login'); return; }
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      qty,
      image: product.image,
      checked: true,
      sellerName: product.sellerName,
    });
    navigate('/checkout');
  };

  const renderStars = (r: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={14} className={i < Math.floor(r) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} />
    ));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Breadcrumbs
        items={[
          { label: 'Marketplace', href: '/marketplace' },
          { label: categoryLabels[product.category] || product.category, href: '/marketplace' },
          { label: product.title },
        ]}
        className="mb-6"
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <div className="aspect-square bg-gray-50 rounded-xl overflow-hidden border border-border">
            <img src={product.image} alt={product.alt} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {[product.image, product.image, product.image].map((img, i) => (
              <div key={i} className="w-16 h-16 rounded-lg border border-border overflow-hidden flex-shrink-0">
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <Badge variant="primary" size="md">{categoryLabels[product.category] || product.category}</Badge>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">{product.title}</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">{renderStars(product.rating)}</div>
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            <span className="text-sm text-gray-400">({product.reviewCount} reviews)</span>
          </div>

          <div className="text-3xl font-bold text-primary-500">{formatPeso(product.price)}</div>

          <div className="text-sm text-gray-500 space-y-1">
            <p><span className="font-medium text-gray-700">Weight:</span> {product.weight}</p>
            <p><span className="font-medium text-gray-700">Seller:</span> {product.sellerName}</p>
            <p><span className="font-medium text-gray-700">Stock:</span> {product.stock > 0 ? product.stock + ' units' : 'Out of stock'}</p>
          </div>

          {product.description && <p className="text-gray-600 leading-relaxed">{product.description}</p>}

          <div className="flex items-center gap-4">
            <div className="flex items-center border border-border rounded-lg">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-gray-500 hover:text-primary-500 cursor-pointer">
                <Minus size={16} />
              </button>
              <span className="px-4 py-2 font-medium min-w-[40px] text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-gray-500 hover:text-primary-500 cursor-pointer">
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="lg" icon={<ShoppingCart size={18} />} onClick={handleAddToCart} className="flex-1">
              Add to Cart
            </Button>
            <Button variant="primary" size="lg" onClick={handleBuyNow} className="flex-1">
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <div className="bg-white rounded-xl border border-border p-6 h-fit">
            <div className="text-center mb-4">
              <span className="text-4xl font-bold text-gray-900">{product.rating}</span>
              <span className="text-gray-400 text-lg">/5</span>
              <div className="flex items-center justify-center gap-0.5 mt-1">{renderStars(product.rating)}</div>
              <p className="text-sm text-gray-500 mt-1">{product.reviewCount} reviews</p>
            </div>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const pct = star === 5 ? 65 : star === 4 ? 22 : star === 3 ? 8 : star === 2 ? 3 : 2;
                return (
                  <div key={star} className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600 w-8 shrink-0">{star} ★</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-gray-400 w-8 text-right text-xs">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {dummyReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl border border-border p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-sm font-bold text-primary-700 shrink-0">
                      {review.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 text-sm">{review.author}</span>
                        {review.verified && <Verified size={14} className="text-primary-500" />}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} size={12} className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3 leading-relaxed">{review.text}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                  <button className="flex items-center gap-1.5 hover:text-primary-500 transition-colors cursor-pointer">
                    <ThumbsUp size={14} />
                    Helpful ({review.helpful})
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-primary-500 transition-colors cursor-pointer">
                    <MessageSquare size={14} />
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-4">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {similar.map((p) => (
              <Card
                key={p.id}
                onClick={() => { navigate(`/product/${p.id}`); setQty(1); }}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer p-0"
              >
                <div className="aspect-square bg-gray-50">
                  <img src={p.image} alt={p.alt} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 space-y-1">
                  <h3 className="font-semibold text-sm text-gray-900">{p.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" /> {p.rating}
                  </div>
                  <span className="text-primary-500 font-bold">{formatPeso(p.price)}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
