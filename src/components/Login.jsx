import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.message === "Login Successful") {
        dispatch(addUser(response.data.data));
        navigate("/feed");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message?.split(": ").pop() || "Invalid credentials";
      setErrorMessage(errorMessage);
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/forgotPassword`, {
        email: forgotPasswordEmail,
      });
      if (response.data.message === "Password reset link sent") {
        setForgotPasswordMessage("Password reset link has been sent to your email.");
        setForgotPasswordEmail("");
        setTimeout(() => {
          setForgotPasswordMessage("");
        }, 2000);
      }
    } catch (err) {
      console.error("API call error:", err);
      setForgotPasswordMessage("Error sending password reset link.");
      setTimeout(() => {
        setForgotPasswordMessage("");
      }, 2000);
    }
  };

  const goToLandingPage = () => {
    navigate("/");
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <form className="w-full max-w-sm" onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full pr-10"
              placeholder="Enter your password"
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
        {errorMessage && (
          <div className="text-red-500 text-sm mb-4">
            <p>{errorMessage}</p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => setShowForgotPasswordModal(true)}
          className="text-sm text-blue-500 hover:underline"
        >
          Forgot your password?
        </button>
      </div>

      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-lg font-bold mb-4">Forgot Password</h2>
            <input
              type="email"
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              className="input input-bordered w-full mb-4"
              placeholder="Enter your email"
              required
            />
            <button
              onClick={handleForgotPassword}
              className="btn btn-primary w-full"
            >
              Send email
            </button>
            {forgotPasswordMessage && (
              <p className="mt-2 text-sm text-black">{forgotPasswordMessage}</p>
            )}
            <button
              onClick={() => setShowForgotPasswordModal(false)}
              className="btn btn-secondary w-full mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 w-full max-w-sm flex flex-col items-center gap-4">
        <button
          onClick={goToLandingPage}
          className="btn btn-secondary w-full"
        >
          Back to Home
        </button>
        <button
          onClick={goToSignUp}
          className="btn btn-outline w-full"
        >
          Create an Account
        </button>
      </div>
    </div>
  );
};

export default Login;
