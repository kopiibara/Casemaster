import React, {useEffect, useState} from "react";
import { Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { useAppContext } from "../../../AppContext";
import AlertSnackbar from "../../../components/AlertComponent";

interface Profile {
  user_id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  image: string; 
  pin: string;
  isApproved: boolean;
}

const LoginExistingProfile = () => {
  const navigate = useNavigate();
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [inputEmail, setInputEmail] = useState<string>("");
    const [emailExists, setEmailExists] = useState<boolean | null>(null);
   const { setProfileData } = useAppContext();
       const [open, setOpen] = useState(false);
       const [message, setMessage] = useState("");
       const [severity, setSeverity] = useState<"success" | "error">("success");
   
     const showAlert = (message: string, severity: "success" | "error") => {
       setMessage(message);
       setSeverity(severity);
       setOpen(true);
     };
     const handleClose = () => {
       setOpen(false);
     };

    useEffect(() => {
      const fetchProfiles = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/get-profiles');
          const profilesWithValidImages = response.data.map((profile: Profile) => ({
            ...profile,
            image: profile.image || 'path/to/default/image.jpg' // Replace with your default image path
          }));
          setProfiles(profilesWithValidImages);
          console.log(profilesWithValidImages);
        } catch (error) {
          console.error("Failed to fetch profiles", error);
        } finally {
        }
      };
  
      fetchProfiles();
    }, []);


    const base64ToBlob = (base64: string, mimeType: string) => {
      const byteCharacters = atob(base64.split(",")[1]); // Remove the data:image/*;base64 part
      const byteArrays = [];
      for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
      }
      return new Blob(byteArrays, { type: mimeType });
    };
  
    const handleCheckEmail = () => {
    const matchedProfile = profiles.find((profile) => profile.email === inputEmail);

    if (matchedProfile) {
      setEmailExists(true);
      console.log("Email exists:", inputEmail);

      // Set the profile data in the global AppContext
      setProfileData({
        id: matchedProfile.user_id,
        fullName: matchedProfile.name,
        email: matchedProfile.email,
        phoneNo: matchedProfile.phone,
        image: base64ToBlob(matchedProfile.image, "image/jpeg"), 
        selectedProfileImage: matchedProfile.image,
        role: matchedProfile.role,
        isApproved: matchedProfile.isApproved,
        pin: matchedProfile.pin,
      });
      
      // Navigate to the next page (password page or similar)
      navigate("/existing-profile-pin");
    } else {
      setEmailExists(false);
      console.log("Email not found:", inputEmail);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(event.target.value); // Update inputEmail state with the typed value
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
          value={inputEmail} 
          onChange={handleEmailChange}
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
            onClick={handleCheckEmail}
          >
            Continue
          </Button>
        </Box>
      </Box>
      <AlertSnackbar
  open={open}
  message={message}
  severity={severity}
  onClose={handleClose}
/>
    </Box>
  );
};

export default LoginExistingProfile;