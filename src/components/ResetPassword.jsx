import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {

    console.log("ResetPassword component loaded");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("id");
  const token = queryParams.get("token");

  useEffect(() => {
    if (!userId || !token) {
        console.log("Missing id or token, redirecting to home.");
      navigate("/");
    }
  }, [userId, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/resetPassword?id=${userId}&token=${token}`,
        { password }
      );

      if (response.data.message === "Password has been reset") {
        setMessage("Password has been reset successfully!");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      console.error("API call error:", err);
      setMessage("Error resetting password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Reset Your Password</h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full pr-10"
              placeholder="Enter your new password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input input-bordered w-full pr-10"
              placeholder="Confirm your new password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="btn btn-primary w-full">
            Reset Password
          </button>
        </div>
      </form>

      {message && (
        <div className="mt-4 text-center">
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>{message}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
