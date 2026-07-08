import { Sprout, BarChart3, DollarSign, Activity, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import StatsCard from '../../components/ui/StatsCard';
import Table from '../../components/ui/Table';
import { cropRecords, activityLogs, financialRecords } from '../../data/farm';
import { formatPeso, formatDate } from '../../lib/utils';

export default function FarmerDashboardTab() {
  const totalCrops = cropRecords.length;
  const totalHarvest = cropRecords.filter((c) => c.status === 'harvested').reduce((s, c) => s + (c.actualYield || 0), 0);
  const avgYield = totalCrops > 0 ? totalHarvest / totalCrops : 0;

  const totalIncome = financialRecords.filter((r) => r.type === 'income').reduce((s, r) => s + r.amount, 0);
  const totalExpenses = financialRecords.filter((r) => r.type === 'expense').reduce((s, r) => s + r.amount, 0);
  const profit = totalIncome - totalExpenses;
  const profitMargin = totalIncome > 0 ? (profit / totalIncome) * 100 : 0;

  const seasonData = [
    { season: 'Dry Season', yield: cropRecords.filter((c) => c.status === 'harvested' || c.status === 'growing').reduce((s, c) => s + (c.actualYield || c.expectedYield), 0), color: 'bg-yellow-400' },
    { season: 'Wet Season', yield: cropRecords.filter((c) => c.status === 'planned').reduce((s, c) => s + c.expectedYield, 0), color: 'bg-blue-400' },
  ];
  const maxYield = Math.max(...seasonData.map((s) => s.yield), 1);

  const recentActivities = [...activityLogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Crops"
          value={totalCrops}
          icon={<Sprout size={20} />}
        />
        <StatsCard
          title="Total Harvest"
          value={`${totalHarvest.toLocaleString()} kg`}
          icon={<BarChart3 size={20} />}
        />
        <StatsCard
          title="Avg Yield"
          value={`${avgYield.toFixed(0)} kg`}
          icon={<TrendingUp size={20} />}
        />
        <StatsCard
          title="Net Profit"
          value={formatPeso(Math.abs(profit))}
          icon={<DollarSign size={20} />}
          description={profit >= 0 ? 'Profitable' : 'Loss'}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Crop Yield by Season</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {seasonData.map((s) => (
                <div key={s.season}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700">{s.season}</span>
                    <span className="text-gray-500">{s.yield.toLocaleString()} kg</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div className={`${s.color} h-4 rounded-full transition-all`} style={{ width: `${(s.yield / maxYield) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">Profitability Summary</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-600" />
                  <span className="text-sm text-gray-700">Total Income</span>
                </div>
                <span className="font-semibold text-green-600">{formatPeso(totalIncome)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-red-600" />
                  <span className="text-sm text-gray-700">Total Expenses</span>
                </div>
                <span className="font-semibold text-red-600">{formatPeso(totalExpenses)}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <DollarSign size={16} className="text-emerald-600" />
                  <span className="text-sm text-gray-700">Profit Margin</span>
                </div>
                <span className={`font-semibold ${profit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {profitMargin.toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
        </CardHeader>
        <Table
          columns={[
            { key: 'description', header: 'Activity', render: (item: Record<string, unknown>) => {
              const a = item as unknown as typeof activityLogs[0];
              return (
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                    <Activity size={16} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">{a.description}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(a.date)}</p>
                  </div>
                </div>
              );
            }},
            { key: 'cost', header: 'Cost', className: 'text-right', render: (item: Record<string, unknown>) => {
              const a = item as unknown as typeof activityLogs[0];
              return <span className="text-sm font-medium text-gray-600">{formatPeso(a.cost)}</span>;
            }},
          ]}
          data={recentActivities as unknown as Record<string, unknown>[]}
        />
      </Card>
    </div>
  );
}
