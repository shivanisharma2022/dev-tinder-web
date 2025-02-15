import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Splash Screen */}
      {showSplash ? (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-500 via-pink-500 to-purple-500">
          <h1 className="text-6xl font-extrabold text-white animate-pulse drop-shadow-lg">
          👨‍💻 DevTinder
          </h1>
        </div>
      ) : (
        // Landing Page
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
          <div className="relative z-10 text-center text-white px-6">
            <h1 className="text-7xl font-extrabold drop-shadow-lg tracking-wide">
              👨‍💻 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">DevTinder</span>
            </h1>
            <p className="text-xl mt-4 max-w-lg mx-auto drop-shadow-md text-gray-300">
              Find like-minded developers, collaborate on projects, and build lifelong connections.
            </p>
            <div className="mt-8 flex justify-center space-x-6">
              <Link
                to="/login"
                className="px-6 py-3 rounded-lg text-lg font-semibold bg-red-500 text-white shadow-lg transform hover:scale-110 hover:bg-red-600 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-3 rounded-lg text-lg font-semibold bg-pink-500 text-white shadow-lg transform hover:scale-110 hover:bg-pink-600 transition-all duration-300"
              >
                Signup
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
