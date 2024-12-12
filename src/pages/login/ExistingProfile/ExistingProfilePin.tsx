import React, { useState, useRef } from "react";
import { Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

const ExistingProfilePin = () => {
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
  const selectedProfile = {
    image: "https://via.placeholder.com/150", // Replace with the actual image URL
    name: "John Doe", // Replace with the actual profile name
  };

  const tempPin = "1234"; // Temporary PIN for validation

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
    if (
      newPinValues.join("") === tempPin &&
      newPinValues.every((val) => val !== "")
    ) {
      navigate("/confirm-existing-profile");
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

      {/* Profile Image and Name */}
      <Box
        className="h-12 w-12 rounded-full mb-3"
        sx={{
          backgroundImage: `url(${selectedProfile?.image})`,
          backgroundSize: "cover",
          width: 48,
          height: 48,
          borderRadius: "50%",
        }}
      ></Box>
      <p style={{ fontSize: "0.9rem", color: "#0f2043", marginBottom: "1rem" }}>
        {selectedProfile?.name}
      </p>

      {/* Centered Content */}
      <h1 className="font-semibold text-3xl text-[#0f2043]">
        Enter your PIN Code
      </h1>

      {/* PIN Input Fields */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: "1.5rem" }}>
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
                    ? "#D32F2F"
                    : pinValues[index] !== ""
                    ? "#517FD3"
                    : "rgba(0,0,0,0.1)",
                  transition: "border-color 0.3s ease-in-out",
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
                borderColor: "#D32F2F",
                backgroundColor: "rgba(211, 47, 47, 0.1)",
              },
            }}
          />
        ))}
      </Box>
      <p className="text-[#517fd3] text-xs mt-6">
        Forgot your PIN?{" "}
        <strong
          className="cursor-pointer"
          onClick={() => navigate("/forgot-pin-existing")}
        >
          Click here for help
        </strong>
      </p>
    </Box>
  );
};

export default ExistingProfilePin;
