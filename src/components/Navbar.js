import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, TrendingUp, User, LogOut } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="bg-cursor-surface border-b border-cursor-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-cursor-accent" />
              <span className="text-xl font-bold text-gradient">KSRcrypto</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-cursor-text hover:text-cursor-accent transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              to="/prices" 
              className="text-cursor-text hover:text-cursor-accent transition-colors duration-200"
            >
              Prices
            </Link>
            {currentUser && (
              <Link 
                to="/portfolio" 
                className="text-cursor-text hover:text-cursor-accent transition-colors duration-200"
              >
                Portfolio
              </Link>
            )}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-cursor-accent" />
                  <span className="text-cursor-text">{currentUser.displayName || currentUser.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-cursor-text hover:text-cursor-accent transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-cursor-text hover:text-cursor-accent"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-cursor-surface border-t border-cursor-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-cursor-text hover:text-cursor-accent transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/prices"
              className="block px-3 py-2 text-cursor-text hover:text-cursor-accent transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Prices
            </Link>
            {currentUser && (
              <Link
                to="/portfolio"
                className="block px-3 py-2 text-cursor-text hover:text-cursor-accent transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Portfolio
              </Link>
            )}
            
            <div className="border-t border-cursor-border pt-4 mt-4">
              {currentUser ? (
                <div className="space-y-2">
                  <div className="px-3 py-2 text-cursor-text">
                    {currentUser.displayName || currentUser.email}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-cursor-text hover:text-cursor-accent transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-cursor-text hover:text-cursor-accent transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-cursor-accent font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar; 