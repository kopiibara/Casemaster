import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";
import {
  PublicClientApplication,
  AuthenticationResult,
  Configuration,
} from "@azure/msal-browser";
import { config } from "../../../config";
import { useAuth } from "./../../../context/AuthContext"; // Import useAuth hook
import axios from "axios";

const msalConfig: Configuration = {
  auth: {
    clientId: config.appId,
    authority: config.authority,
    redirectUri: config.redirectUri,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};


const msalInstance = new PublicClientApplication(msalConfig);

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);
  const { setTokens } = useAuth(); // Access the function to set both tokens
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    const initializeMsal = async () => {
      try {
        await msalInstance.initialize();
        setIsInitialized(true);
      } catch (error) {
        console.error("MSAL initialization failed:", error);
      }
    };

    initializeMsal();
  }, []);

  
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/get-profiles");
  
        if (response.data.length === 0) {
          setIsEmpty(true);
          console.log("The profiles table is empty.");
         
        } else {
          setIsEmpty(false);
          console.log("Profiles fetched successfully:", response.data);
        }
  
      } catch (error) {
        console.error("Failed to fetch profiles", error);
      }
    };
  
    fetchProfiles();
  }, []);
  

  const handleSignIn = async (): Promise<void> => {
    if (!isInitialized) {
      console.error("MSAL is not initialized yet.");
      return;
    }


    try {
      const loginResponse: AuthenticationResult = await msalInstance.loginPopup(
        {
          scopes: ["User.Read", "Mail.Read", "offline_access"], // Add offline_access for refresh token
          prompt: "select_account",
        }
      );

      const accessToken = loginResponse.accessToken;
      const refreshToken = loginResponse.idToken; // Use idToken as a stand-in for refresh token

      
      
      console.log("Access Token:", accessToken);
      console.log("Refresh Token (ID Token):", refreshToken);

      setTokens(accessToken, refreshToken); // Store both the access and refresh tokens

      if (isEmpty) {
        
        navigate("/profile-setup");
      } else {
        navigate("/profile-selection");
      }
     
      
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center justify-center flex-col text-center">
        <img
          src="/sign-in-logo-blue.png"
          alt="Sign-In Logo"
          style={{ width: "60px", height: "auto" }}
        />
        <p className="text-[6rem] font-bold text-[#0f2043]">CaseMaster</p>
        <p className="text-4xl text-[#0f2043]">
          Your go-to Legal Workflow Manager
        </p>
        <p className="text-l text-[rgba(15,32,67,0.3)] my-7">
          Putting ease in all your legal workflow—all in one place.
        </p>
        <Button
          onClick={handleSignIn}
          variant="contained"
          sx={{
            backgroundColor: "#0f2043",
            color: "white",
            width: "16rem",
            height: "2.5rem",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: "medium",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#0c1833", // Darker shade for hover
              boxShadow: "none",
            },
          }}
        >
          <Box
            component="img"
            src="/microsoft-logo.png" // Replace with the actual path to your Microsoft logo
            alt="Microsoft Logo"
            sx={{
              width: "1rem",
              height: "1rem",
              objectFit: "contain",
            }}
          />
          Sign In With Microsoft
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
