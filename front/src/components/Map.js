"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import useGeoLocation from "@/hook/useGeoLocation";

// Fix for default marker icon not showing
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const CenterMap = ({ position }) => {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.setView(position, 13); // Set the map view to the new center
        }
    }, [position, map]);
    return null;
};

const Map = ({
    users,
    mapCenter,
    setMapCenter,
    searchPosition,
    searchQuery,
}) => {
    const { position, setPosition } = useGeoLocation();
    // useEffect(() => {
    //     if (users.length > 0) {
    //         // Calculate the average position to center the map
    //         const latSum = users.reduce((sum, user) => sum + Number(user.lat), 0);
    //         const lngSum = users.reduce((sum, user) => sum + Number(user.lang), 0);
    //         const averageLat = latSum / users.length;
    //         const averageLng = lngSum / users.length;

    //         setMapCenter([averageLat, averageLng]);
    //     }
    // }, [users]);

    useEffect(() => {
        if (position) {
            setMapCenter(position);
        }
    }, [position]);

    const searchIcon = L.icon({
        iconUrl:
            "https://e7.pngegg.com/pngimages/169/109/png-clipart-black-and-red-location-app-icon-drawing-pin-world-map-logo-push-heart-pin.png",
        iconSize: [35, 35],
        iconAnchor: [25, 50],
        popupAnchor: [0, -50],
        className:
            "rounded-full shadow-lg shadow-gray-500/50 border-2 border-gray-500",
    });

    return (
        <MapContainer
            center={mapCenter}
            maxZoom={19}
            zoomAnimation={true}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "83vh", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <CenterMap position={mapCenter} />
            {users?.length > 0 &&
                users?.map((user) => {
                    const markerPosition = position
                        ? [position[0], position[1]]
                        : [Number(user.lat), Number(user.lang)];
                    const customIcon = L.icon({
                        iconUrl: user.profile_pic
                            ? `http://localhost:8000/uploads/${user.profile_pic}`
                            : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
                        iconSize: [35, 35],
                        iconAnchor: [25, 50],
                        popupAnchor: [0, -50],
                        className:
                            "rounded-full shadow-lg shadow-gray-500/50 border-2 border-gray-500",
                    });

                    return (
                        <Marker
                            key={user.id}
                            position={markerPosition}
                            icon={customIcon}
                            riseOnHover

                        >
                            <Popup>
                                <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                                    {user.name}
                                </Typography>
                            </Popup>
                        </Marker>
                    );
                })}

            {searchPosition && (
                <Marker position={searchPosition} icon={searchIcon}>
                    <Popup>
                        <Typography sx={{ fontWeight: "bold", fontSize: "14px" }}>
                            {" "}
                            {searchQuery}
                        </Typography>
                    </Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default Map;
