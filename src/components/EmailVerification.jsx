import { useState, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useNavigate, useLocation } from "react-router-dom";
const BASIC_AUTH_USERNAME = import.meta.env.VITE_BASIC_AUTH_USERNAME;
const BASIC_AUTH_PASSWORD = import.meta.env.VITE_BASIC_AUTH_PASSWORD;

const EmailVerification = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  const authHeader = `Basic ${btoa(`${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}`)}`;

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    if (e.target.value !== "" && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    try {
      setIsVerifying(true);
      const response = await axios.post(
        `${BASE_URL}/verifyEmail`,
        { email, otp: otpCode },
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setToastMessage({ type: "success", message: response.data.message });
      navigate("/sendOtp");
    } catch (err) {
      setToastMessage({ type: "error", message: err?.response?.data?.message || "Failed to verify OTP" });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsResending(true);
      await axios.post(
        `${BASE_URL}/resendOtp`,
        { email },
        {
          headers: {
            Authorization: authHeader,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setToastMessage({ type: "success", message: "OTP resent successfully!" });
    } catch (err) {
      setToastMessage({ type: "error", message: err?.response?.data?.message || "Failed to resend OTP" });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-600">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg transform transition-all hover:scale-105 duration-300">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">Enter Your Code</h2>
        <p className="text-center mb-6 text-gray-600">A code has been sent to {email}</p>

        <div className="grid grid-cols-6 gap-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-12 h-12 text-2xl text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          ))}
        </div>

        {toastMessage && (
          <div className={`mt-4 text-center p-3 rounded-md ${toastMessage.type === "success" ? "bg-green-500" : "bg-red-500"} text-white text-sm`}>
            {toastMessage.message}
          </div>
        )}

        <div className="text-center mb-4">
          <button
            onClick={handleSubmit}
            disabled={isVerifying}
            className={`w-full py-3 text-white font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none transition duration-200 ${
              isVerifying && "opacity-50 cursor-not-allowed"
            }`}
          >
            {isVerifying ? "Verifying..." : "Verify"}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-500">
            Didn&apos;t receive a code?{" "}
            <button
              onClick={handleResendOtp}
              disabled={isResending}
              className="text-blue-600 hover:underline"
            >
              {isResending ? "Resending..." : "Resend"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
