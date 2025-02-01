import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Eye, EyeOff } from "lucide-react"; // Import icons

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle state

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, email, password },
        { withCredentials: true }
      );

      if (response.data.message === "User Added Successfully") {
        dispatch(addUser(response.data.data));
        navigate("/feed");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      alert(err.response?.data?.error || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Signup</h1>
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
        <div className="mb-6 relative"> {/* Relative for positioning */}
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full pr-10" // Add padding for icon
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Toggle state
              className="absolute inset-y-0 right-2 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} {/* Toggle icon */}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
