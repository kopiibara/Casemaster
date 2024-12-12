import React from "react";
import { Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const LoginExistingProfile = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/existing-profile-pin");
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
          onClick={() => navigate(-1)}
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
        <h1 className="font-semibold text-3xl text-[#0f2043] mb-2">
          Log into an existing profile
        </h1>
        <p className="text-base text-[#0f2043] text-opacity-40 mb-7">
          Use your email or phone to log your profile.
        </p>
      </Box>

      {/* Input and Buttons */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="input"
          className="w-96 h-12 bg-transparent border rounded-md"
          sx={{
            width: "100%",
            height: "3rem",
            border: "1px solid rgba(0, 0, 0, 0.23)",
            borderRadius: "0.375rem",
            padding: "0.5rem",
            mb: 4,
            "&:focus": {
              outline: "none",
              borderColor: "#517fd3",
            },
          }}
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <Box
            component="p"
            sx={{
              fontSize: "0.875rem",
              color: "#517fd3",
              cursor: "pointer",
            }}
          >
            Set up new profile
          </Box>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: "0.5rem",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#3D6FBF",
                boxShadow: "none",
              },
            }}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginExistingProfile;
