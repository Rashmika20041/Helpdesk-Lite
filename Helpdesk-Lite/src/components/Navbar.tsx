import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

function Navbar() {
  return (
    <nav className="bg-white shadow-xl border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side: Logo and Site Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              {/* Logo */}
              <div className="flex items-center justify-center w-10 h-10 rounded-lg">
                <img src={Logo} alt="Helpdesk Lite" className="w-8 h-8" />
              </div>
              {/* Site Name */}
              <span className="text-xl font-bold text-gray-900">Helpdesk Lite</span>
            </Link>
          </div>

          {/* Right side: Profile Username */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <span className="text-gray-700 font-medium">Welcome, John Doe</span>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-semibold text-sm">JD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
