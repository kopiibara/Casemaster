import React from "react";
import { TextField, Box } from "@mui/material";
import Profile from "../Profiles";

interface EnterPinProps {
  selectedProfile: Profile;
  pinValues: string[];
  showPin: boolean;
  errorIndexes: number[];
  inputRefs: React.RefObject<HTMLInputElement>[];
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => void;
  handleCloseModal: () => void;
  setCurrentView: (view: string) => void;
}

const EnterPin: React.FC<EnterPinProps> = ({
  selectedProfile,
  pinValues,
  showPin,
  errorIndexes,
  inputRefs,
  handleInputChange,
  setCurrentView,
}) => (
  <Box className="flex items-center justify-center flex-col mt-3">
    <Box
      className="h-12 w-12 rounded-full mb-3"
      sx={{
        backgroundImage: `url(${selectedProfile?.image})`,
        backgroundSize: "cover",
      }}
    ></Box>
    <p style={{ fontSize: "0.9rem", color: "#0f2043" }}>
      {selectedProfile?.name}
    </p>
    <h3 className="text-3xl font-semibold mb-6 text-[#0f2043] mt-2">
      Enter your PIN
    </h3>
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
    </Box>
    <p className="text-[#517fd3] text-xs">
      Forgot your PIN?{" "}
      <strong
        className="cursor-pointer"
        onClick={() => setCurrentView("forgot-pin")}
      >
        Click here for help
      </strong>
    </p>
  </Box>
);

export default EnterPin;
