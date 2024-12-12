import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "./capy.jpg"; // Default image
import { Box, Button, IconButton } from "@mui/material";
import ModalView from "./ModalComponent";
import axios from "axios";
import { useAppContext } from '../../AppContext';

interface Profile {
  user_id: number;
  name: string;
  email: string;
  phone: number;
  role: string;
  image: string; // Ensure this is nullable if image can be missing
  pin: string;
}

const ProfileSelection = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [imageUrls, setImageUrls] = useState<{ [key: number]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const { setProfileData } = useAppContext();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/get-profiles");
        setProfiles(response.data);
  
        // Map profiles to set image URLs or Base64 data
        const urls: { [key: number]: string } = {};
        response.data.forEach((profile: Profile) => {
          if (profile.image) {
            // Set the image source as a Data URL using Base64
            urls[profile.user_id] = `data:image/png;base64,${profile.image}`;
          }
        });
  
        console.log("Image URLs:", urls);
        setImageUrls(urls); // Store the image URLs in state
      } catch (err: any) {
        console.log("Failed to fetch profiles. Please try again.");
        console.error(err.message);
      }
    };
  
    fetchProfiles();
  }, []);
  

  const handleBack = () => {
    navigate("/");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProfile(null);
  };

  const goToProfile = (profile: Profile) => {
    console.log(`Selected Profile ID: ${profile.user_id}`);
    setSelectedProfile(profile);
    setIsModalOpen(true);

    setProfileData({
      fullName: profile.name,
      email: profile.email,
      phoneNo: profile.phone.toString(),
      image: imageUrls[profile.user_id] || ProfileIcon,
      role: profile.role,
    });
  };

  const handleAddNewProfile = () => {
    navigate("/add-existing-profile");
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
        p: 4,
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

      {/* Header */}
      <Box sx={{ mt: 6 }}>
        <h1
          style={{
            fontWeight: "bold",
            fontSize: "1.875rem",
            color: "#0f2043",
            marginBottom: "0.5rem",
          }}
        >
          Select your Profile
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "rgba(15, 32, 67, 0.6)",
            marginBottom: "1.5rem",
          }}
        >
          Select a profile to use then enter your PIN or create a new one.
        </p>
      </Box>

      {/* Profiles Section */}
      <Box
        sx={{
          display: "flex",
          gap: "2rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Existing Profiles */}
        {profiles.map((profile) => (
          <Box
            key={profile.user_id}
            onClick={() => goToProfile(profile)}
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
              cursor: "pointer",
              "&:hover": { boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)" },
            }}
          >
            <Box
              sx={{
                backgroundImage: `url(${imageUrls[profile.user_id] || ProfileIcon})`, // Show profile image or fallback to default
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
              {profile.name}
            </Box>
            <Box
              component="p"
              sx={{
                fontSize: "0.875rem",
                color: "#0f2043",
                opacity: 0.6,
              }}
            >
              {profile.role}
            </Box>
          </Box>
        ))}

        {/* Add New Profile Card */}
        <Box
          onClick={handleAddNewProfile}
          sx={{
            width: "16rem",
            height: "14rem",
            border: "1px dashed rgba(15, 32, 67, 0.4)",
            borderRadius: "0.75rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            p: 4,
            bgcolor: "#f9fafb",
            boxShadow: "none",
            cursor: "pointer",
            "&:hover": {
              bgcolor: "#e3eaf6",
            },
          }}
        >
          <IconButton
            sx={{
              width: "4rem",
              height: "4rem",
              bgcolor: "#517FD3",
              color: "#fff",
              mb: "1rem",
              "&:hover": { bgcolor: "#3D6FBF" },
            }}
          >
            <AddIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
          <Box
            component="h4"
            sx={{
              fontSize: "1.125rem",
              fontWeight: "600",
              color: "#0f2043",
              opacity: 0.8,
            }}
          >
            Add New Profile
          </Box>
        </Box>
      </Box>

      {/* Sign Out Button */}
      <Box sx={{ mt: 3 }}>
        <Button
          sx={{
            color: "red",
            textTransform: "none",
            border: "none",
            "&:hover": {
              bgcolor: "rgba(255, 0, 0, 0.1)",
            },
          }}
        >
          Sign out Microsoft Account
        </Button>
      </Box>

      {/* Modal */}
      {selectedProfile && (
        <ModalView
          isModalOpen={isModalOpen}
          currentView="enter-pin"
          handleCloseModal={handleCloseModal}
          selectedProfile={selectedProfile} // Pass selected profile here
        />
      )}
    </Box>
  );
};

export default ProfileSelection;
