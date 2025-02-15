import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenFromRedux = useSelector((store) => store.user.token);

  // State for user details (initialized as empty)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [skills, setSkills] = useState([]);
  const [phone, setPhone] = useState("");
  const [err, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  // ✅ Use useEffect to prefill fields when Redux user data loads
  useEffect(() => {
    if (user) {
      setFirstName(user.data.firstName || "");
      setLastName(user.data.lastName || "");
      setAge(user.data.age || "");
      setGender(user.data.gender || "");
      setDescription(user.data.description || "");
      setImageUrl(user.data.imageUrl || "");
      setSkills(user.data.skills || []);
      setPhone(user.data.phone || "");
    }
  }, [user]); // Runs when 'user' changes

  // ✅ Save profile function
  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age: Number(age), gender, description, imageUrl, skills, phone },
        {
          headers: { Authorization: `Bearer ${tokenFromRedux}` },
          withCredentials: true,
        }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      setTimeout(() => {
        setShowToast(false);
        navigate("/profile");
      }, 3000);
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  // ✅ Handle skill input change
  const handleSkillChange = (e) => {
    setSkills(e.target.value.split(",").map((skill) => skill.trim()));
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-between items-center min-h-screen bg-base-200 px-4 py-6">
        <div className="w-full max-w-xl bg-base-300 shadow-lg rounded-lg p-8 mb-20 space-y-8">
          <h2 className="text-3xl font-bold text-center mb-8">Edit Profile</h2>

          <div className="flex justify-center mb-6">
            <img
              src={imageUrl || "https://via.placeholder.com/150"}
              alt="Profile"
              className="rounded-full w-36 h-36 object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <label className="block">
                <span className="text-lg font-medium">First Name</span>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full mt-1"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-lg font-medium">Last Name</span>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full mt-1"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-lg font-medium">Gender</span>
                <input
                  type="text"
                  value={gender}
                  className="input input-bordered w-full mt-1"
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-lg font-medium">Age</span>
                <input
                  type="text"
                  value={age}
                  className="input input-bordered w-full mt-1"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
            </div>

            <div className="space-y-6">
              <label className="block">
                <span className="text-lg font-medium">Description</span>
                <textarea
                  value={description}
                  className="input input-bordered w-full mt-1"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-lg font-medium">Skills (comma separated)</span>
                <input
                  type="text"
                  value={skills.join(", ")}
                  className="input input-bordered w-full mt-1"
                  onChange={handleSkillChange}
                  placeholder="e.g. JavaScript, React, Node.js"
                />
              </label>

              <label className="block">
                <span className="text-lg font-medium">Image URL</span>
                <input
                  type="text"
                  value={imageUrl}
                  className="input input-bordered w-full mt-1"
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </label>

              <label className="block">
                <span className="text-lg font-medium">Phone Number</span>
                <input
                  type="text"
                  value={phone}
                  className="input input-bordered w-full mt-1"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="text-center mt-6">
            <button className="btn btn-primary w-full max-w-xs" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>

        {showToast && (
          <div className="toast toast-top toast-end absolute right-5 top-20 z-50">
            <div className="alert alert-success">
              <span>Profile saved successfully.</span>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default EditProfile;
