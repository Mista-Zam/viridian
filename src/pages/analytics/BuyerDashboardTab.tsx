import { ShoppingBag, DollarSign, Star, Repeat, Tag } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import StatsCard from '../../components/ui/StatsCard';
import Table from '../../components/ui/Table';
import { formatPeso } from '../../lib/utils';

const purchaseHistory = [
  { id: 'ph1', date: '2026-04-05', items: 3, total: 1567.69, category: 'Fertilizers' },
  { id: 'ph2', date: '2026-03-28', items: 2, total: 540.00, category: 'Seeds' },
  { id: 'ph3', date: '2026-03-15', items: 1, total: 350.00, category: 'Tools' },
  { id: 'ph4', date: '2026-03-01', items: 5, total: 2120.00, category: 'Crop Protection' },
  { id: 'ph5', date: '2026-02-20', items: 2, total: 900.00, category: 'Saplings' },
];

const spendingByCategory = [
  { category: 'Fertilizers', amount: 1567.69, color: 'bg-green-500' },
  { category: 'Seeds', amount: 540.00, color: 'bg-yellow-500' },
  { category: 'Tools', amount: 350.00, color: 'bg-blue-500' },
  { category: 'Crop Protection', amount: 2120.00, color: 'bg-red-500' },
  { category: 'Saplings', amount: 900.00, color: 'bg-purple-500' },
];

const favoriteProducts = [
  { name: 'Organic Fertilizer', bought: 4, rating: 4.5 },
  { name: 'Vegetable Seeds Pack', bought: 3, rating: 4.3 },
  { name: 'Neem Oil Spray', bought: 2, rating: 4.3 },
];

export default function BuyerDashboardTab() {
  const totalSpent = purchaseHistory.reduce((s, p) => s + p.total, 0);
  const totalOrders = purchaseHistory.length;
  const totalItems = purchaseHistory.reduce((s, p) => s + p.items, 0);

  const totalByCategory = spendingByCategory.reduce((s, c) => s + c.amount, 0);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatsCard
          title="Total Orders"
          value={totalOrders}
          icon={<ShoppingBag size={20} />}
        />
        <StatsCard
          title="Total Spent"
          value={formatPeso(totalSpent)}
          icon={<DollarSign size={20} />}
        />
        <StatsCard
          title="Total Items"
          value={totalItems}
          icon={<Tag size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Spending by Category</h2>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-44 h-44">
                {spendingByCategory.map((item, i) => {
                  const pct = (item.amount / totalByCategory) * 100;
                  const rotation = spendingByCategory.slice(0, i).reduce((s, c) => s + (c.amount / totalByCategory) * 360, 0);
                  const angle = (pct / 100) * 360;
                  const midAngle = rotation + angle / 2;
                  const showLabel = pct > 8;
                  return (
                    <div key={item.category} className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="rounded-full"
                        style={{
                          background: `conic-gradient(from ${rotation}deg, ${item.color.replace('bg-', '').replace('green', '#22c55e').replace('yellow', '#eab308').replace('blue', '#3b82f6').replace('red', '#ef4444').replace('purple', '#a855f7')} 0deg ${angle}deg, transparent ${angle}deg)`,
                          width: '100%',
                          height: '100%',
                        }}
                      />
                      {showLabel && (
                        <div
                          className="absolute text-[10px] font-medium text-white pointer-events-none"
                          style={{
                            transform: `rotate(${midAngle}deg) translateY(-56px)`,
                            transformOrigin: 'center center',
                          }}
                        >
                          {pct.toFixed(0)}%
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                  <DollarSign size={24} className="text-emerald-600" />
                </div>
              </div>
            </div>
            <div className="space-y-2 mt-2">
              {spendingByCategory.map((item) => (
                <div key={item.category} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-gray-600">{item.category}</span>
                  </div>
                  <span className="font-medium text-gray-700">{formatPeso(item.amount)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Favorite Products</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {favoriteProducts.map((prod, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <Star size={18} className="text-yellow-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm">{prod.name}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Repeat size={12} />
                        Bought {prod.bought}x
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={12} />
                        {prod.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">Purchase History</h2>
        </CardHeader>
        <Table
          columns={[
            { key: 'date', header: 'Date', render: (item: Record<string, unknown>) => {
              const p = item as typeof purchaseHistory[0];
              return <span className="text-sm text-gray-600">{new Date(p.date).toLocaleDateString('en-PH', { month: 'short', day: '2-digit', year: 'numeric' })}</span>;
            }},
            { key: 'category', header: 'Category', render: (item: Record<string, unknown>) => {
              const p = item as typeof purchaseHistory[0];
              return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{p.category}</span>;
            }},
            { key: 'items', header: 'Items' },
            { key: 'total', header: 'Total', className: 'text-right', render: (item: Record<string, unknown>) => {
              const p = item as typeof purchaseHistory[0];
              return <span className="text-sm font-medium text-emerald-600">{formatPeso(p.total)}</span>;
            }},
          ]}
          data={purchaseHistory as unknown as Record<string, unknown>[]}
        />
      </Card>
    </div>
  );
}
