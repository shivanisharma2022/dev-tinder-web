import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL, BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD } from "../utils/constant";

const ResendOtpEmail = () => {
  const location = useLocation();
  const initialEmail = location.state?.email || "";
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleResendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const authHeader = `Basic ${btoa(`${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}`)}`;

    try {
      const response = await axios.post(
        `${BASE_URL}/resendOtpEmail`,
        { email },
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.message === "OTP Resent Successfully") {
        setSuccess("Verification code has been resent to your email.");
        navigate("/verifyEmail", { state: { email } });
      }
    } catch (err) {
      console.error("Error in resendOtpEmail:", err);
      setError(err.response?.data?.message || "Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg transform transition-all hover:scale-105 duration-300">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">Resend Verification Code</h2>
        <form onSubmit={handleResendOtp}>
          <div className="mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full text-sm rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}

          <p className="text-sm text-gray-600 mb-4 text-center">
            We&apos;ll send you a new verification code if your previous one expired.
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

export default ResendOtpEmail;
