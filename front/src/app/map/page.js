"use client";
import { useEffect, useState } from "react";
import useGeoLocation from "../../hook/useGeoLocation";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import HorizontalNav from "../../components/HorizontalNav";
import { Box, InputBase } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import { useDebounce } from "use-debounce";
import toast from "react-hot-toast";
// Dynamically import Map component to avoid SSR issues
const Map = dynamic(() => import("../../components/Map"), {
    ssr: false,
});

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#f2f2f2",
    boxShadow: 3,
    "&:hover": {
        backgroundColor: "#E9E9E9",
    },
    marginRight: theme.spacing(2),
    marginLeft: 10,
    width: "auto",
    [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(2),
        width: "40%",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    color: "black",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "black",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),

        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "auto",
        [theme.breakpoints.up("md")]: {
            width: "100%",
        },
    },
}));

export default function MapPage() {
    const [activeUser, setActiveUser] = useState(null);

    const { position, users } = useGeoLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const [mapCenter, setMapCenter] = useState([
        activeUser?.lat,
        activeUser?.lang,
    ]);
    const [value] = useDebounce(searchQuery, 1000);
    const [searchPosition, setSearchPosition] = useState(null);
    const router = useRouter();
    useEffect(() => {
        if (activeUser) {
            router.push("/map");
        } else {
            router.push("/");
        }
    }, [activeUser]);

    useEffect(() => {
        const activeUser = JSON.parse(localStorage.getItem("user"));
        if (activeUser) {
            setActiveUser(activeUser);
            setMapCenter([activeUser?.lat, activeUser?.lang]);
            console.log([activeUser?.lat, activeUser?.lang]);
        }
    }, []);

    const handleSearch = async () => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
            );
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon } = data[0];
                const position = [parseFloat(lat), parseFloat(lon)];
                setSearchPosition(position);
                setMapCenter(position);
            } else {
                toast.error("Location not found");
            }
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    };

    useEffect(() => {
        if (value && value.length > 0) {
            handleSearch();
        } else {
            setMapCenter([activeUser?.lat ?? 0, activeUser?.lang ?? 0]);
        }
    }, [value]);

    if (!activeUser) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' width={150}>
                    <circle fill='#A1ABB9' stroke='#A1ABB9' strokeWidth='2' r='15' cx='40' cy='65'>
                        <animate
                            attributeName='cy'
                            calcMode='spline'
                            dur='2'
                            values='65;135;65;'
                            keySplines='.5 0 .5 1;.5 0 .5 1'
                            repeatCount='indefinite'
                            begin='-.4'
                        ></animate>
                    </circle>
                    <circle
                        fill='#A1ABB9'
                        stroke='#A1ABB9'
                        strokeWidth='2'
                        r='15'
                        cx='100'
                        cy='65'
                    >
                        <animate
                            attributeName='cy'
                            calcMode='spline'
                            dur='2'
                            values='65;135;65;'
                            keySplines='.5 0 .5 1;.5 0 .5 1'
                            repeatCount='indefinite'
                            begin='-.2'
                        ></animate>
                    </circle>
                    <circle fill='#A1ABB9' stroke='#A1ABB9' strokeWidth='2' r='15' cx='160' cy='65'>
                        <animate
                            attributeName='cy'
                            calcMode='spline'
                            dur='2'
                            values='65;135;65;'
                            keySplines='.5 0 .5 1;.5 0 .5 1'
                            repeatCount='indefinite'
                            begin='0'
                        ></animate>
                    </circle>
                </svg>


            </Box>
        );
    }

    return (
        <main className="main">
            <HorizontalNav />
            <Box sx={{ flexGrow: 1, my: 2 }} data-aos="fade-left">
                <Search sx={{ flexGrow: 1 }}>
                    <SearchIconWrapper>
                        <LocationSearchingIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Location…"
                        inputProps={{ "aria-label": "search" }}
                    />
                </Search>
            </Box>
            <div className="mapContainer">
                <Map
                    position={position}
                    users={users}
                    setMapCenter={setMapCenter}
                    mapCenter={mapCenter}
                    searchPosition={searchPosition}
                    searchQuery={searchQuery}
                />
            </div>
        </main>
    );
}
