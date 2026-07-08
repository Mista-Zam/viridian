import { useState } from 'react';
import { Droplets, Sprout, Bug, Tractor, Scissors, MoreHorizontal, Calendar, DollarSign } from 'lucide-react';
import { activityLogs } from '../../data/farm';
import { formatDate, formatPeso } from '../../lib/utils';
import PageHeader from '../../components/ui/PageHeader';
import Card, { CardContent } from '../../components/ui/Card';

type ActivityType = 'all' | 'fertilizer' | 'irrigation' | 'pest_control' | 'planting' | 'harvesting';

const filters: { key: ActivityType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'fertilizer', label: 'Fertilizer' },
  { key: 'irrigation', label: 'Irrigation' },
  { key: 'pest_control', label: 'Pest Control' },
  { key: 'planting', label: 'Planting' },
  { key: 'harvesting', label: 'Harvesting' },
];

const typeIcons: Record<string, { icon: typeof Sprout; color: string; bg: string }> = {
  fertilizer: { icon: Droplets, color: 'text-green-600', bg: 'bg-green-100' },
  irrigation: { icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-100' },
  pest_control: { icon: Bug, color: 'text-red-600', bg: 'bg-red-100' },
  planting: { icon: Sprout, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  harvesting: { icon: Scissors, color: 'text-yellow-600', bg: 'bg-yellow-100' },
};

export default function ActivityLogsPage() {
  const [activeFilter, setActiveFilter] = useState<ActivityType>('all');

  const filtered = activeFilter === 'all'
    ? activityLogs
    : activityLogs.filter((a) => a.type === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Activity Logs"
        description="Track all farm activities and their costs"
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === f.key
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-gray-600 border border-border hover:border-emerald-300 hover:text-emerald-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((activity) => {
          const iconConfig = typeIcons[activity.type] || { icon: MoreHorizontal, color: 'text-gray-600', bg: 'bg-gray-100' };
          const Icon = iconConfig.icon;
          return (
            <Card key={activity.id}>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg ${iconConfig.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={20} className={iconConfig.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800">{activity.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} />
                        {formatDate(activity.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign size={13} />
                        {formatPeso(activity.cost)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Tractor size={48} className="mx-auto mb-3 opacity-50" />
          <p>No activities found for this filter</p>
        </div>
      )}
    </div>
  );
}
