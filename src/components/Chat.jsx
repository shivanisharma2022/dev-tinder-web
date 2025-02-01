import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { socketCreateConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import NavBar from "./NavBar";
import Footer from "./Footer";

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [targetUser, setTargetUser] = useState(null); 

    const user = useSelector(store => store.user);
    const userId = user?._id;

    // Fetch chat messages and target user info
    const fetchChatMessages = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
                withCredentials: true
            });

            console.log(response.data.messages);
            
            // Extract target user details from chat participants
            const target = response.data.participants.find(participant => participant._id !== userId);
            setTargetUser(target);

            // Process messages
            const chatMessages = response?.data?.messages.map((msg) => {
                const { senderId, text } = msg;
                return {
                    firstName: senderId?.firstName,
                    lastName: senderId?.lastName,
                    imageUrl: senderId?.imageUrl, 
                    text
                };
            });

            setMessages(chatMessages);
        } catch (err) {
            console.error("Error fetching chat messages:", err);
        }
    };

    useEffect(() => {
        fetchChatMessages();
    }, []);

    useEffect(() => {
        if (!userId) return;
        
        const socket = socketCreateConnection();
        socket.emit('joinChat', { firstName: user?.firstName, userId, targetUserId });

        socket.on('receiveMessage', ({ firstName, lastName, imageUrl, text }) => {
            console.log(firstName + ' : ' + text);
            setMessages((messages) => [...messages, { firstName, lastName, imageUrl, text }]);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId, targetUserId]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;
    
        const socket = socketCreateConnection();
        const newMsgObj = {
            firstName: user?.firstName,
            lastName: user?.lastName,
            userId,
            targetUserId,
            text: newMessage,
            imageUrl: user?.imageUrl
        };
    
        // Emit message to server
        socket.emit('sendMessage', newMsgObj);
    
        // **Update local state immediately**
        setMessages((prevMessages) => [...prevMessages, newMsgObj]);
    
        // Clear the input field
        setNewMessage("");
    };
    return (
        <>
            <NavBar>
                <div className="flex items-center gap-3">
                    <span className="text-lg font-bold">Welcome, {user?.firstName}!</span>
                    <img className="w-10 h-10 rounded-full" src={user?.imageUrl} alt="Profile" />
                </div>
            </NavBar>

            <div className='w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
                <h1 className='p-5 border-b border-gray-600 flex items-center gap-3'>
                    {targetUser && (
                        <>
                            <img className="w-10 h-10 rounded-full" src={targetUser.imageUrl} alt="Chat User" />
                            <span> {targetUser.firstName} {targetUser.lastName}</span>
                        </>
                    )}
                </h1>

                <div className='flex-1 overflow-scroll p-5'>
                    {messages.map((msg, index) => (
                        <div key={index}
                            className={'chat ' + (user?.firstName === msg.firstName ? "chat-end" : "chat-start")}
                        >
                            <div className="chat-header flex items-center gap-2">
                                <img className="w-8 h-8 rounded-full" src={msg.imageUrl} alt="User" />
                                <span>{`${msg.firstName} ${msg.lastName}`}</span>
                                <time className="text-xs opacity-50">2 hours ago</time>
                            </div>
                            <div className="chat-bubble">{msg.text}</div>
                            <div className="chat-footer opacity-50">Seen</div>
                        </div>
                    ))}
                </div>

                <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
                    <input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className='flex-1 border border-gray-500 text-black rounded p-2'
                        placeholder="Type a message..."
                    />
                    <button onClick={sendMessage} className='btn btn-secondary'>Send</button>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Chat;
