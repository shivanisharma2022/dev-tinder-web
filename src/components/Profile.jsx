import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar"; 
import Footer from "./Footer"; 

const Profile = () => {
  const user = useSelector((state) => state.user); 
  const navigate = useNavigate();

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
