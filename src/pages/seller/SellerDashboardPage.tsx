import { useState } from 'react';
import { Star, ShoppingBag, Users, TrendingUp, PackageSearch, DollarSign, AlertTriangle } from 'lucide-react';
import { formatPeso, formatDate } from '../../lib/utils';
import Avatar from '../../components/ui/Avatar';
import StatsCard from '../../components/ui/StatsCard';
import Card, { CardContent } from '../../components/ui/Card';
import Tabs from '../../components/ui/Tabs';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';

interface ProductRow {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  status: 'active' | 'low' | 'out';
}

interface SalesRow {
  month: string;
  orders: number;
  revenue: number;
  items: number;
}

interface OrderFulfillment {
  id: string;
  customer: string;
  items: string;
  total: number;
  status: 'pending' | 'packing' | 'shipped' | 'delivered';
  date: string;
}

const storeInfo = {
  name: 'Green Farm Supplies',
  rating: 4.6,
  totalSales: 1520,
  joined: '2024-03-15',
  verified: true,
};

const products: ProductRow[] = [
  { id: 'p1', name: 'Organic Fertilizer', category: 'Fertilizers', price: 67.69, stock: 42, sold: 128, status: 'active' },
  { id: 'p2', name: 'Vegetable Seeds Pack', category: 'Seeds', price: 45.00, stock: 65, sold: 95, status: 'active' },
  { id: 'p5', name: 'Tomato Saplings', category: 'Saplings', price: 120.00, stock: 50, sold: 78, status: 'active' },
  { id: 'p7', name: 'Herb Seeds Collection', category: 'Seeds', price: 75.00, stock: 0, sold: 64, status: 'out' },
  { id: 'p13', name: 'Liquid Fertilizer', category: 'Fertilizers', price: 89.00, stock: 3, sold: 42, status: 'low' },
];

const monthlySales: SalesRow[] = [
  { month: 'Jan', orders: 45, revenue: 12450.00, items: 78 },
  { month: 'Feb', orders: 82, revenue: 21300.00, items: 134 },
  { month: 'Mar', orders: 61, revenue: 18750.00, items: 112 },
  { month: 'Apr', orders: 93, revenue: 25600.00, items: 167 },
  { month: 'May', orders: 78, revenue: 22100.00, items: 145 },
  { month: 'Jun', orders: 110, revenue: 32400.00, items: 198 },
];

const orders: OrderFulfillment[] = [
  { id: 'VRD-260628-001', customer: 'Maria Santos', items: 'Organic Fertilizer x2', total: 135.38, status: 'pending', date: '2026-06-28' },
  { id: 'VRD-260628-002', customer: 'Juan Dela Cruz', items: 'Tomato Saplings x5', total: 600.00, status: 'packing', date: '2026-06-28' },
  { id: 'VRD-260627-003', customer: 'Ana Gonzales', items: 'Vegetable Seeds Pack x3', total: 135.00, status: 'shipped', date: '2026-06-27' },
  { id: 'VRD-260626-004', customer: 'Pedro Reyes', items: 'Herb Seeds Collection x1', total: 75.00, status: 'delivered', date: '2026-06-26' },
];

const statusBadgeVariant: Record<string, 'warning' | 'primary' | 'accent' | 'success'> = {
  pending: 'warning',
  packing: 'primary',
  shipped: 'accent',
  delivered: 'success',
};

const stockBadgeVariant: Record<string, 'success' | 'danger' | 'default'> = {
  active: 'success',
  low: 'danger',
  out: 'default',
};

const restockAlerts = [
  { name: 'Herb Seeds Collection', stock: 0, threshold: 10 },
  { name: 'Liquid Fertilizer', stock: 3, threshold: 15 },
];

const tabItems = [
  { id: 'products', label: 'Product Management' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'sales', label: 'Sales Dashboard' },
  { id: 'orders', label: 'Order Fulfillment' },
];

const productColumns = [
  { key: 'name', header: 'Product', render: (item: Record<string, unknown>) => { const p = item as unknown as ProductRow; return <span className="font-medium text-gray-900">{p.name}</span>; } },
  { key: 'category', header: 'Category', render: (item: Record<string, unknown>) => { const p = item as unknown as ProductRow; return <span className="text-gray-500">{p.category}</span>; } },
  { key: 'price', header: 'Price', render: (item: Record<string, unknown>) => { const p = item as unknown as ProductRow; return <span className="text-gray-900">{formatPeso(p.price)}</span>; } },
  { key: 'stock', header: 'Stock', render: (item: Record<string, unknown>) => { const p = item as unknown as ProductRow; return <span>{p.stock}</span>; } },
  { key: 'sold', header: 'Sold', render: (item: Record<string, unknown>) => { const p = item as unknown as ProductRow; return <span>{p.sold}</span>; } },
  {
    key: 'status', header: 'Status',
    render: (item: Record<string, unknown>) => { const p = item as unknown as ProductRow; return <Badge variant={stockBadgeVariant[p.status]} size="sm">{p.status}</Badge>; },
  },
];

const inventoryColumns = [
  { key: 'name', header: 'Product', render: (item: Record<string, unknown>) => { const p = item as unknown as ProductRow; return <span className="font-medium text-gray-900">{p.name}</span>; } },
  {
    key: 'stock', header: 'Stock',
    render: (item: Record<string, unknown>) => {
      const p = item as unknown as ProductRow;
      return (
        <div className="flex items-center gap-3">
          <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${p.stock > 20 ? 'bg-emerald-500' : p.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${Math.min(100, p.stock)}%` }} />
          </div>
          <span className="text-gray-700">{p.stock}</span>
        </div>
      );
    },
  },
  {
    key: 'status', header: 'Status',
    render: (item: Record<string, unknown>) => { const p = item as unknown as ProductRow; return <Badge variant={stockBadgeVariant[p.status]} size="sm">{p.status}</Badge>; },
  },
];

const salesColumns = [
  { key: 'month', header: 'Month', render: (item: Record<string, unknown>) => { const r = item as unknown as SalesRow; return <span className="font-medium text-gray-900">{r.month}</span>; } },
  { key: 'orders', header: 'Orders' },
  { key: 'items', header: 'Items' },
  { key: 'revenue', header: 'Revenue', render: (item: Record<string, unknown>) => { const r = item as unknown as SalesRow; return <span className="text-emerald-700 font-semibold">{formatPeso(r.revenue)}</span>; } },
  { key: 'avg', header: 'Avg. Order', render: (item: Record<string, unknown>) => { const r = item as unknown as SalesRow; return <span>{formatPeso(r.revenue / r.orders)}</span>; } },
];

export default function SellerDashboardPage() {
  const [tab, setTab] = useState<string>('products');

  const revenueTotal = monthlySales.reduce((s, r) => s + r.revenue, 0);
  const orderCount = monthlySales.reduce((s, r) => s + r.orders, 0);
  const itemCount = monthlySales.reduce((s, r) => s + r.items, 0);
  const avgOrder = orderCount > 0 ? revenueTotal / orderCount : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Card>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar name={storeInfo.name} size="xl" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-gray-900">{storeInfo.name}</h1>
                {storeInfo.verified && (
                  <Badge variant="success" size="sm">Verified</Badge>
                )}
              </div>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500 fill-yellow-500" /> {storeInfo.rating}</span>
                <span className="flex items-center gap-1"><ShoppingBag size={14} /> {storeInfo.totalSales} sales</span>
                <span className="flex items-center gap-1"><Users size={14} /> Since {formatDate(storeInfo.joined)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Revenue" value={formatPeso(revenueTotal)} icon={<DollarSign size={18} />} />
        <StatsCard title="Total Orders" value={orderCount} icon={<ShoppingBag size={18} />} />
        <StatsCard title="Items Sold" value={itemCount} icon={<PackageSearch size={18} />} />
        <StatsCard title="Avg. Order Value" value={formatPeso(avgOrder)} icon={<TrendingUp size={18} />} />
      </div>

      <Card>
        <Tabs tabs={tabItems} activeTab={tab} onChange={setTab} />
        <CardContent>
          {tab === 'products' && (
            <Table columns={productColumns} data={products as unknown as Record<string, unknown>[]} />
          )}

          {tab === 'inventory' && (
            <div className="space-y-4">
              <Table columns={inventoryColumns} data={products as unknown as Record<string, unknown>[]} />
              {restockAlerts.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-red-800 mb-2">
                    <AlertTriangle size={16} /> Restock Alerts
                  </h4>
                  {restockAlerts.map((a) => (
                    <p key={a.name} className="text-sm text-red-700">
                      {a.name} — Stock: {a.stock} / Threshold: {a.threshold}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === 'sales' && (
            <Table columns={salesColumns} data={monthlySales as unknown as Record<string, unknown>[]} />
          )}

          {tab === 'orders' && (
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs text-gray-400">{o.id}</p>
                    <p className="font-medium text-gray-900 text-sm">{o.customer}</p>
                    <p className="text-xs text-gray-500">{o.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatPeso(o.total)}</p>
                    <Badge variant={statusBadgeVariant[o.status]} size="sm" className="mt-1">{o.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
