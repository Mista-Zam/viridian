export default function Footer() {
  return (
    <footer className="bg-primary-900 text-primary-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Viridian" className="w-9 h-9 object-contain" />
              <span className="text-lg font-extrabold text-white">Viridian</span>
            </div>
            <p className="text-sm text-primary-200">Sustainable agriculture marketplace & farm management platform.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Products</a></li>
              <li><a href="#" className="hover:text-white">Categories</a></li>
              <li><a href="#" className="hover:text-white">Sellers</a></li>
              <li><a href="#" className="hover:text-white">Promotions</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Farm Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Crop Management</a></li>
              <li><a href="#" className="hover:text-white">AI Advisor</a></li>
              <li><a href="#" className="hover:text-white">Weather</a></li>
              <li><a href="#" className="hover:text-white">Analytics</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-800 mt-8 pt-8 text-center text-sm text-primary-300">
          &copy; 2026 Viridian. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
