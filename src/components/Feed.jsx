import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";
import NavBar from "./NavBar"; 
import Footer from "./Footer"; 
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      }); 
      dispatch(addFeed(res?.data?.data.data));
    } catch (err) {
      console.error("Error fetching feed:", err); 
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return null;
  if (feed.length <= 0) return <h1 className="flex justify-center my-10">No Feed Found!</h1>;

  return (
    <>
      <NavBar />
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
      <Footer />
    </>
  );
};

export default Feed;