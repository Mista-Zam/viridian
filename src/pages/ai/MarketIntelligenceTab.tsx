import { TrendingUp, TrendingDown, Minus, Package, BarChart3 } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import StatsCard from '../../components/ui/StatsCard';
import Badge from '../../components/ui/Badge';
import Table from '../../components/ui/Table';
import { marketTrends } from '../../data/ai';
import { formatPeso } from '../../lib/utils';

const trendIcons: Record<string, { icon: typeof TrendingUp; color: string; bg: string }> = {
  up: { icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
  down: { icon: TrendingDown, color: 'text-red-600', bg: 'bg-red-100' },
  stable: { icon: Minus, color: 'text-gray-600', bg: 'bg-gray-100' },
};

const demandVariants: Record<string, 'success' | 'primary' | 'warning' | 'default'> = {
  'High': 'success',
  'Very High': 'primary',
  'Moderate': 'warning',
  'Stable': 'default',
};

export default function MarketIntelligenceTab() {
  const avgPrice = marketTrends.reduce((s, t) => s + t.currentPrice, 0) / marketTrends.length;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatsCard
          title="Tracked Products"
          value={marketTrends.length}
          icon={<Package size={20} />}
          description="Crops in market watch"
        />
        <StatsCard
          title="Rising Prices"
          value={marketTrends.filter((t) => t.trend === 'up').length}
          icon={<TrendingUp size={20} />}
          description="Products with price increase"
        />
        <StatsCard
          title="Avg Price"
          value={formatPeso(avgPrice)}
          icon={<BarChart3 size={20} />}
          description="Per kg across products"
        />
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">Price Trends</h2>
        </CardHeader>
        <Table
          columns={[
            { key: 'product', header: 'Product', render: (item: Record<string, unknown>) => {
              const row = item as unknown as typeof marketTrends[0];
              return (
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Package size={16} className="text-emerald-600" />
                  </div>
                  <span className="font-medium text-gray-800">{row.product}</span>
                </div>
              );
            }},
            { key: 'currentPrice', header: 'Current Price', render: (item: Record<string, unknown>) => {
              const row = item as unknown as typeof marketTrends[0];
              return <span className="font-medium text-gray-800">{formatPeso(row.currentPrice)}<span className="text-xs text-gray-400">/kg</span></span>;
            }},
            { key: 'trend', header: 'Trend', render: (item: Record<string, unknown>) => {
              const row = item as unknown as typeof marketTrends[0];
              const tc = trendIcons[row.trend] || trendIcons.stable;
              const Icon = tc.icon;
              return (
                <div className={`w-8 h-8 rounded-lg ${tc.bg} flex items-center justify-center`}>
                  <Icon size={16} className={tc.color} />
                </div>
              );
            }},
            { key: 'change', header: 'Change', render: (item: Record<string, unknown>) => {
              const row = item as unknown as typeof marketTrends[0];
              return (
                <span className={`text-sm font-medium ${row.trend === 'up' ? 'text-green-600' : row.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                  {row.trend === 'up' ? '+' : row.trend === 'down' ? '-' : ''}{row.change}%
                </span>
              );
            }},
            { key: 'demand', header: 'Demand', render: (item: Record<string, unknown>) => {
              const row = item as unknown as typeof marketTrends[0];
              return (
                <Badge variant={demandVariants[row.demand] || 'default'} size="sm">
                  {row.demand}
                </Badge>
              );
            }},
          ]}
          data={marketTrends}
        />
      </Card>
    </div>
  );
}
