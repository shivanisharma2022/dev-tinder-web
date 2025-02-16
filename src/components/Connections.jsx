import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import NavBar from "./NavBar";
import Footer from "./Footer"; 

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const tokenFromRedux = useSelector((store) => store.user.token);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        headers: { Authorization: `Bearer ${tokenFromRedux}` },
        withCredentials: true,
      });

      console.log("Fetched connections:", res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <>
      <NavBar />

      <div className="text-center my-10">
        <h1 className="text-bold text-3xl">Connections</h1>

        {connections?.length === 0 ? (
          <h1 className="text-gray-500 mt-5">No Connections Found!</h1> 
        ) : (
          connections.map((connection) => {
            const { _id, firstName, lastName, age, gender, description, imageUrl } = connection;

            return (
              <div
                key={_id}
                className="flex justify-between m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
              >
                <div>
                  <img alt="photo" className="w-20 h-20 rounded-full" src={imageUrl} />
                </div>
                <div className="text-left mx-4">
                  <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                  {age && gender && <p>{age + " " + gender}</p>}
                  <p>{description}</p>
                </div>
                <Link to={`/chat/${_id}`}>
                  <button className="btn btn-primary">Chat</button>
                </Link>
              </div>
            );
          })
        )}
      </div>

      <Footer />
    </>
  );
};

export default Connections;
