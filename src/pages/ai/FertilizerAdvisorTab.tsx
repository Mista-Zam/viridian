import { useState } from 'react';
import { FlaskRound, Leaf, Beaker } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import { fertilizerSuggestions } from '../../data/ai';

const cropOptions = ['Tomato', 'Rice', 'Eggplant', 'Corn'];

export default function FertilizerAdvisorTab() {
  const [selectedCrop, setSelectedCrop] = useState('Tomato');

  const suggestion = fertilizerSuggestions.find((s) => s.crop === selectedCrop);

  return (
    <div>
      <Card className="mb-6">
        <CardContent>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Your Crop</h2>
          <Select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            options={cropOptions.map((c) => ({ value: c, label: c }))}
          />
        </CardContent>
      </Card>

      {suggestion && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Beaker size={22} className="text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">NPK Recommendation</h3>
                  <Badge variant="success" size="sm">Synthetic fertilizer plan</Badge>
                </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                <p className="text-sm text-gray-700 leading-relaxed">{suggestion.recommendation}</p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                <FlaskRound size={14} />
                <span>Tailored for {suggestion.crop} based on soil analysis</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-lg bg-green-100 flex items-center justify-center">
                  <Leaf size={22} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Organic Alternative</h3>
                  <Badge variant="success" size="sm">Natural farming approach</Badge>
                </div>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-sm text-gray-700 leading-relaxed">{suggestion.organic}</p>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                <Leaf size={14} />
                <span>Environmentally sustainable option</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
