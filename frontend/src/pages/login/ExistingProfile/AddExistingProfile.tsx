import React, {useEffect, useState} from "react";
import { Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";



const AddExistingProfile = () => {
  const navigate = useNavigate();



  const handleBack = () => {
    navigate("/");
  };

  const loginExistingProfile = () => {
    navigate("/login-existing-profile");
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f9fafb", // Optional background color
        textAlign: "center",
      }}
    >
      {/* Back Button */}
      <Box
        sx={{
          position: "absolute",
          top: "5rem",
          left: "3rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <Box
          onClick={handleBack}
          className="cursor-pointer hover:bg-gray-200"
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <ArrowBackIcon sx={{ color: "#0f2043" }} />
        </Box>
        <Box sx={{ fontSize: "0.875rem", color: "#0f2043" }}>Back</Box>
      </Box>

      {/* Centered Content */}
      <Box>
        <h1 className="font-semibold text-4xl text-[#0f2043] mb-4">
          What would you like to do?
        </h1>
        <p className="text-base text-[#0f2043] text-opacity-40 mb-1">
          To continue, choose an option to either create a new one or
        </p>
        <p className="text-base text-[#0f2043] text-opacity-40 mb-2">
          log into an existing profile.
        </p>
      </Box>

      {/* Buttons */}
      <Box>
        <Button
          onClick={() => navigate("/profile-setup")}
          variant="contained"
          sx={{
            marginTop: "1rem",
            backgroundColor: "#0f2043",
            textTransform: "none",
            width: "100%",
            maxWidth: "300px",
            borderRadius: "0.5rem",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#0c1833",
              boxShadow: "none",
            },
          }}
        >
          Set up a New Profile
        </Button>
        <Button
          variant="outlined"
          sx={{
            marginTop: "1rem",
            borderColor: "#0f2043",
            color: "#0f2043",
            textTransform: "none",
            width: "100%",
            maxWidth: "300px",
            borderRadius: "0.5rem",
          }}
          onClick={loginExistingProfile}
        >
          Log in Existing Profile
        </Button>
      </Box>
    </Box>
  );
};

export default AddExistingProfile;
