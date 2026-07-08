import { TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { financialRecords } from '../../data/farm';
import { formatPeso, formatDate } from '../../lib/utils';
import PageHeader from '../../components/ui/PageHeader';
import StatsCard from '../../components/ui/StatsCard';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';

const transactionColumns = [
  { key: 'date', header: 'Date', render: (item: Record<string, unknown>) => { const r = item as unknown as typeof financialRecords[0]; return <span className="text-sm text-gray-600">{formatDate(r.date)}</span>; } },
  { key: 'category', header: 'Category', render: (item: Record<string, unknown>) => { const r = item as unknown as typeof financialRecords[0]; return <Badge variant="default" size="sm">{r.category}</Badge>; } },
  { key: 'description', header: 'Description', render: (item: Record<string, unknown>) => { const r = item as unknown as typeof financialRecords[0]; return <span className="text-sm text-gray-800">{r.description}</span>; } },
  {
    key: 'amount', header: 'Amount',
    className: 'text-right',
    render: (item: Record<string, unknown>) => {
      const r = item as unknown as typeof financialRecords[0];
      return (
        <span className={`text-sm font-medium ${r.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
          {r.type === 'income' ? '+' : '-'}{formatPeso(r.amount)}
        </span>
      );
    },
  },
];

export default function FinancialTrackingPage() {
  const totalIncome = financialRecords.filter((r) => r.type === 'income').reduce((s, r) => s + r.amount, 0);
  const totalExpenses = financialRecords.filter((r) => r.type === 'expense').reduce((s, r) => s + r.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  const groupedByCategory = financialRecords.reduce<Record<string, { income: number; expense: number }>>((acc, r) => {
    if (!acc[r.category]) acc[r.category] = { income: 0, expense: 0 };
    acc[r.category][r.type] += r.amount;
    return acc;
  }, {});

  const categories = Object.entries(groupedByCategory);
  const maxAmount = Math.max(...categories.map(([, v]) => Math.max(v.income, v.expense)), 1);

  const sortedTransactions = [...financialRecords].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Financial Tracking"
        description="Monitor your farm income, expenses, and profitability"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatsCard
          title="Total Income"
          value={formatPeso(totalIncome)}
          icon={<TrendingUp size={18} className="text-green-600" />}
        />
        <StatsCard
          title="Total Expenses"
          value={formatPeso(totalExpenses)}
          icon={<TrendingDown size={18} className="text-red-600" />}
        />
        <StatsCard
          title="Net Profit / Loss"
          value={`${formatPeso(Math.abs(netProfit))} ${netProfit >= 0 ? 'profit' : 'loss'}`}
          icon={<PiggyBank size={18} className={netProfit >= 0 ? 'text-emerald-600' : 'text-red-600'} />}
        />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">Income vs Expenses by Category</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map(([category, { income, expense }]) => (
              <div key={category}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="font-medium text-gray-700">{category}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-green-600">{formatPeso(income)}</span>
                    <span className="text-red-600">{formatPeso(expense)}</span>
                  </div>
                </div>
                <div className="flex gap-0.5 h-6 rounded-lg overflow-hidden">
                  <div
                    className="bg-green-400 transition-all"
                    style={{ width: `${(income / maxAmount) * 100}%` }}
                  />
                  <div
                    className="bg-red-400 transition-all"
                    style={{ width: `${(expense / maxAmount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">Transaction History</h2>
        </CardHeader>
        <CardContent>
          <Table columns={transactionColumns} data={sortedTransactions as unknown as Record<string, unknown>[]} />
        </CardContent>
      </Card>
    </div>
  );
}
