import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
const BASIC_AUTH_USERNAME = import.meta.env.VITE_BASIC_AUTH_USERNAME;
const BASIC_AUTH_PASSWORD = import.meta.env.VITE_BASIC_AUTH_PASSWORD;
const ResendOtp = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleResendOtp = async (e) => {
    e.preventDefault();

    const authHeader = `Basic ${btoa(`${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}`)}`;

    try {
      const response = await axios.post(
        `${BASE_URL}/resendOtp`,
        { countryCode, phone },
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.message === "OTP Sent Successfully") {
        navigate("/verifyOtp", { state: { phone, countryCode } });
      }
    } catch (err) {
      console.error("Error in resendOtp:", err);
      alert(err.response?.data?.message || "Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg transform transition-all hover:scale-105 duration-300">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">Resend OTP</h2>
        <form onSubmit={handleResendOtp}>
          <div className="flex items-center mb-6">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="input input-bordered w-20 text-xl rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="+91">+91</option>
            </select>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input input-bordered w-full ml-4 text-sm rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <p className="text-sm text-gray-600 mb-4 text-center">
            We&apos;ll send you a new OTP if your previous one expired.
          </p>

          <button
            type="submit"
            className="btn w-full py-3 text-white font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition duration-200"
          >
            Resend OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResendOtp;
