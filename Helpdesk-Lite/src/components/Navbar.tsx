import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../assets/logo.png';

function Navbar() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    // In a real app, you would clear authentication tokens/session here
    navigate('/');
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutModal(false);
  };
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
              <button
                onClick={handleLogoutClick}
                className="relative px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-lg shadow-lg hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100 border border-gray-200">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 px-6 py-4 rounded-t-2xl">
              <h3 className="text-xl font-bold text-white flex items-center">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Confirm Logout
              </h3>
            </div>
            <div className="p-6">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                  <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Are you sure you want to logout?</h3>
                <p className="text-sm text-gray-500 mb-6">
                  You will be redirected to the login page and will need to sign in again to access your account.
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleCancelLogout}
                  className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
                >
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
