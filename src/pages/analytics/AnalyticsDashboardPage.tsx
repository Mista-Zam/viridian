import { useState } from 'react';
import { Tractor, ShoppingBag, ShieldCheck } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Tabs from '../../components/ui/Tabs';
import FarmerDashboardTab from './FarmerDashboardTab';
import BuyerDashboardTab from './BuyerDashboardTab';
import AdminDashboardTab from './AdminDashboardTab';

type DashboardTab = 'farmer' | 'buyer' | 'admin';

const tabs = [
  { id: 'farmer' as DashboardTab, label: 'Farmer Dashboard', icon: <Tractor size={18} /> },
  { id: 'buyer' as DashboardTab, label: 'Buyer Dashboard', icon: <ShoppingBag size={18} /> },
  { id: 'admin' as DashboardTab, label: 'Admin Dashboard', icon: <ShieldCheck size={18} /> },
];

export default function AnalyticsDashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('farmer');

  const renderTab = () => {
    switch (activeTab) {
      case 'farmer': return <FarmerDashboardTab />;
      case 'buyer': return <BuyerDashboardTab />;
      case 'admin': return <AdminDashboardTab />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader title="Analytics Dashboard" description="Data insights and performance metrics" />
      <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id as DashboardTab)} className="mb-6" />
      {renderTab()}
    </div>
  );
}
