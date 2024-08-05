'use client';

import { BACK_BASE_URL } from '@/constants/constant';
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const newSocket = io(BACK_BASE_URL, {
            transports: ['websocket'],  // Ensure WebSocket transport is used
            withCredentials: true       // Ensure credentials are sent
        });

        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('WebSocket connection established');
        });

        newSocket.on('disconnect', () => {
            console.log('WebSocket connection closed');
        });

        newSocket.on('error', (error) => {
            console.error('WebSocket error:', error);
        });

        return () => newSocket.close();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${BACK_BASE_URL}/users`);
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

export default SocketProvider;
