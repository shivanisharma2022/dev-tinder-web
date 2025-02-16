import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenFromRedux = useSelector((store) => store.user.token);


  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { 
        headers: { Authorization: `Bearer ${tokenFromRedux}` },
        withCredentials: true,
      });
      dispatch(removeUser());
      await navigate("/");
    } catch (err) {
      console.log("Logout Error:", err);
    }
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1 flex items-center gap-2">
        <Link to="/feed" className="btn btn-ghost text-xl">
          👨‍💻 devTinder
        </Link>
        <Link to="/connections" className="btn btn-ghost px-2">Connections</Link>
        <Link to="/requests" className="btn btn-ghost px-2">Requests</Link>
        <Link to="/premium" className="btn btn-ghost px-2">Premium</Link>
        <Link to="/chat" className="btn btn-ghost px-2">Chat</Link>
      </div>

      {user && (
        <div className="flex-none gap-2 flex items-center">
          <div className="form-control mr-2">Welcome, {user.firstName}</div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.imageUrl || "https://via.placeholder.com/150"} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">Profile</Link>
              </li>
              <li>
                <Link to="/feed">Feed</Link>
              </li>
              <li>
                <Link to="/changePassword">Change Password</Link>
              </li>
              <li>
                <a onClick={handleLogout} className="cursor-pointer">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
