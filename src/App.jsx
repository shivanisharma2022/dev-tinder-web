import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login"; 
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
import Chat from "./components/Chat";
function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">                      {/* this is our baseUrl */}
        <Routes>                                        {/* wrapper for different routes */}
          <Route path="/" element={<Body  />} >           {/* parent route (body component) */}
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<Login />} />   {/* child routes */}
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/connections" element={<Connections />} /> 
          <Route path="/requests" element={<Requests />} /> 
          <Route path="/premium" element={<Premium />} /> 
          <Route path="/chat/:targetUserId" element={<Chat />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
