import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardContent className="py-12">
          <img src="/logo.png" alt="Viridian" className="w-20 h-20 object-contain mx-auto mb-6" />
          <h1 className="text-7xl font-extrabold text-primary-700 mb-2">404</h1>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Page not found</h2>
          <p className="text-gray-500 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button icon={<Home size={18} />} onClick={() => navigate('/')}>
            Go Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
