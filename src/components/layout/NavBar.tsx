import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Map, Search, UserCircle, Home, Menu, X, PlusCircle, Users } from 'lucide-react';

const NavBar: React.FC = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <span className="text-coral-500 font-bold text-2xl tracking-tight">Spotted</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    isActiveRoute('/') ? 'text-coral-500' : 'text-gray-700 hover:text-coral-500'
                  }`}
                >
                  <Home className="w-5 h-5 mr-1" />
                  <span>Feed</span>
                </Link>
                <Link
                  to="/discover"
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    isActiveRoute('/discover') ? 'text-coral-500' : 'text-gray-700 hover:text-coral-500'
                  }`}
                >
                  <Search className="w-5 h-5 mr-1" />
                  <span>Discover</span>
                </Link>
                <Link
                  to="/add-spot"
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    isActiveRoute('/add-spot') ? 'text-coral-500' : 'text-gray-700 hover:text-coral-500'
                  }`}
                >
                  <PlusCircle className="w-5 h-5 mr-1" />
                  <span>Add Spot</span>
                </Link>
                <Link
                  to="/friends"
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                    isActiveRoute('/friends') ? 'text-coral-500' : 'text-gray-700 hover:text-coral-500'
                  }`}
                >
                  <Users className="w-5 h-5 mr-1" />
                  <span>Friends</span>
                </Link>
                <div className="ml-4 flex items-center">
                  <Link to="/profile" className="flex items-center">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={currentUser?.avatar || 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100'}
                      alt="Profile"
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-coral-500"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-coral-500 text-white hover:bg-coral-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-coral-500 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActiveRoute('/') ? 'text-coral-500' : 'text-gray-700 hover:text-coral-500'
                  }`}
                  onClick={closeMenu}
                >
                  <div className="flex items-center">
                    <Home className="w-5 h-5 mr-2" />
                    <span>Feed</span>
                  </div>
                </Link>
                <Link
                  to="/discover"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActiveRoute('/discover') ? 'text-coral-500' : 'text-gray-700 hover:text-coral-500'
                  }`}
                  onClick={closeMenu}
                >
                  <div className="flex items-center">
                    <Map className="w-5 h-5 mr-2" />
                    <span>Discover</span>
                  </div>
                </Link>
                <Link
                  to="/add-spot"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActiveRoute('/add-spot') ? 'text-coral-500' : 'text-gray-700 hover:text-coral-500'
                  }`}
                  onClick={closeMenu}
                >
                  <div className="flex items-center">
                    <PlusCircle className="w-5 h-5 mr-2" />
                    <span>Add Spot</span>
                  </div>
                </Link>
                <Link
                  to="/friends"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActiveRoute('/friends') ? 'text-coral-500' : 'text-gray-700 hover:text-coral-500'
                  }`}
                  onClick={closeMenu}
                >
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    <span>Friends</span>
                  </div>
                </Link>
                <Link
                  to="/profile"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActiveRoute('/profile') ? 'text-coral-500' : 'text-gray-700 hover:text-coral-500'
                  }`}
                  onClick={closeMenu}
                >
                  <div className="flex items-center">
                    <UserCircle className="w-5 h-5 mr-2" />
                    <span>Profile</span>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-gray-50"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-coral-500"
                  onClick={closeMenu}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-coral-500 text-white hover:bg-coral-600"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;