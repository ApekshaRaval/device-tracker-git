'use client';

import { useSocket } from '@/context/SocketContext';
import { useEffect, useState } from 'react';

const useGeoLocation = () => {
    const { socket, users } = useSocket();
    const [activeUser, setActiveUser] = useState(null);
    const [position, setPosition] = useState([51.505, -0.09]);

    useEffect(() => {
        let activeUser = JSON.parse(localStorage.getItem("user"));
        setActiveUser(activeUser);
    }, [])

    useEffect(() => {
        let watchId;

        if (socket) {
            const handleGeolocation = (position) => {
                const pos = [position.coords.latitude, position.coords.longitude];
                socket.emit("send-location", { id: activeUser?.id, lat: pos[0], lang: pos[1] });
                setPosition(pos);
                if (activeUser) {
                    const updatedUser = { ...activeUser, lat: pos[0], lang: pos[1] };
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                    setActiveUser(updatedUser); // Update the ref
                }
            };

            const handleGeolocationError = (error) => {
                console.error("Error getting location", error);
            };

            if (navigator.geolocation) {
                watchId = navigator.geolocation.watchPosition(handleGeolocation, handleGeolocationError, {
                    enableHighAccuracy: true,
                    timeout: 10000, // Increased timeout to 10 seconds
                    maximumAge: 0,
                });
            }
        }

        return () => {
            if (navigator.geolocation && watchId !== undefined) {
                navigator.geolocation.clearWatch(watchId);
            }
            if (socket) {
                socket.off("send-location");
            }
        };
    }, [socket]);

    useEffect(() => {
        if (socket) {
            const handleLocationUpdate = (data) => {
                setPosition([data?.lat, data?.lang]);
            };
            socket.on("location", handleLocationUpdate);
            return () => {
                socket.off("location", handleLocationUpdate);
            };
        }
    }, [socket]);

    if (!activeUser) {
        return <div>loading..</div>
    }

    return {
        position,
        users,
        setPosition
    };
};

export default useGeoLocation;
