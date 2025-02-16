import axios from 'axios';
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, description, imageUrl } = user;
  const dispatch = useDispatch();
  const tokenFromRedux = useSelector((store) => store.user.token);

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          headers: { Authorization: `Bearer ${tokenFromRedux}` },
          withCredentials: true
        }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 w-full max-w-2xl h-80 rounded-xl shadow-2xl overflow-hidden">
      <div className="flex-none w-1/3 h-full">
        <img
          src={imageUrl || "https://via.placeholder.com/150"}
          alt="User"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col justify-between w-2/3 p-6 text-white">
        <div>
          <h2 className="text-4xl font-bold">{firstName + " " + lastName}</h2>
          <p className="text-xl text-gray-200 mt-1">{age} | {gender}</p>
          <p className="text-sm text-gray-300 mt-3">{description}</p>
        </div>

        <div className="mt-4 flex justify-between">
          <button
            className="w-1/3 py-2 px-4 rounded-lg bg-purple-700 hover:bg-purple-600 text-white font-semibold transition duration-300"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="w-1/3 py-2 px-4 rounded-lg bg-pink-700 hover:bg-pink-600 text-white font-semibold transition duration-300"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;