import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await fetch('http://localhost:5000/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
      if (!response.ok) {
        throw new Error('Logout failed');
      }
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsAuthenticated(false); // Update AuthContext
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          AquaNexus
        </Link>
        <div className="space-x-4">
          <Link
            to="/providers"
            className="text-gray-600 hover:text-blue-600 px-3 py-2"
          >
            Providers
          </Link>
          <a
            href="#how-it-works"
            className="text-gray-600 hover:text-blue-600 px-3 py-2"
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="text-gray-600 hover:text-blue-600 px-3 py-2"
          >
            Testimonials
          </a>
          {isAuthenticated ? (
            <>
              <Link
                to="/providers"
                className="text-gray-600 hover:text-blue-600 px-3 py-2"
              >
                All Providers
              </Link>
              <>
              <Link
                to="/login"
                className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
              <button
                onClick={handleLogout}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Signup
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}