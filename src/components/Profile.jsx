import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const editProfile = useSelector((store) => store.editProfile);
  console.log(editProfile);
    return (
      //editProfile && (
    <div>
      <EditProfile user={editProfile}/>
    </div>
     //)
    );
  
  };
  
  export default Profile;
  