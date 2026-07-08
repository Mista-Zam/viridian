import { useState } from 'react';
import { RefreshCw, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { formatPeso, formatDate } from '../../lib/utils';
import type { Order, OrderStatus } from '../../types';
import PageHeader from '../../components/ui/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const demoOrders: Order[] = [
  {
    id: 'VRD-260501-014',
    userId: 'u1',
    items: [
      { title: 'Organic Fertilizer', qty: 2, price: 67.69 },
      { title: 'Vegetable Seeds Pack', qty: 1, price: 45.00 },
    ],
    total: 180.38,
    status: 'Out for delivery',
    courier: 'LBC Express',
    eta: 'Jul 4, 2026',
    createdAt: '2026-06-28',
    address: {
      fullName: 'Zaldy Mar Ybañez',
      phoneNumber: '09123456789',
      province: 'Laguna',
      city: 'Calamba',
      barangay: 'Barandal',
      postalCode: '4027',
      street: '123 Maharlika St',
      defaultAddress: true,
    },
    steps: [
      { label: 'Order Placed', time: 'Jun 28, 2026 10:30 AM', done: true },
      { label: 'Confirmed', time: 'Jun 28, 2026 02:15 PM', done: true },
      { label: 'Shipped', time: 'Jun 30, 2026 08:00 AM', done: true },
      { label: 'Out for delivery', time: 'Jul 2, 2026 06:00 AM', done: false },
      { label: 'Delivered', time: 'ETA Jul 4, 2026', done: false },
    ],
  },
  {
    id: 'VRD-260510-023',
    userId: 'u1',
    items: [
      { title: 'Garden Tool Set', qty: 1, price: 350.00 },
    ],
    total: 395.00,
    status: 'Delivered',
    courier: 'J&T Express',
    eta: 'Delivered',
    createdAt: '2026-05-10',
    address: {
      fullName: 'Zaldy Mar Ybañez',
      phoneNumber: '09123456789',
      province: 'Laguna',
      city: 'Calamba',
      barangay: 'Barandal',
      postalCode: '4027',
      street: '123 Maharlika St',
      defaultAddress: true,
    },
    steps: [
      { label: 'Order Placed', time: 'May 10, 2026 09:00 AM', done: true },
      { label: 'Confirmed', time: 'May 10, 2026 11:20 AM', done: true },
      { label: 'Shipped', time: 'May 12, 2026 07:30 AM', done: true },
      { label: 'Out for delivery', time: 'May 14, 2026 08:00 AM', done: true },
      { label: 'Delivered', time: 'May 14, 2026 03:45 PM', done: true },
    ],
  },
  {
    id: 'VRD-260520-045',
    userId: 'u1',
    status: 'Processing',
    items: [
      { title: 'Tomato Saplings', qty: 3, price: 120.00 },
      { title: 'Premium Soil Mix', qty: 1, price: 180.00 },
    ],
    total: 540.00,
    courier: 'LBC Express',
    eta: 'Jul 8, 2026',
    createdAt: '2026-06-30',
    address: {
      fullName: 'Zaldy Mar Ybañez',
      phoneNumber: '09123456789',
      province: 'Laguna',
      city: 'Calamba',
      barangay: 'Barandal',
      postalCode: '4027',
      street: '123 Maharlika St',
      defaultAddress: true,
    },
    steps: [
      { label: 'Order Placed', time: 'Jun 30, 2026 01:00 PM', done: true },
      { label: 'Confirmed', time: 'Jun 30, 2026 03:30 PM', done: true },
      { label: 'Shipped', time: 'Pending', done: false },
      { label: 'Out for delivery', time: 'Pending', done: false },
      { label: 'Delivered', time: 'Pending', done: false },
    ],
  },
  {
    id: 'VRD-260605-078',
    userId: 'u1',
    items: [
      { title: 'Soil pH Tester', qty: 1, price: 150.00 },
      { title: 'Organic Pesticide', qty: 2, price: 95.00 },
      { title: 'Coconut Coir Blocks', qty: 3, price: 65.00 },
    ],
    total: 535.00,
    status: 'Shipped',
    courier: 'J&T Express',
    eta: 'Jul 11, 2026',
    createdAt: '2026-07-04',
    address: {
      fullName: 'Zaldy Mar Ybañez',
      phoneNumber: '09123456789',
      province: 'Laguna',
      city: 'Calamba',
      barangay: 'Barandal',
      postalCode: '4027',
      street: '123 Maharlika St',
      defaultAddress: true,
    },
    steps: [
      { label: 'Order Placed', time: 'Jul 4, 2026 09:15 AM', done: true },
      { label: 'Confirmed', time: 'Jul 4, 2026 01:00 PM', done: true },
      { label: 'Shipped', time: 'Jul 6, 2026 10:30 AM', done: true },
      { label: 'Out for delivery', time: 'ETA Jul 10, 2026', done: false },
      { label: 'Delivered', time: 'Pending', done: false },
    ],
  },
  {
    id: 'VRD-260615-102',
    userId: 'u1',
    status: 'Cancelled',
    items: [
      { title: 'Greenhouse Film Roll', qty: 1, price: 420.00 },
    ],
    total: 420.00,
    courier: 'LBC Express',
    eta: 'Cancelled',
    createdAt: '2026-06-30',
    address: {
      fullName: 'Zaldy Mar Ybañez',
      phoneNumber: '09123456789',
      province: 'Laguna',
      city: 'Calamba',
      barangay: 'Barandal',
      postalCode: '4027',
      street: '123 Maharlika St',
      defaultAddress: true,
    },
    steps: [
      { label: 'Order Placed', time: 'Jun 30, 2026 05:00 PM', done: true },
      { label: 'Confirmed', time: 'Jun 30, 2026 06:30 PM', done: true },
      { label: 'Shipped', time: 'Pending', done: false },
      { label: 'Out for delivery', time: 'Pending', done: false },
      { label: 'Delivered', time: 'Pending', done: false },
    ],
  },
];

const statusIcon: Record<OrderStatus, typeof Package> = {
  Processing: Package,
  Shipped: Truck,
  'Out for delivery': Truck,
  Delivered: CheckCircle,
  Cancelled: XCircle,
};

const badgeVariant: Record<OrderStatus, 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'accent'> = {
  Processing: 'default',
  Shipped: 'warning',
  'Out for delivery': 'accent',
  Delivered: 'success',
  Cancelled: 'danger',
};

export default function OrdersPage() {
  const [orders] = useState(demoOrders);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <PageHeader
        title="Order Tracking"
        actions={
          <Button variant="ghost" icon={<RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />} onClick={handleRefresh}>
            Refresh
          </Button>
        }
      />

      <div className="space-y-6">
        {orders.map((order) => {
          const StatusIcon = statusIcon[order.status];
          return (
            <Card key={order.id}>
              <CardContent>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Order ID</p>
                    <p className="font-mono font-bold text-gray-900">{order.id}</p>
                  </div>
                  <Badge variant={badgeVariant[order.status]} size="md">
                    <StatusIcon size={14} /> {order.status}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.map((item, i) => (
                    <p key={i} className="text-sm text-gray-700">
                      {item.title} x{item.qty} — <span className="font-medium">{formatPeso(item.price * item.qty)}</span>
                    </p>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mb-4">
                  <div>
                    <p className="text-gray-400 text-xs">Courier</p>
                    <p className="font-medium text-gray-800">{order.courier}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">ETA</p>
                    <p className="font-medium text-gray-800">{order.eta}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Ordered</p>
                    <p className="font-medium text-gray-800">{formatDate(order.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Total</p>
                    <p className="font-bold text-primary-500">{formatPeso(order.total)}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="hidden sm:flex items-start justify-between">
                    {order.steps.map((step, i) => (
                      <div key={i} className="flex-1 text-center relative">
                        {i < order.steps.length - 1 && (
                          <div className={`absolute top-3 left-1/2 w-full h-0.5 ${step.done && order.steps[i + 1].done ? 'bg-primary-500' : 'bg-gray-200'}`} />
                        )}
                        <div className={`relative z-10 w-6 h-6 mx-auto rounded-full flex items-center justify-center ${
                          step.done ? 'bg-primary-500' : 'bg-gray-200'
                        }`}>
                          {step.done ? <CheckCircle size={14} className="text-white" /> : <div className="w-2 h-2 rounded-full bg-gray-400" />}
                        </div>
                        <p className={`text-xs mt-1 font-medium ${step.done ? 'text-primary-500' : 'text-gray-400'}`}>{step.label}</p>
                        <p className="text-[10px] text-gray-400 leading-tight">{step.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="sm:hidden space-y-3">
                    {order.steps.map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                          step.done ? 'bg-primary-500' : 'bg-gray-200'
                        }`}>
                          {step.done ? <CheckCircle size={16} className="text-white" /> : <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${step.done ? 'text-primary-500' : 'text-gray-400'}`}>{step.label}</p>
                          <p className="text-xs text-gray-400">{step.time}</p>
                        </div>
                        {i < order.steps.length - 1 && (
                          <div className={`w-0.5 h-6 ml-3.5 ${step.done && order.steps[i + 1].done ? 'bg-primary-500' : 'bg-gray-200'}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
