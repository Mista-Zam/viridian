import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Truck, PackageCheck } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { formatPeso } from '../../lib/utils';
import PageHeader from '../../components/ui/PageHeader';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const getSelectedItems = useCartStore((s) => s.getSelectedItems);
  const getTotal = useCartStore((s) => s.getTotal);
  const getShipping = useCartStore((s) => s.getShipping);
  const getGrandTotal = useCartStore((s) => s.getGrandTotal);
  const deliveryMethod = useCartStore((s) => s.deliveryMethod);
  const setDeliveryMethod = useCartStore((s) => s.setDeliveryMethod);
  const setAddress = useCartStore((s) => s.setAddress);
  const clearChecked = useCartStore((s) => s.clearChecked);

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [barangay, setBarangay] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [placing, setPlacing] = useState(false);

  const selectedItems = getSelectedItems();
  const total = getTotal();
  const shipping = getShipping();
  const grandTotal = getGrandTotal();

  if (selectedItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = () => {
    setPlacing(true);
    setAddress({
      fullName,
      phoneNumber,
      province,
      city,
      barangay,
      postalCode,
      street,
      defaultAddress: true,
    });
    setTimeout(() => {
      clearChecked();
      navigate('/checkout/success');
    }, 1000);
  };

  const canSubmit = fullName && phoneNumber && province && city && barangay && street && postalCode;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PageHeader title="Checkout" />

      <div className="grid lg:grid-cols-[1fr_400px] gap-6 mt-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-primary-500" />
                <h2 className="text-lg font-semibold text-gray-900">Shipping Address</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                <Input label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                <Input label="Province" value={province} onChange={(e) => setProvince(e.target.value)} required />
                <Input label="City/Municipality" value={city} onChange={(e) => setCity(e.target.value)} required />
                <Input label="Barangay" value={barangay} onChange={(e) => setBarangay(e.target.value)} required />
                <Input label="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                <Input label="Street Address" value={street} onChange={(e) => setStreet(e.target.value)} className="sm:col-span-2" required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-primary-500" />
                <h2 className="text-lg font-semibold text-gray-900">Delivery Method</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${deliveryMethod === 'standard' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}>
                  <input type="radio" name="delivery" value="standard" checked={deliveryMethod === 'standard'} onChange={() => setDeliveryMethod('standard')} className="sr-only" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Standard Delivery</p>
                    <p className="text-xs text-gray-500">3-5 business days</p>
                  </div>
                  <span className="font-semibold text-gray-900">{formatPeso(45)}</span>
                </label>
                <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${deliveryMethod === 'express' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'}`}>
                  <input type="radio" name="delivery" value="express" checked={deliveryMethod === 'express'} onChange={() => setDeliveryMethod('express')} className="sr-only" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Express Delivery</p>
                    <p className="text-xs text-gray-500">1-2 business days</p>
                  </div>
                  <span className="font-semibold text-gray-900">{formatPeso(90)}</span>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:sticky lg:top-24 self-start">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <PackageCheck size={18} className="text-primary-500" />
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {selectedItems.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                      <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                      <p className="text-sm font-semibold text-gray-900">{formatPeso(item.price * item.qty)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">{formatPeso(total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping ({deliveryMethod === 'express' ? 'Express' : 'Standard'})</span>
                  <span className="font-medium text-gray-900">{formatPeso(shipping)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span className="text-primary-500">{formatPeso(grandTotal)}</span>
                </div>
              </div>
              <Button className="w-full mt-5" size="lg" disabled={!canSubmit || placing} onClick={handlePlaceOrder}>
                {placing ? 'Placing Order...' : 'Place Order'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
