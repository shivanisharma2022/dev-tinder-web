import axios from 'axios';
import { BASE_URL } from "../utils/constant";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestsSlice';
import NavBar from "./NavBar"; 
import Footer from "./Footer"; 

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const reviewRequests = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <>
      <NavBar />
      <div className="text-center my-10">
        <h1 className="text-bold text-3xl">Requests</h1>
        {requests && requests.length > 0 ? (
          requests.map((request) => {
            const { _id, firstName, lastName, age, gender, description, imageUrl } = request.fromUserId;
            return (
              <div key={_id} className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto">
                <div>
                  <img alt="photo" className="w-20 h-20 rounded-full" src={imageUrl} />
                </div>
                <div className="text-left mx-4">
                  <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
                  {age && gender && <p>{age + " " + gender}</p>}
                  <p>{description}</p>
                </div>
                <div>
                  <button className="btn btn-secondary mx-2" onClick={() => reviewRequests("rejected", request._id)}>Reject</button>
                  <button className="btn btn-primary mx-2" onClick={() => reviewRequests("accepted", request._id)}>Accept</button>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="text-center text-xl font-semibold my-10">No Requests Found!</h1>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Requests;
