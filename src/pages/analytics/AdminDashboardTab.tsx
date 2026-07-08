import { Users, ShoppingCart, DollarSign, Package } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import StatsCard from '../../components/ui/StatsCard';
import { formatPeso } from '../../lib/utils';

const platformStats = {
  totalUsers: 2847,
  totalOrders: 1253,
  totalRevenue: 489000,
  activeListings: 342,
};

const userRoles = [
  { role: 'Farmers', count: 1420, color: 'bg-emerald-500' },
  { role: 'Buyers', count: 980, color: 'bg-blue-500' },
  { role: 'Suppliers', count: 295, color: 'bg-purple-500' },
  { role: 'Admins', count: 12, color: 'bg-yellow-500' },
];

const recentMarketplaceActivity = [
  { id: 'ma1', user: 'Maria Santos', action: 'purchased', item: 'Organic Fertilizer', amount: 67.69, time: '2 hours ago' },
  { id: 'ma2', user: 'Juan dela Cruz', action: 'listed', item: 'Fresh Tomatoes (10kg)', amount: 450.00, time: '3 hours ago' },
  { id: 'ma3', user: 'Ana Gonzales', action: 'purchased', item: 'Vegetable Seeds Pack', amount: 45.00, time: '5 hours ago' },
  { id: 'ma4', user: 'Pedro Reyes', action: 'listed', item: 'Organic Fertilizer', amount: 670.00, time: '1 day ago' },
  { id: 'ma5', user: 'Lina Cruz', action: 'purchased', item: 'Drip Irrigation Kit', amount: 450.00, time: '1 day ago' },
];

const financialSummary = {
  monthlyRevenue: 124000,
  monthlyTransactions: 312,
  avgOrderValue: 397,
  topCategory: 'Fertilizers',
};

export default function AdminDashboardTab() {
  const maxRoleCount = Math.max(...userRoles.map((r) => r.count), 1);
  const revenueData = [
    { month: 'Jan', revenue: 95000 },
    { month: 'Feb', revenue: 108000 },
    { month: 'Mar', revenue: 124000 },
    { month: 'Apr', revenue: 112000 },
    { month: 'May', revenue: 98000 },
    { month: 'Jun', revenue: 87000 },
  ];
  const maxRevenue = Math.max(...revenueData.map((r) => r.revenue), 1);

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Users"
          value={platformStats.totalUsers.toLocaleString()}
          icon={<Users size={20} />}
        />
        <StatsCard
          title="Total Orders"
          value={platformStats.totalOrders.toLocaleString()}
          icon={<ShoppingCart size={20} />}
        />
        <StatsCard
          title="Total Revenue"
          value={formatPeso(platformStats.totalRevenue)}
          icon={<DollarSign size={20} />}
        />
        <StatsCard
          title="Active Listings"
          value={platformStats.activeListings}
          icon={<Package size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Users by Role</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userRoles.map((role) => (
                <div key={role.role}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700">{role.role}</span>
                    <span className="text-gray-500">{role.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div className={`${role.color} h-3 rounded-full transition-all`} style={{ width: `${(role.count / maxRoleCount) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Monthly Revenue Trend</h2>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-40">
              {revenueData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1 justify-end h-full">
                  <div className="w-full bg-emerald-500 rounded-t transition-all" style={{ height: `${(d.revenue / maxRevenue) * 100}%` }} />
                  <span className="text-[10px] text-gray-400">{d.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="text-gray-500">Max: {formatPeso(maxRevenue)}</span>
              <span className="text-gray-500">Current: {formatPeso(revenueData[revenueData.length - 1].revenue)}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Marketplace Activity</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentMarketplaceActivity.map((act) => (
                <div key={act.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">
                      <strong>{act.user}</strong> {act.action} <span className="text-emerald-600 font-medium">{act.item}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400">{act.time}</span>
                      <span className="text-xs text-gray-300">|</span>
                      <span className="text-xs text-emerald-600 font-medium">{formatPeso(act.amount)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Financial Summary</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Monthly Revenue</p>
                <p className="text-xl font-bold text-green-600">{formatPeso(financialSummary.monthlyRevenue)}</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Transactions</p>
                <p className="text-xl font-bold text-blue-600">{financialSummary.monthlyTransactions}</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Avg Order Value</p>
                <p className="text-xl font-bold text-purple-600">{formatPeso(financialSummary.avgOrderValue)}</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Top Category</p>
                <p className="text-xl font-bold text-yellow-600">{financialSummary.topCategory}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
