'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [users, setUsers] = useState([]);


    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        setSocket(newSocket);
        return () => newSocket.close();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:8000/users');
            const data = await response.json();
            setUsers(data?.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        if (socket) {
            fetchUserData();
        }
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket, users, setUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
export default SocketProvider