import { Link } from "react-router-dom";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-8">👨‍💻 DevTinder</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Welcome to DevTinder, a place for developers to make new friends. Join us and connect with like-minded individuals.
      </p>
      <div className="flex space-x-4">
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
        <Link to="/signup" className="btn btn-secondary">
          Signup
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;