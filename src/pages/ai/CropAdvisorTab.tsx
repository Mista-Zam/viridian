import { useState } from 'react';
import { Sprout, Sun } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import { cropRecommendations } from '../../data/ai';

const cropOptions = ['Tomato', 'Rice', 'Corn', 'Eggplant', 'Bell Pepper'];
const soilOptions = ['Loamy', 'Clay', 'Sandy', 'Silty', 'Peaty'];
const seasonOptions = ['Dry season', 'Wet season', 'Any'];

export default function CropAdvisorTab() {
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [selectedSoil, setSelectedSoil] = useState('Loamy');
  const [selectedSeason, setSelectedSeason] = useState('Dry season');

  const filtered = cropRecommendations.filter((r) => {
    let match = true;
    if (selectedCrop !== 'all') match = match && r.crop === selectedCrop;
    if (selectedSeason !== 'all') match = match && (r.season === selectedSeason || r.season === 'Any');
    return match;
  });

  const displayData = filtered.length > 0 ? filtered : cropRecommendations;

  return (
    <div>
      <Card className="mb-6">
        <CardContent>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Your Parameters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Crop Type"
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              options={[{ value: 'all', label: 'All Crops' }, ...cropOptions.map((c) => ({ value: c, label: c }))]}
            />
            <Select
              label="Soil Type"
              value={selectedSoil}
              onChange={(e) => setSelectedSoil(e.target.value)}
              options={soilOptions.map((s) => ({ value: s, label: s }))}
            />
            <Select
              label="Season"
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              options={[{ value: 'all', label: 'All Seasons' }, ...seasonOptions.map((s) => ({ value: s, label: s }))]}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {displayData.map((rec, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardContent>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Sprout size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{rec.crop}</h3>
                    <p className="text-xs text-gray-400">{rec.season} | {rec.water} water needed</p>
                  </div>
                </div>
                <Badge variant={rec.suitability >= 90 ? 'success' : rec.suitability >= 80 ? 'primary' : 'warning'} size="lg">
                  {rec.suitability}%
                </Badge>
              </div>
              <div className="mb-3">
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-emerald-500 h-2.5 rounded-full transition-all" style={{ width: `${rec.suitability}%` }} />
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <Sun size={14} className="mt-0.5 flex-shrink-0 text-yellow-500" />
                <span>{rec.reason}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
