import { Wifi, Droplets, BarChart3, ShieldCheck, TrendingDown, Clock, Satellite, Drone } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import StatsCard from '../../components/ui/StatsCard';
import Button from '../../components/ui/Button';

const services = [
  {
    number: '01',
    title: 'Managed Sensor Network',
    icon: Wifi,
    description: 'Deploy and manage a network of agricultural sensors across your farm for real-time data collection.',
    bullets: [
      'Soil moisture and temperature monitoring',
      'Weather station integration',
      'Automated data collection every 15 minutes',
      'Custom alert thresholds',
      'Solar-powered, low-maintenance sensors',
    ],
  },
  {
    number: '02',
    title: 'Smart Irrigation Control',
    icon: Droplets,
    description: 'Automated irrigation scheduling based on real-time soil data and weather forecasts.',
    bullets: [
      'AI-driven irrigation scheduling',
      'Pump and valve remote control',
      'Rainfall prediction integration',
      'Zone-based water management',
      'Reduced water consumption by up to 15%',
    ],
  },
  {
    number: '03',
    title: 'Operations Intelligence',
    icon: BarChart3,
    description: 'Transform raw sensor data into actionable insights with our analytics and reporting platform.',
    bullets: [
      'Custom dashboard builder',
      'Yield prediction models',
      'Resource usage analytics',
      'Crop health trend analysis',
      'Export reports for compliance',
    ],
  },
];

export default function IoTServicesPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="IoT Solutions"
          description="Smart Farming Starts with Connected Data"
        />

        <Card className="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500 text-white border-0 mb-10">
          <CardContent className="p-8 sm:p-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 text-primary-200 text-sm font-medium mb-4">
                <Wifi size={16} />
                <span>Internet of Things</span>
              </div>
              <p className="text-lg text-primary-100 leading-relaxed max-w-2xl">
                Viridian IoT brings real-time monitoring, automated control, and data-driven intelligence
                to every hectare of your farm. From soil sensors to satellite imagery, we connect it all.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button variant="secondary" size="lg" className="bg-white text-primary-800 hover:bg-primary-50 border-0">
                  Get Started
                </Button>
                <button className="px-6 py-3 rounded-lg border border-primary-300 text-primary-100 font-medium hover:bg-primary-600/50 transition cursor-pointer">
                  Talk to Sales
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 sm:grid-cols-3 mb-10">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.number} className="hover:shadow-card-hover transition">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-extrabold text-primary-200">{s.number}</span>
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
                      <Icon size={20} className="text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{s.description}</p>
                  <ul className="space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          <StatsCard
            title="Real-time Monitoring"
            value="24/7"
            icon={<ShieldCheck size={20} />}
          />
          <StatsCard
            title="Average Water Savings"
            value="15%"
            icon={<TrendingDown size={20} />}
          />
          <StatsCard
            title="Average Deployment"
            value="30-Day"
            icon={<Clock size={20} />}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 pb-16">
          <Card className="hover:shadow-card-hover transition">
            <CardContent className="p-6 sm:p-8">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                <Drone size={24} className="text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Drone Monitoring</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Deploy autonomous drones for aerial field surveillance, crop health assessment,
                and precision pesticide application. Covered up to 50 hectares per flight.
              </p>
              <ul className="space-y-2">
                {['NDVI crop health mapping', 'Pest infestation detection', 'Field boundary mapping', 'Automated flight scheduling'].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </CardContent>
          </Card>
          <Card className="hover:shadow-card-hover transition">
            <CardContent className="p-6 sm:p-8">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                <Satellite size={24} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Satellite Crop Health</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Access high-resolution satellite imagery for large-scale crop monitoring,
                vegetation index analysis, and early detection of field anomalies.
              </p>
              <ul className="space-y-2">
                {['Multi-spectral imagery analysis', 'Weekly field health reports', 'Drought stress detection', 'Historical trend comparison'].map(
                  (item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
