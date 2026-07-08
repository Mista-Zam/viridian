import { useState } from 'react';
import { Sprout, Bug, FlaskRound, CloudSun, TrendingUp, MessageCircle } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Tabs from '../../components/ui/Tabs';
import { Card, CardContent } from '../../components/ui/Card';
import CropAdvisorTab from './CropAdvisorTab';
import DiseaseDetectionTab from './DiseaseDetectionTab';
import FertilizerAdvisorTab from './FertilizerAdvisorTab';
import WeatherTab from './WeatherTab';
import MarketIntelligenceTab from './MarketIntelligenceTab';
import ChatAssistantTab from './ChatAssistantTab';

type AiTab = 'crop' | 'disease' | 'fertilizer' | 'weather' | 'market' | 'chat';

const tabs = [
  { id: 'crop' as AiTab, label: 'Crop Advisor', icon: <Sprout size={18} /> },
  { id: 'disease' as AiTab, label: 'Disease Detection', icon: <Bug size={18} /> },
  { id: 'fertilizer' as AiTab, label: 'Fertilizer Advisor', icon: <FlaskRound size={18} /> },
  { id: 'weather' as AiTab, label: 'Weather', icon: <CloudSun size={18} /> },
  { id: 'market' as AiTab, label: 'Market Intelligence', icon: <TrendingUp size={18} /> },
  { id: 'chat' as AiTab, label: 'Chat', icon: <MessageCircle size={18} /> },
];

export default function AIToolsPage() {
  const [activeTab, setActiveTab] = useState<AiTab>('crop');

  const renderTab = () => {
    switch (activeTab) {
      case 'crop': return <CropAdvisorTab />;
      case 'disease': return <DiseaseDetectionTab />;
      case 'fertilizer': return <FertilizerAdvisorTab />;
      case 'weather': return <WeatherTab />;
      case 'market': return <MarketIntelligenceTab />;
      case 'chat': return <ChatAssistantTab />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader title="AI Tools" description="Smart farming insights powered by artificial intelligence" />
      <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id as AiTab)} className="mb-6" />
      <Card>
        <CardContent>
          {renderTab()}
        </CardContent>
      </Card>
    </div>
  );
}
