import { useState } from 'react';
import { Package, FlaskRound, Wrench, Beaker, Box } from 'lucide-react';
import { farmInventoryItems } from '../../data/farm';
import { formatPeso } from '../../lib/utils';
import PageHeader from '../../components/ui/PageHeader';
import Tabs from '../../components/ui/Tabs';
import Card, { CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'seeds', label: 'Seeds' },
  { id: 'fertilizers', label: 'Fertilizers' },
  { id: 'equipment', label: 'Equipment' },
  { id: 'chemicals', label: 'Chemicals' },
];

const categoryIcons: Record<string, { icon: typeof Package; color: string; bg: string }> = {
  seeds: { icon: Box, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  fertilizers: { icon: FlaskRound, color: 'text-green-600', bg: 'bg-green-100' },
  equipment: { icon: Wrench, color: 'text-blue-600', bg: 'bg-blue-100' },
  chemicals: { icon: Beaker, color: 'text-purple-600', bg: 'bg-purple-100' },
};

export default function FarmInventoryPage() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filtered = activeTab === 'all'
    ? farmInventoryItems
    : farmInventoryItems.filter((item) => item.category === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Farm Inventory"
        description="Manage your seeds, fertilizers, equipment, and chemicals"
      />

      <div className="mb-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const iconConfig = categoryIcons[item.category] || { icon: Package, color: 'text-gray-600', bg: 'bg-gray-100' };
          const Icon = iconConfig.icon;
          return (
            <Card key={item.id}>
              <CardContent>
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-lg ${iconConfig.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={22} className={iconConfig.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm text-gray-500">
                        <strong className="text-gray-700">{item.quantity}</strong> {item.unit}
                      </span>
                      <Badge variant="default" size="sm" className="capitalize">{item.category}</Badge>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Cost: {formatPeso(item.cost)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <Package size={48} className="mx-auto mb-3 opacity-50" />
          <p>No inventory items found</p>
        </div>
      )}
    </div>
  );
}
