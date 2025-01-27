import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { socketCreateConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';

const Chat = () => {

    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessages] = useState([]);
    const user = useSelector(store => store.user);
    const userId = user?.data._id; // getting loggedIn userId from redux store

    const fetchChatMessages = async () => {
        const chat = await axios.get(BASE_URL + '/chat/' + targetUserId, {
            withCredentials: true
        });

        console.log(chat.data.messages);

        const chatMessages = chat?.data?.messages.map((msg) => {
            const { senderId, text } = msg;
            return {
                firstName: senderId?.firstName,
                lastName: senderId?.lastName,
                text
            }
        });
        setMessages(chatMessages);
    }

    useEffect(() => {
        fetchChatMessages();
    }, []);

    useEffect(() => {
        if (!userId) {
            return;
        }
        const socket = socketCreateConnection();
        // as soon as the page loads, socket connection is made and it will emit an event joinChat
        socket.emit('joinChat', { firstName: user?.data.firstName, userId, targetUserId });

        socket.on('receiveMessage', ({ firstName, lastName, text }) => {
            console.log(firstName + ' : ' + text);
            setMessages((messages) => [...messages, { firstName, lastName, text }]);

        });

        // as soon as the page loads, socket connection is disconnected
        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId]);

    const sendMessage = () => {
        const socket = socketCreateConnection();
        socket.emit('sendMessage', {
            firstName: user?.data.firstName,
            lastName: user?.data.lastName,
            userId,
            targetUserId,
            text: newMessage
        });
        setNewMessages("");
    }

    return (
        <div className='w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col'>
            <h1 className='p-5 border-b border-gray-600'>Chat</h1>
            <div className='flex-1 overflow-scroll p-5'>
                {messages.map((msg, index) => {
                    return (
                        <div key={index}
                        className={'chat ' +
                            (user?.data.firstName === msg.firstName ? "chat-end" : "chat-start")
                        }
                        >
                            <div className="chat-header">
                                {`${msg.firstName} ${msg.lastName}`}
                                <time className="text-xs opacity-50">2 hours ago</time>
                            </div>
                            <div className="chat-bubble">{msg.text}</div>
                            <div className="chat-footer opacity-50">Seen</div>
                        </div>
                    );
                })}
            </div>
            <div className='p-5 border-t border-gray-600 flex items-center gap-2'>
                <input
                    value={newMessage}
                    onChange={(e) => setNewMessages(e.target.value)}
                    className='flex-1 border border-gray-500 text-black rounded p-2'></input>
                <button onClick={sendMessage} className='btn btn-secondary'>Send</button>
            </div>
        </div >
    )
}

export default Chat;