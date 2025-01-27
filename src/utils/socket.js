import io from "socket.io-client";
import { BASE_URL } from "../utils/constant";

export const socketCreateConnection = () => {
    if(location.hostname === 'localhost') {
        return io(BASE_URL);                  // will only work on local, not on production
    } else {
    return io("/", {path: '/api/socket.io'}); 
    }   
}


