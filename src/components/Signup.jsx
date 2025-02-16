import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL, BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Eye, EyeOff, ArrowLeft } from "lucide-react"; 

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const authHeader = `Basic ${btoa(`${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}`)}`;

      const response = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, email, phone, password },
        {
          headers: {
            "Authorization": authHeader,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.message === "User Added Successfully") {
        localStorage.setItem("token", response.data.data.token);

        dispatch(addUser(response.data.data));
        navigate("/sendOtpEmail");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      if (err.response?.data.includes("E11000 duplicate key error")) {
        setError("This email address is already associated with an account.");
      } else {
        setError(err.response?.data || "Signup failed. Please try again.");
      }
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

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Signup</h1>

      {error && (
        <div className="mb-4 text-red-600 bg-red-100 p-3 rounded w-full max-w-sm text-center">
          {error}
        </div>
      )}

      <form className="w-full max-w-sm" onSubmit={handleSignup}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your last name"
            required
          />
        </div>
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your phone number"
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
            Signup
          </button>
        </div>
      </form>

      <div className="mt-8 w-full max-w-sm flex flex-col items-center gap-4">
        <button
          onClick={() => navigate("/login")}
          className="btn w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default Signup;
