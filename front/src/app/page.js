"use client";
import { useSocket } from "@/context/SocketContext";
import styled from "@emotion/styled";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useId, useState } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { v4 as uuid } from "uuid";
import useGeoLocation from "@/hook/useGeoLocation";
import toast from "react-hot-toast";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input::placeholder": {
    color: "black !important",
    opacity: 0.9,
    fontFamily: "cursive",
    fontSize: "1rem",
  },
}));

const Home = () => {
  const [name, setName] = useState("");
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const { socket, users, setUsers } = useSocket();
  const id = uuid();
  const { position } = useGeoLocation();
  const [activeUser, setActiveUser] = useState(null);
  const router = useRouter();

  const handleStartMap = async () => {
    if (!name || !file) {
      toast.error("All fields are required");
      return;
    }
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("lat", position[0]);
    formData.append("lang", position[1]);
    formData.append("profilePic", file);

    try {
      const response = await fetch("http://localhost:8000/add-user", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data?.status === 200) {
        const user = data?.data;

        socket.emit("add-user", {
          id: user?.id,
          name: user?.name,
          lat: position[0],
          lang: position[1],
          profilePic: user?.profile_pic,
        });

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user?.id,
            name: user?.name,
            lat: position[0],
            lang: position[1],
            profilePic: user?.profile_pic,
          })
        );
        await fetchUserData();
        toast.success(`Welcome ${user?.name} 🥰!`, {
          duration: 2000,
          position: "top-right",
        });
        router.push("/map");
      } else {
        toast.error(data?.message, { duration: 2000, position: "top-right" });
      }
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem("user"));
    setActiveUser(activeUser);
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8000/users");
      const data = await response.json();
      setUsers(data?.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (activeUser) {
      router.push("/map");
    }
  }, [activeUser]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <Box
      data-aos='fade-up'
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: { xs: "100%", md: "40ch" } },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: { xs: "7rem", md: "15rem" },
        // backgroundColor: "#f5f5f5",
        backgroundImage: `url("https://img.freepik.com/premium-photo/white-flowers-background_853558-41364.jpg")`,
        borderRadius: "5px",
        backdropFilter: "blur(5px)",
        width: { xs: "90%", md: "50%", lg: "40%" },
        mx: "auto",
        p: 3,
      }}
      noValidate
      autoComplete="off"
    >
      <Typography
        sx={{
          textAlign: "center",
          fontFamily: "cursive",
          // fontWeight: "bold",
          // fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: "1.5rem",
        }}
      >
        World of map 🌍
      </Typography>
      <StyledTextField
        id="name-input"
        variant="filled"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          justifyContent: "center",
          backgroundColor: "#d6dae0",
          borderRadius: "5px",
          p: 2,
        }}
      >
        {preview ? (
          <Box sx={{ position: "relative" }}>

            <DeleteForeverIcon fontSize="inherit" onClick={() => { setPreview(null), setFile(null) }} sx={{ position: "absolute", top: '-14px', right: '-14px', fontSize: "2rem", color: "#0E74D0" }} />
            <img src={preview} alt="Preview" width={"150px"} height={"150px"} />


          </Box>
        ) : (
          <label htmlFor="file-input">
            <Typography sx={{ fontFamily: "cursive", fontSize: "1rem" }}><InsertPhotoIcon sx={{ fontSize: "2rem", color: "#0E74D0" }} /> Upload Profile Picture</Typography>

          </label>
        )}
      </Box>
      <StyledTextField
        type="file"
        sx={{ display: "none" }}
        id="file-input"
        placeholder="Upload your profile picture"
        onChange={(e) => handleImageChange(e)}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{
          mt: 3,
          fontFamily: "cursive",
          fontSize: "1.22rem",
          textTransform: "none",
        }}
        onClick={handleStartMap}
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        Start
      </Button>
    </Box>
  );
};

export default Home;
