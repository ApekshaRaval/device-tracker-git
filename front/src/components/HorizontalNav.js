import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { BACK_BASE_URL } from "@/constants/constant";


export default function HorizontalNav() {
    const [activeUser, setActiveUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const activeUser = JSON.parse(localStorage.getItem("user"));
        setActiveUser(activeUser);
    }, [])

    const handleLogout = async () => {
        try {
            const response = await fetch(`${BACK_BASE_URL}/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: activeUser.id,
                }),
            });
            const data = await response.json();
            if (data?.status === 200) {
                localStorage.removeItem("user");
                toast.success("Logged out successfully!", {
                    duration: 2000,
                    position: "top-right",
                });
                router.push("/");
            } else {
                toast.error("Error logging out:", data?.message, {
                    duration: 2000,
                    position: "top-right",
                });
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Error fetching user data:", error, {
                duration: 2000,
                position: "top-right",
            });
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: "#f2f2f2",
                    boxShadow: "none",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                }}
            >
                <Toolbar data-aos="fade-left">
                    <img
                        src="data:image/png;base64,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"
                        alt="logo"
                        width={30}
                        height={35}
                        style={{ marginRight: "10px" }}
                    />
                    <Typography
                        sx={{
                            color: "gray",
                            fontSize: { xs: "1rem", sm: "1.2rem" },
                            fontFamily: "cursive",
                        }}
                    >
                        {activeUser?.name || "User"}
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    <Button
                        onClick={handleLogout}
                        color="inherit"
                        sx={{
                            color: "black",
                            textTransform: "none",
                            fontFamily: "cursive",
                            fontSize: { xs: "0.8rem", sm: "1rem" },
                        }}
                        endIcon={<LogoutIcon />}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
