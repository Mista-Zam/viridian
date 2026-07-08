import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { useAuthStore } from './store/authStore';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import MarketplacePage from './pages/marketplace/MarketplacePage';
import ProductDetailPage from './pages/marketplace/ProductDetailPage';
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import CheckoutSuccessPage from './pages/marketplace/CheckoutSuccessPage';
import OrdersPage from './pages/orders/OrdersPage';
import SellerDashboardPage from './pages/seller/SellerDashboardPage';
import FarmDashboardPage from './pages/farm/FarmDashboardPage';
import CropManagementPage from './pages/farm/CropManagementPage';
import ActivityLogsPage from './pages/farm/ActivityLogsPage';
import FinancialTrackingPage from './pages/farm/FinancialTrackingPage';
import FarmInventoryPage from './pages/farm/FarmInventoryPage';
import AIToolsPage from './pages/ai/AIToolsPage';
import AnalyticsDashboardPage from './pages/analytics/AnalyticsDashboardPage';
import CommunityPage from './pages/community/CommunityPage';
import ProfilePage from './pages/profile/ProfilePage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import IoTServicesPage from './pages/iot/IoTServicesPage';
import SecurityPage from './pages/security/SecurityPage';
import NotFoundPage from './pages/NotFoundPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  if (isLoggedIn) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function HomePage() {
  return <Navigate to="/marketplace" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
        <Route path="/register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/seller" element={<SellerDashboardPage />} />
          <Route path="/farm" element={<FarmDashboardPage />} />
          <Route path="/farm/crops" element={<CropManagementPage />} />
          <Route path="/farm/activities" element={<ActivityLogsPage />} />
          <Route path="/farm/finances" element={<FinancialTrackingPage />} />
          <Route path="/farm/inventory" element={<FarmInventoryPage />} />
          <Route path="/ai" element={<AIToolsPage />} />
          <Route path="/analytics" element={<AnalyticsDashboardPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/iot" element={<IoTServicesPage />} />
          <Route path="/security" element={<SecurityPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
