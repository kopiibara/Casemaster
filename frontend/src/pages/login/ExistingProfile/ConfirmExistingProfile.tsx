import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import { Box, Typography, TextField, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../AppContext";
import axios from "axios";
import AlertSnackbar from "../../../components/AlertComponent";


const ConfirmExistingProfile = () => {
  const [verificationMethod, setVerificationMethod] = useState("email");
  const navigate = useNavigate();
  const { profileData } = useAppContext();
  const [code, setCode] = useState("");
 const [id, setId] = useState<number>(0);
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
  console.log("Closed");
};

  const handleSwitchMethod = () => {
    setVerificationMethod((prev) => (prev === "email" ? "phone" : "email"));
  };

  useEffect(() => {
    setId(profileData.id || 0);
    console.log(profileData.id);

    showAlert("Email Verification sent", "success");

  });


  const handleVerifyEmail = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/validate-verification-code", {
        to: profileData.email,
        code: code,
      });
      handleAddProfileCard(id);
      console.log(response.data.message || "Email verified successfully!");
      navigate("/profile-selection"); 

    } catch (err: any) {
      if (err.response) {
        console.log(err.response.data.error || "Invalid verification code.");
      } else if (err.request) {
        console.log("No response from the server. Please try again.");
      } else {
        console.log("Error: " + err.message);
      }
    } finally {
    }
  };

  const handleAddProfileCard = async (userId : number) => {
    try {
      await axios.put("http://localhost:3000/api/add-profile-card", { userId });
      console.log("Profile added successfully!");
      
    } catch (error) {
      console.error("Can't remove profile", error);
    }
  };


  const verificationText =
    verificationMethod === "email" ? (
      <>
        <Typography variant="body1" color="text.secondary">
          An email with a 6-digit verification code
        </Typography>
        <Typography variant="body1" color="text.secondary">
          was just sent to <strong>({profileData.email}).</strong>
        </Typography>
      </>
    ) : (
      <>
        <Typography variant="body1" color="text.secondary">
          An SMS with a 6-digit verification code
        </Typography>
        <Typography variant="body1" color="text.secondary">
          was just sent to <strong>(+{profileData.phoneNo}).</strong>
        </Typography>
      </>
    );

  const switchMethodText =
    verificationMethod === "email"
      ? "Verify phone instead"
      : "Verify email instead";

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
        <Typography sx={{ fontSize: "0.875rem", color: "#0f2043" }}>
          Back
        </Typography>
      </Box>

      {/* Verification Content */}
      <Stack
        spacing={2}
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "semi-bold", color: "#0f2043", mb: 2 }}
        >
          2-step Verification
        </Typography>
        <Typography
          sx={{
            fontSize: "1rem",
            color: "#0f2043",
            opacity: 0.6,
            mb: 3,
            textAlign: "center",
          }}
        >
          {verificationText}
        </Typography>

        {/* Input Field */}
        <Box>
          <TextField
            label="Enter Code"
            variant="outlined"
            inputProps={{ maxLength: 6 }}
            sx={{
              width: "24rem",
              backgroundColor: "transparent",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            onChange={(e) => setCode(e.target.value)}
          />

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "24rem",
              mt: 3,
            }}
          >
            <Box sx={{ textAlign: "left" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#517FD3",
                  cursor: "pointer",
                  mb: 1,
                }}
              >
                Resend Code
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#517FD3",
                  cursor: "pointer",
                }}
                onClick={handleSwitchMethod}
              >
                {switchMethodText}
              </Typography>
            </Box>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: "0.5rem",
                height: "2.5rem",
                backgroundColor: "#517FD3",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#3D6FBF",
                  boxShadow: "none",
                },
              }}
              onClick={handleVerifyEmail}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Stack>
      <AlertSnackbar
  open={open}
  message={message}
  severity={severity}
  onClose={handleClose}
/>
    </Box>
  );
};

export default ConfirmExistingProfile;