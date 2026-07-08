import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Package, User, LogOut, Bell, Search, Menu, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNotificationStore } from '../../store/notificationStore';
import { useCartStore } from '../../store/cartStore';
import Button from '../ui/Button';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/farm', label: 'My Farm' },
  { to: '/ai', label: 'AI Tools' },
  { to: '/community', label: 'Community' },
];

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const unreadCount = useNotificationStore((s) => s.unreadCount());
  const cartCount = useCartStore((s) => s.items.length);
  const isAuthPage = pathname === '/login' || pathname === '/register';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isAuthPage || !user) return null;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
            <img src="/logo.png" alt="Viridian" className="w-9 h-9 object-contain" />
            <span className="text-xl font-extrabold text-primary-700">Viridian</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Button
                key={link.to}
                variant={pathname === link.to ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => navigate(link.to)}
              >
                {link.label}
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-32 lg:w-64">
              <Search size={18} className="text-gray-400 mr-2 shrink-0" />
              <input type="search" placeholder="Search..." aria-label="Search products" className="bg-transparent text-sm outline-none w-full min-w-0" />
            </div>

            <Link to="/notifications" className="relative p-2 text-gray-600 hover:text-primary-700" aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ''}`}>
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-primary-700" aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}>
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/orders" className="hidden sm:flex p-2 text-gray-600 hover:text-primary-700" aria-label="Orders">
              <Package size={20} />
            </Link>

            <Link to="/profile" className="hidden sm:flex p-2 text-gray-600 hover:text-primary-700" aria-label="Profile">
              <User size={20} />
            </Link>

            <Button variant="ghost" size="sm" onClick={logout} className="hidden sm:flex text-gray-400 hover:text-red-500 p-2" icon={<LogOut size={18} />} />

            <button
              className="md:hidden p-2 text-gray-600 hover:text-primary-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white animate-fade-in">
          <div className="px-4 py-3 border-b border-border sm:hidden">
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <Search size={18} className="text-gray-400 mr-2 shrink-0" />
              <input type="search" placeholder="Search products..." aria-label="Search products" className="bg-transparent text-sm outline-none w-full min-w-0" />
            </div>
          </div>
          <nav className="px-2 py-2 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.to}
                onClick={() => { navigate(link.to); setMobileMenuOpen(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.to
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {link.label}
              </button>
            ))}
            <hr className="my-2 border-border" />
            <div className="flex items-center gap-2 px-3 py-2">
              <Link to="/orders" className="flex-1 text-center text-sm text-gray-600 hover:text-gray-900 py-2" onClick={() => setMobileMenuOpen(false)}>Orders</Link>
              <Link to="/profile" className="flex-1 text-center text-sm text-gray-600 hover:text-gray-900 py-2" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
              <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="flex-1 text-center text-sm text-red-500 hover:text-red-600 py-2">Logout</button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
