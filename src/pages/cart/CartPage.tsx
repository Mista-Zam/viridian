import { useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { formatPeso } from '../../lib/utils';
import PageHeader from '../../components/ui/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';

export default function CartPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQty = useCartStore((s) => s.updateQty);
  const toggleCheck = useCartStore((s) => s.toggleCheck);
  const toggleAll = useCartStore((s) => s.toggleAll);
  const getTotal = useCartStore((s) => s.getTotal);
  const getShipping = useCartStore((s) => s.getShipping);
  const getGrandTotal = useCartStore((s) => s.getGrandTotal);
  const getSelectedItems = useCartStore((s) => s.getSelectedItems);

  const allChecked = items.length > 0 && items.every((i) => i.checked);

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <PageHeader title="Shopping Cart" />
        <EmptyState
          icon={<ShoppingBag size={48} />}
          title="Your cart is empty"
          description="Browse products and add items to your cart"
          action={{ label: 'Continue Shopping', onClick: () => navigate('/marketplace') }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PageHeader title="Shopping Cart" />

      <div className="grid lg:grid-cols-[1fr_360px] gap-6 mt-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 px-1">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={() => toggleAll(!allChecked)}
                className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              Select All ({items.length} items)
            </label>
          </div>

          {items.map((item) => (
            <Card key={item.productId}>
              <CardContent>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleCheck(item.productId)}
                      className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                  </label>
                  <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{item.sellerName}</p>
                    <p className="text-primary-500 font-bold mt-1">{formatPeso(item.price)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() => updateQty(item.productId, item.qty - 1)}
                        className="px-2 py-1 text-gray-500 hover:text-primary-500 cursor-pointer"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 py-1 text-sm font-medium min-w-[28px] text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.productId, item.qty + 1)}
                        className="px-2 py-1 text-gray-500 hover:text-primary-500 cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:sticky lg:top-24 self-start">
          <Card>
            <CardContent>
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({getSelectedItems().length} items)</span>
                  <span className="font-medium text-gray-900">{formatPeso(getTotal())}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900">{formatPeso(getShipping())}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-primary-500">{formatPeso(getGrandTotal())}</span>
                </div>
              </div>
              <Button
                className="w-full mt-5"
                size="lg"
                disabled={getSelectedItems().length === 0}
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout ({getSelectedItems().length})
              </Button>
              <Button
                variant="ghost"
                className="w-full mt-2"
                size="sm"
                icon={<ArrowLeft size={16} />}
                onClick={() => navigate('/marketplace')}
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
