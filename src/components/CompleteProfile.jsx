import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import NavBar from "./NavBar";
import Footer from "./Footer";

const CompleteProfile = () => {
  const [gender, setGender] = useState("Male");
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tokenFromRedux = useSelector((store) => store.user.token);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age);
  };

  const handleSkillChange = (e) => {
    const skillArray = e.target.value.split(",").map(skill => skill.trim());
    if (skillArray.length > 4) {
      setError("You can only add up to 4 skills.");
      return;
    }
    setError("");
    setSkills(skillArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (skills.length < 2) {
      setError("Please add at least 2 skills.");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/completeProfile`,
        { gender, age, description, skills },
        {
          headers: { Authorization: `Bearer ${tokenFromRedux}` },
          withCredentials: true,
        }
      );

      dispatch(addUser(response.data.data));
      navigate("/feed");
    } catch (err) {
      console.error("Profile Update Error:", err);
      setError(err.response?.data || "Profile update failed. Try again.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4 py-6">
        <div className="w-full max-w-xl bg-base-300 shadow-lg rounded-lg p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center">Complete Your Profile</h2>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-lg font-medium">Gender</span>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select select-bordered w-full mt-1"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </select>
            </label>

            <label className="block">
              <span className="text-lg font-medium">Birthdate</span>
              <input
                type="date"
                value={birthdate}
                className="input input-bordered w-full mt-1"
                onChange={(e) => {
                  setBirthdate(e.target.value);
                  calculateAge(e.target.value);
                }}
              />
            </label>
            {age && <p className="text-gray-700">Calculated Age: {age}</p>}

            <label className="block">
              <span className="text-lg font-medium">Description</span>
              <textarea
                value={description}
                className="textarea textarea-bordered w-full mt-1"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us about yourself"
              />
            </label>

            <label className="block">
              <span className="text-lg font-medium">Skills</span>
              <input
                type="text"
                value={skills.join(", ")}
                className="input input-bordered w-full mt-1"
                onChange={handleSkillChange}
                placeholder="e.g. JavaScript, React, Node.js"
              />
            </label>

            <button type="submit" className="btn btn-primary w-full">
              Save Profile
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CompleteProfile;
