import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { BASE_URL } from "../utils/constant";
// import axios from "axios";
// import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";
//import { useSelector } from "react-redux";

const Body = () => {
  //const user = useSelector((store) => store.user);
  //const dispatch = useDispatch();
  // const navigate = useNavigate();

  //const fetchUser = async () => {  // if user is logged in, then fetch its details
  //if(user) return;    // if user is already logged in, then no need to fetch user details again
    // try {
    //   const res = await axios.get(BASE_URL + "/profile/view", {
    //     withCredentials: true,
    //   });
    //   dispatch(addUser(res.data));
    // } catch (err) {
  //  if(err.status === 401){      // if not loggedIn, then navigate to login page only, not to any other page
  //     navigate("/login");
  //   }
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {      // when the component is loaded, fetchUser function will be called first to get the user details
  //   fetchUser();
  // }, []);

  return (
    <div>
      <NavBar />
      <Outlet />                  {/* Outlet is a placeholder for child routes where they will be rendered */}
      <Footer />
    </div>
  );
};

export default Body;
