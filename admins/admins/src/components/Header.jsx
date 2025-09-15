import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, LogOut, User } from 'lucide-react';
import { useToast } from '../context/ToastContext';

// interface HeaderProps {
//   onMenuClick: () => void;
// }

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { addToast } = useToast();

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully', 'success');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h2 className="ml-4 lg:ml-0 text-2xl font-semibold text-gray-900">
            Real Estate Admin Dashboard
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-700">
            <User className="h-4 w-4 mr-2" />
            <span className="font-medium">{user?.name}</span>
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full capitalize">
              {user?.role}
            </span>
          </div>
          
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;