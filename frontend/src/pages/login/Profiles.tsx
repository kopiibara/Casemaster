import React, { useState, useEffect} from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "./capy.jpg";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { useAppContext } from "../../AppContext";

interface Profile {
  user_id: number;
  name: string;
  role: string;
  image: string;
  email: string;
  phone: string;
}

const Profile = () => {
  const navigate = useNavigate();
const { profileData } = useAppContext();
 const { fullName, email, phoneNo, image, role } = profileData;
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined); 

  useEffect(() => {
    if (image) {
      const objectURL = URL.createObjectURL(image);
      setImageUrl(objectURL);

      return () => {
        URL.revokeObjectURL(objectURL);
      };
    }
  }, [image]);


  const handleBack = () => {
    navigate("/");
  };

  const goToProfileSelection = () => {
    navigate("/profile-selection");
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
        bgcolor: "#f9fafb",
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
          cursor: "pointer",
        }}
        onClick={handleBack}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "&:hover": { bgcolor: "rgba(0, 0, 0, 0.05)" },
          }}
        >
          <ArrowBackIcon sx={{ color: "#0f2043" }} />
        </Box>
        <Box sx={{ fontSize: "0.875rem", color: "#0f2043" }}>Back</Box>
      </Box>

      {/* Centered Content */}
      <Box sx={{ mt: 6 }}>
        <h2
          style={{
            fontWeight: "bold",
            fontSize: "1.875rem",
            color: "#0f2043",
            marginBottom: "0.5rem",
          }}
        >
          Profile created successfully!
        </h2>
        <p
          style={{
            fontSize: "1.125rem",
            color: "rgba(15, 32, 67, 0.6)",
            marginBottom: "1.5rem",
          }}
        >
          Go back to the profile selection page to login.
        </p>
      </Box>

      {/* Profile Card */}
      <Box
        sx={{
          width: "16rem",
          height: "14rem",
          border: "1px solid rgba(15, 32, 67, 0.2)",
          borderRadius: "0.75rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          p: 4,
          bgcolor: "white",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          mb: 4,
        }}
      >
        <Box
          sx={{
            backgroundImage: `url(${imageUrl || ProfileIcon})`,
            width: "70px",
            height: "70px",
            backgroundSize: "cover",
            borderRadius: "50%",
            mb: "1rem",
          }}
        ></Box>
        <Box
          component="h4"
          sx={{
            fontSize: "1.125rem",
            fontWeight: "600",
            color: "#0f2043",
            mb: "0.5rem",
          }}
        >
          {fullName}
        </Box>
        <Box
          component="p"
          sx={{
            fontSize: "0.875rem",
            color: "#0f2043",
            opacity: 0.6,
          }}
        >
          {role}
        </Box>
      </Box>

      {/* Button */}
      <Box>
        <Button
          variant="contained"
          onClick={goToProfileSelection}
          sx={{
            textTransform: "none",
            bgcolor: "#517FD3",
            borderRadius: "0.625rem",
            padding: "0.5rem 2rem",
            fontSize: "1rem",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#3D6FBF",
              boxShadow: "none",
            },
          }}
        >
          Go to Profile Selection
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
