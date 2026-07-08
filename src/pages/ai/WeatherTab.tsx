import { CloudSun, Droplets, Thermometer, Umbrella, Sun, Cloud, CloudRain, CloudLightning } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import StatsCard from '../../components/ui/StatsCard';
import { weatherForecast } from '../../data/ai';

const conditionIcons: Record<string, typeof Sun> = {
  'Partly Cloudy': CloudSun,
  'Light Rain': CloudRain,
  'Thunderstorms': CloudLightning,
  'Cloudy': Cloud,
  'Sunny': Sun,
};

const conditionColors: Record<string, string> = {
  'Partly Cloudy': 'text-yellow-500',
  'Light Rain': 'text-blue-500',
  'Thunderstorms': 'text-purple-500',
  'Cloudy': 'text-gray-500',
  'Sunny': 'text-orange-500',
};

export default function WeatherTab() {
  const rainyDays = weatherForecast.filter((d) => d.rain >= 60).length;
  const idealDays = weatherForecast.filter((d) => d.rain < 30 && parseInt(d.temp) >= 25 && parseInt(d.temp) <= 32).length;

  const tempRange = {
    min: weatherForecast.reduce((min, d) => Math.min(min, parseInt(d.temp)), 99),
    max: weatherForecast.reduce((max, d) => Math.max(max, parseInt(d.temp)), 0),
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 mb-8">
        {weatherForecast.map((day) => {
          const Icon = conditionIcons[day.condition] || CloudSun;
          const iconColor = conditionColors[day.condition] || 'text-gray-500';
          return (
            <Card key={day.day} className="text-center hover:shadow-md transition-shadow">
              <CardContent>
                <p className="font-semibold text-gray-700 text-sm mb-3">{day.day}</p>
                <Icon size={32} className={`mx-auto mb-2 ${iconColor}`} />
                <p className="text-2xl font-bold text-gray-800">{day.temp}</p>
                <p className="text-xs text-gray-400 mt-1">{day.condition}</p>
                <div className="mt-3 space-y-1.5 text-xs text-gray-500">
                  <div className="flex items-center justify-center gap-1">
                    <Droplets size={12} className="text-blue-500" />
                    <span>{day.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Umbrella size={12} className="text-blue-500" />
                    <span>{day.rain}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatsCard
          title="Temperature Range"
          value={`${tempRange.min}°C - ${tempRange.max}°C`}
          icon={<Thermometer size={20} />}
          description="7-day forecast range"
        />
        <StatsCard
          title="Rainy Days"
          value={`${rainyDays} days`}
          icon={<Umbrella size={20} />}
          description="High precipitation expected"
        />
        <StatsCard
          title="Ideal Planting Days"
          value={`${idealDays} days`}
          icon={<Sun size={20} />}
          description="Optimal conditions for planting"
        />
      </div>

      <Card>
        <CardContent>
          <h3 className="font-semibold text-gray-800 mb-3">Farming Recommendations</h3>
          <div className="space-y-3">
            {rainyDays >= 3 && (
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <CloudRain size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">Heavy rain expected. Delay planting and ensure drainage systems are clear. Harvest ripe crops before the rain.</p>
              </div>
            )}
            {idealDays >= 3 && (
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <Sun size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">Ideal planting window. Start transplanting seedlings and apply fertilizers for optimal growth.</p>
              </div>
            )}
            {weatherForecast.some((d) => parseInt(d.temp) >= 30) && (
              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                <Thermometer size={18} className="text-orange-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">High temperatures expected. Increase irrigation frequency and provide shade for sensitive crops.</p>
              </div>
            )}
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <CloudSun size={18} className="text-purple-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">Monitor pest activity as weather changes. Apply preventive measures before the weekend rain.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
