import { useState } from 'react';
import { Plus, Sprout, Calendar, BarChart3 } from 'lucide-react';
import { cropRecords } from '../../data/farm';
import { formatDate } from '../../lib/utils';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import Tabs from '../../components/ui/Tabs';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';

const tabs = [
  { id: 'all', label: 'All' },
  { id: 'growing', label: 'Growing' },
  { id: 'harvested', label: 'Harvested' },
  { id: 'planned', label: 'Planned' },
];

const statusBadgeVariant: Record<string, 'primary' | 'success' | 'warning'> = {
  growing: 'primary',
  harvested: 'success',
  planned: 'warning',
};

const columns = [
  {
    key: 'cropName', header: 'Crop Name',
    render: (item: Record<string, unknown>) => {
      const crop = item as unknown as typeof cropRecords[0];
      return (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center">
            <Sprout size={18} className="text-emerald-600" />
          </div>
          <span className="font-medium text-gray-800">{crop.cropName}</span>
        </div>
      );
    },
  },
  {
    key: 'plantedDate', header: 'Planted Date',
    render: (item: Record<string, unknown>) => {
      const crop = item as unknown as typeof cropRecords[0];
      return (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={14} />
          {formatDate(crop.plantedDate)}
        </div>
      );
    },
  },
  {
    key: 'harvestDate', header: 'Harvest Date',
    render: (item: Record<string, unknown>) => {
      const crop = item as unknown as typeof cropRecords[0];
      return (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={14} />
          {formatDate(crop.harvestDate)}
        </div>
      );
    },
  },
  {
    key: 'status', header: 'Status',
    render: (item: Record<string, unknown>) => {
      const crop = item as unknown as typeof cropRecords[0];
      return (
        <Badge variant={statusBadgeVariant[crop.status]} size="sm">
          {crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}
        </Badge>
      );
    },
  },
  { key: 'area', header: 'Area (ha)', render: (item: Record<string, unknown>) => { const crop = item as unknown as typeof cropRecords[0]; return <span className="text-sm text-gray-600">{crop.area}</span>; } },
  { key: 'expectedYield', header: 'Expected Yield', render: (item: Record<string, unknown>) => { const crop = item as unknown as typeof cropRecords[0]; return <span className="text-sm text-gray-600">{crop.expectedYield} kg</span>; } },
  {
    key: 'actualYield', header: 'Actual Yield',
    render: (item: Record<string, unknown>) => {
      const crop = item as unknown as typeof cropRecords[0];
      return (
        crop.actualYield ? (
          <span className="text-green-600 font-medium text-sm">{crop.actualYield} kg</span>
        ) : (
          <span className="text-gray-400 text-sm">—</span>
        )
      );
    },
  },
];

export default function CropManagementPage() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filtered = activeTab === 'all' ? cropRecords : cropRecords.filter((c) => c.status === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Crop Management"
        description="Track and manage your crop records"
        actions={
          <Button size="md">
            <Plus size={18} />
            Add Crop Record
          </Button>
        }
      />

      <div className="mb-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      <Table
        columns={columns}
        data={filtered as unknown as Record<string, unknown>[]}
        emptyState={
          <div className="text-center py-12 text-gray-400">
            <BarChart3 size={48} className="mx-auto mb-3 opacity-50" />
            <p>No crop records found</p>
          </div>
        }
      />
    </div>
  );
}
