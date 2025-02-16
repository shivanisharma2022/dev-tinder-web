import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { Eye, EyeOff } from "lucide-react";
import Footer from "./Footer";
import NavBar from "./NavBar";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const tokenFromRedux = useSelector((store) => store.user.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      const response = await axios.post(
        BASE_URL + "/changePassword",
        { oldPassword, newPassword, confirmPassword },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${tokenFromRedux}`,
          },
        }
      );

      if (response.status === 200 && response.data.message === "Password changed successfully") {
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
          navigate("/feed");
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
     <NavBar />
      <div className="flex-grow flex justify-center items-start my-10 px-2">
        <div className="card w-full max-w-2xl bg-base-100 shadow-xl p-6">
          <h2 className="text-3xl font-bold text-center mb-6">Change Your Password</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Old Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-end absolute right-5 top-20 z-50">
          <div className="alert alert-success">
            <span>Password changed successfully.</span>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default ChangePassword;
