import { Link } from 'react-router-dom';
import { Sprout, ListTodo, DollarSign, TrendingUp, Calendar, Activity, ArrowRight, Tractor, Warehouse } from 'lucide-react';
import { demoFarm, cropRecords, activityLogs, financialRecords } from '../../data/farm';
import { formatPeso, formatDate } from '../../lib/utils';
import StatsCard from '../../components/ui/StatsCard';
import Card, { CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const statusBadgeVariant: Record<string, 'primary' | 'success' | 'warning'> = {
  growing: 'primary',
  harvested: 'success',
  planned: 'warning',
};

export default function FarmDashboardPage() {
  const activeCrops = cropRecords.filter((c) => c.status === 'growing').length;
  const pendingTasks = activityLogs.filter((a) => new Date(a.date) > new Date()).length;
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const monthlyExpenses = financialRecords
    .filter((r) => r.type === 'expense' && new Date(r.date).getMonth() === currentMonth && new Date(r.date).getFullYear() === currentYear)
    .reduce((s, r) => s + r.amount, 0);
  const totalIncome = financialRecords
    .filter((r) => r.type === 'income')
    .reduce((s, r) => s + r.amount, 0);

  const subPages = [
    { to: '/farm/crops', label: 'Crop Management', icon: Sprout, color: 'bg-green-500' },
    { to: '/farm/activities', label: 'Activity Logs', icon: Activity, color: 'bg-blue-500' },
    { to: '/farm/finances', label: 'Financial Tracking', icon: DollarSign, color: 'bg-yellow-500' },
    { to: '/farm/inventory', label: 'Farm Inventory', icon: Warehouse, color: 'bg-purple-500' },
  ];

  const sortedCrops = [...cropRecords].sort((a, b) => new Date(a.plantedDate).getTime() - new Date(b.plantedDate).getTime());

  const recentActivities = [...activityLogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="mb-8 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-700 to-emerald-500 p-6 sm:p-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{demoFarm.name}</h1>
              <p className="text-emerald-100 mt-1">{demoFarm.location}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="primary" size="md" className="bg-white/20 text-white">{demoFarm.size} ha</Badge>
                <Badge variant="primary" size="md" className="bg-white/20 text-white">{demoFarm.soilType} Soil</Badge>
                {demoFarm.cropHistory.map((crop) => (
                  <Badge key={crop} variant="primary" size="md" className="bg-white/20 text-white">{crop}</Badge>
                ))}
              </div>
            </div>
            <Tractor size={48} className="text-emerald-200 hidden sm:block" />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard title="Active Crops" value={activeCrops} icon={<Sprout size={18} className="text-green-500" />} />
        <StatsCard title="Pending Tasks" value={pendingTasks} icon={<ListTodo size={18} className="text-blue-500" />} />
        <StatsCard title="Expenses This Month" value={formatPeso(monthlyExpenses)} icon={<DollarSign size={18} className="text-red-500" />} />
        <StatsCard title="Total Income" value={formatPeso(totalIncome)} icon={<TrendingUp size={18} className="text-emerald-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Calendar size={20} className="text-emerald-600" />
                  Crop Calendar
                </h2>
                <Link to="/farm/crops" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
                  View All <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-3">
                {sortedCrops.map((crop) => (
                  <div key={crop.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Sprout size={20} className="text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800">{crop.cropName}</p>
                      <p className="text-sm text-gray-500">{formatDate(crop.plantedDate)} - {formatDate(crop.harvestDate)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">{crop.area} ha</span>
                      <Badge variant={statusBadgeVariant[crop.status]} size="sm">
                        {crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Activity size={20} className="text-emerald-600" />
                  Recent Activity
                </h2>
                <Link to="/farm/activities" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
                  View All <ArrowRight size={14} />
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivities.map((act) => (
                  <div key={act.id} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700">{act.description}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-400">{formatDate(act.date)}</span>
                        <span className="text-xs text-gray-300">|</span>
                        <span className="text-xs text-gray-400">{formatPeso(act.cost)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {subPages.map((page) => (
          <Link
            key={page.to}
            to={page.to}
            className="bg-white rounded-xl border border-border shadow-card p-5 hover:shadow-md hover:border-emerald-200 transition-all group"
          >
            <div className={`w-11 h-11 rounded-lg ${page.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <page.icon size={22} className="text-white" />
            </div>
            <p className="font-medium text-gray-800">{page.label}</p>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-0.5">
              Manage <ArrowRight size={10} />
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
