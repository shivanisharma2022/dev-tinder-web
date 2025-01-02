import axios from 'axios';
import { BASE_URL } from "../utils/constant";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionsSlice';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {withCredentials: true});
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if(!connections) return 
  if(connections.length ===0) return <h1> No Connections Found!</h1>
  
    return (
    <div className="text-center my-10">
     <h1 className="text-bold text-3xl">Connections</h1>

     {connections.map((connection, index) =>{
      const {firstName, lastName, age, gender, description, imageUrl} = 
      connection;

      return (
        <div key={index} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
          <div>
            <img 
            alt="photo" 
            className="w-20 h-20 rounded-full" 
            src={imageUrl} 
            />
          </div>
          <div className="text-left mx-4">
            <h2 className="font-bold text-xl">
              {firstName + " " + lastName}
              </h2>
          {age && gender &&<p>{age + " " + gender}</p>}
          <p>{description}</p>
          </div> 
          </div>
      );
     })}
    </div>
    );
  };
  
  export default Connections;
  