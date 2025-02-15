import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar"; 
import Footer from "./Footer"; 

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/view`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <>
        <NavBar />
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-xl font-semibold">Loading profile...</h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="flex-grow flex justify-center items-start my-10 px-2"> 
        <div className="card w-full max-w-2xl bg-base-100 shadow-xl p-6 flex">
          <div className="flex-none w-1/3 flex justify-center items-center">
            <img
              src={user.imageUrl || "https://via.placeholder.com/150"}
              alt="User"
              className="rounded-full w-32 h-32 object-cover"
            />
          </div>
          <div className="flex-grow ml-8">
            <h2 className="text-3xl font-bold">{user.firstName + " " + user.lastName}</h2>
            <p className="text-lg text-gray-600">{user.email}</p>
            <p className="text-gray-500">{user.age} | {user.gender}</p>
            <p className="text-gray-500">{user.phone}</p>
            <p className="italic text-gray-700 mt-2">{user.description}</p>
            
            <div className="mt-4">
              <p className="font-bold">Skills:</p>
              <div className="flex flex-wrap gap-2">
                {user.skills?.map((skill, index) => (
                  <span key={index} className="badge badge-primary px-3 py-1">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              {user.isPremium ? (
                <span className="badge badge-success">Premium User</span>
              ) : (
                <span className="badge badge-outline">Free User</span>
              )}
            </div>

            <div className="mt-6 text-center">
              <button className="btn btn-secondary" onClick={() => navigate("/edit")}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
