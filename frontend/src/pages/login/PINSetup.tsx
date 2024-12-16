import React, { useState, useRef, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { useAppContext } from "../../AppContext";
import axios from "axios";

const PINSetUp = () => {
  const navigate = useNavigate();
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [showPin, setShowPin] = useState(true);
  const [pinValues, setPinValues] = useState(["", "", "", ""]);
  const [errorIndexes, setErrorIndexes] = useState<number[]>([]);
  const [currentView, setCurrentView] = useState<"set-pin" | "confirm-pin">(
    "set-pin"
  );
  const [setPin, setSetPin] = useState<string>("");
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


  useEffect(() => {
    console.log(profileData);  // Check if fullName is properly populated
  }, [profileData]);


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { value } = e.target;
    const newPinValues = [...pinValues];

    if (/^\d$/.test(value)) {
      newPinValues[index] = value;

      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current?.focus();
      }
    } else if (value === "") {
      newPinValues[index] = value;

      if (index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    }

    setPinValues(newPinValues);
  };

  const handleConfirm = () => {
    if (currentView === "set-pin") {
      const enteredPin = pinValues.join("");
      if (enteredPin.length === 4) {
        setSetPin(enteredPin);
        setPinValues(["", "", "", ""]);
        setCurrentView("confirm-pin");
      } else {
        setErrorIndexes([0, 1, 2, 3]);
        setTimeout(() => {
          setErrorIndexes([]);
        }, 1000);
      }
    } else if (currentView === "confirm-pin") {
      const enteredPin = pinValues.join("");
      if (enteredPin === setPin) {

        handleSubmitProfile();
        setPinValues(["", "", "", ""]); // Reset here after successful profile creation
      } else {
        setErrorIndexes([0, 1, 2, 3]);
        setTimeout(() => {
          setErrorIndexes([]);
        }, 1000);
        setPinValues(["", "", "", ""]);
      }
    }
  };

  const handleSubmitProfile = async () => {
    const formData = new FormData();
    formData.append("name", fullName);
    formData.append("email", email);
    formData.append("phone", phoneNo);
    if (image) {
      formData.append("image", image); // Add image file to form data
    }
    formData.append("role", role);
    formData.append("pin", pinValues.join(""));
  
    try {
      const response = await axios.post("http://localhost:3000/api/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Profile setup successful", response.data);
      navigate("/profiles");
    } catch (err) {
      console.error("Error uploading profile", err);
    }
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
      <Box>
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
      </Box>

      {/* Centered Content */}
      <Box>
        <h1 className="font-bold text-3xl text-[#0f2043] mb-2">
          {currentView === "set-pin"
            ? "Set your PIN Code"
            : "Confirm your PIN Code"}
        </h1>
        <p className="text-lg text-[#0f2043] text-opacity-40 mb-6">
          {currentView === "set-pin"
            ? "Make sure it's easy to remember!"
            : "Please re-enter your PIN to continue."}
        </p>
      </Box>

      {/* PIN Input Fields */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        {inputRefs.map((ref, index) => (
          <TextField
            key={index}
            inputRef={ref}
            type={showPin ? "password" : "text"}
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: "center",
                fontSize: "2rem",
                padding: 0,
                margin: 0,
              },
            }}
            value={pinValues[index]}
            onChange={(e) => handleInputChange(e, index)}
            className="w-20 mr-2"
            variant="outlined"
            error={errorIndexes.includes(index)}
            sx={{
              borderRadius: "10px",
              margin: "0.3rem",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                height: "5.5rem",
                backgroundColor:
                  pinValues[index] !== "" ? "#517FD3" : "transparent",
                "& fieldset": {
                  borderColor: errorIndexes.includes(index)
                    ? "#D32F2F" // Red border for errors
                    : pinValues[index] !== ""
                    ? "#517FD3"
                    : "rgba(0,0,0,0.1)",
                  transition: "border-color 0.3s ease-in-out", // Smooth border color transition
                },
                "&:hover fieldset": {
                  borderColor:
                    pinValues[index] === "" ? "rgba(0,0,0,0.2)" : "#517FD3",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errorIndexes.includes(index)
                    ? "#D32F2F"
                    : "#517FD3",
                },
              },
              "& input": {
                color: pinValues[index] !== "" ? "#fff" : "inherit",
                height: "100%",
                boxSizing: "border-box",
                padding: 0,
                margin: 0,
                borderRadius: "10px",
                textAlign: "center",
                fontSize: "2rem",
              },
              "&.Mui-error": {
                borderColor: "#D32F2F", // Error border when the entire component has an error state
                backgroundColor: "rgba(211, 47, 47, 0.1)", // Light red background for errors
              },
            }}
          />
        ))}
        <p>{profileData.email}</p>
        <p>{profileData.fullName}</p>
        <img src={imageUrl} alt="Profile" width="100" height="100" />
      </Box>

      {/* Confirm Button */}
      <Box>
        <Button
          variant="contained"
          onClick={handleConfirm}
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#3D6FBF",
              boxShadow: "none",
            },
          }}
          disabled={pinValues.some((value) => value === "")}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default PINSetUp;
