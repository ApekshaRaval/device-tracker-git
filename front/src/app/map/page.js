'use client';
import { useEffect, useState } from 'react';
import useGeoLocation from '../../hook/useGeoLocation';
import dynamic from "next/dynamic";
import { useRouter } from 'next/navigation';
import HorizontalNav from '../../components/HorizontalNav';
import { Box, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { useDebounce } from 'use-debounce';
// Dynamically import Map component to avoid SSR issues
const Map = dynamic(() => import("../../components/Map"), {
    ssr: false,
});

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f2f2f2',
    boxShadow: 3,
    '&:hover': {
        backgroundColor: "#E9E9E9",
    },
    marginRight: theme.spacing(2),
    marginLeft: 10,
    width: 'auto',
    [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(2),
        width: '40%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    color: 'black',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'black',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
}));

export default function MapPage() {
    const activeUser = JSON.parse(localStorage.getItem("user"));
    const { position, users } = useGeoLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [mapCenter, setMapCenter] = useState([activeUser?.lat, activeUser?.lang]);
    const [value] = useDebounce(searchQuery, 1000);
    const [searchPosition, setSearchPosition] = useState(null);
    const router = useRouter();
    useEffect(() => {
        if (activeUser) {
            router.push("/map")
        } else {
            router.push("/")
        }
    }, [activeUser])

    const handleSearch = async () => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`);
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon } = data[0];
                const position = [parseFloat(lat), parseFloat(lon)];
                setSearchPosition(position);
                setMapCenter(position);
            } else {
                alert('Location not found');
            }
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };

    useEffect(() => {
        if (value) {
            handleSearch();
        } else {
            setMapCenter([activeUser?.lat, activeUser?.lang]);
        }
    }, [value]);

    return (
        <main className="main">
            <HorizontalNav />
            <Box sx={{ flexGrow: 1, my: 2, }} data-aos="fade-left" >
                <Search sx={{ flexGrow: 1 }}>
                    <SearchIconWrapper>
                        <LocationSearchingIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Location…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            </Box>
            <div className="mapContainer">
                <Map position={position} users={users} setMapCenter={setMapCenter} mapCenter={mapCenter} searchPosition={searchPosition} searchQuery={searchQuery} />
            </div>
        </main>
    );
}

