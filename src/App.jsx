import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
import Chat from "./components/Chat";
import ChatList from "./components/ChatList";
import LandingPage from "./components/LandingPage";
import Signup from "./components/Signup";
import EditProfile from "./components/EditProfile";
import CompleteProfile from "./components/CompleteProfile";
import ChangePassword from "./components/ChangePassword";
import ResetPassword from "./components/ResetPassword";
import SendOtp from "./components/OtpSend";
import VerifyOtp from "./components/OtpVerification";

function App() {

  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/completeProfile" element={<CompleteProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/chat" element={<ChatList />} />
          <Route path="/chat/:targetUserId" element={<Chat />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/sendOtp" element={<SendOtp />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;