import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import NavBar from "../components/NavBar"; 
import Footer from "../components/Footer"; 

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const user = useSelector((store) => store.user); 
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/chat/list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setChatList(response.data);
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    };

    fetchChatList();
  }, [token]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";

    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isToday = messageDate.toDateString() === today.toDateString();
    const isYesterday = messageDate.toDateString() === yesterday.toDateString();

    if (isToday) {
      return messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    } else if (isYesterday) {
      return "Yesterday";
    } else {
      return messageDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="w-3/4 mx-auto mt-5 flex items-center gap-3">
        <h2 className="text-xl font-bold">Recent Chats</h2>
        {user && (
          <div className="ml-auto flex items-center gap-2">
            <span className="text-gray-600">Welcome, {user.firstName}</span>
            <img src={user.imageUrl} alt="Profile" className="w-10 h-10 rounded-full" />
          </div>
        )}
      </div>

      <div className="flex-grow w-3/4 mx-auto mt-5">
        {chatList.length === 0 ? (
          <p>No recent chats</p>
        ) : (
          chatList.map(({ targetUser, lastMessage }) => (
            <Link
              key={targetUser._id}
              to={`/chat/${targetUser._id}`}
              className="flex items-center border-b p-3 hover:bg-gray-100"
            >
              <img
                src={targetUser.imageUrl}
                alt="Profile"
                className="w-12 h-12 rounded-full mr-3"
              />
              <div className="flex-1">
                <p className="font-bold">{targetUser.firstName} {targetUser.lastName}</p>
                <p className="text-sm text-gray-600">{lastMessage.text || "No messages yet"}</p>
              </div>
              <div className="text-xs text-gray-500">
                {formatTimestamp(lastMessage.createdAt)}
              </div>
            </Link>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ChatList;