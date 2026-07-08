import { useNavigate } from 'react-router-dom';
import { CheckCircle, Package, ShoppingBag } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function CheckoutSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <Card className="text-center max-w-md p-10">
        <div className="w-20 h-20 mx-auto bg-primary-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-primary-500" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-500 mb-2">
          Thank you for your order. You will receive a confirmation email shortly with your order details and tracking information.
        </p>
        <p className="text-sm text-gray-400 mb-8">
          Your products are being prepared and will be shipped soon.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => navigate('/orders')} icon={<Package size={18} />}>
            View Orders
          </Button>
          <Button variant="outline" onClick={() => navigate('/marketplace')} icon={<ShoppingBag size={18} />}>
            Continue Shopping
          </Button>
        </div>
      </Card>
    </div>
  );
}
