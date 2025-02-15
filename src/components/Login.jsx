import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import dotenv from "react-dotenv";
dotenv.config();

const BASIC_AUTH_USERNAME = dotenv.env.BASIC_AUTH_USERNAME
const BASIC_AUTH_PASSWORD = dotenv.env.BASIC_AUTH_PASSWORD

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      
      const authHeader = `Basic ${btoa(`${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}`)}`;

      const response = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.message === "Login Successful") {
        const { token, data } = response.data.data;
        localStorage.setItem("authToken", token);

        dispatch(addUser(data));

        if (!data.phoneVerify.isVerified) {
          navigate("/sendOtp");
        } else if (!data.isProfileCompleted) {
          navigate("/completeProfile");
        } else {
          navigate("/feed");
        }
      }
    } catch (err) {
      console.error("Login Error:", err);
      setErrorMessage(err.response?.data || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative w-full">
      <button 
        onClick={() => navigate(-1)} 
        className="absolute top-6 left-6 flex items-center text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft size={24} />
        <span className="ml-2 text-sm font-medium">Back</span>
      </button>

      <h1 className="text-3xl font-bold mb-8">Login</h1>

      {errorMessage && (
        <div className="mb-4 text-red-600 bg-red-100 p-3 rounded w-full max-w-sm text-center">
          {errorMessage}
        </div>
      )}

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
        <div className="flex items-center justify-between">
          <button type="submit" className="btn w-full bg-blue-600 text-white hover:bg-blue-700">
            Login
          </button>
        </div>
      </form>

      <div className="mt-8 w-full max-w-sm flex flex-col items-center gap-4">
        <button
          onClick={() => navigate("/signup")}
          className="btn w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
        >
          Create an Account
        </button>
      </div>
    </div>
  );
};

export default Login;
