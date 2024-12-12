import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import { Box, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ConfirmExistingProfile = () => {
  const [verificationMethod, setVerificationMethod] = useState("email");
  const navigate = useNavigate();

  const handleSwitchMethod = () => {
    setVerificationMethod((prev) => (prev === "email" ? "phone" : "email"));
  };

  const verificationText =
    verificationMethod === "email" ? (
      <>
        <Typography variant="body1" color="text.secondary">
          An email with a 6-digit verification code
        </Typography>
        <Typography variant="body1" color="text.secondary">
          was just sent to <strong>(t*****@gmail.com).</strong>
        </Typography>
      </>
    ) : (
      <>
        <Typography variant="body1" color="text.secondary">
          An SMS with a 6-digit verification code
        </Typography>
        <Typography variant="body1" color="text.secondary">
          was just sent to <strong>(+123 **** 5678).</strong>
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
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmExistingProfile;
