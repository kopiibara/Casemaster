import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface VerificationProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  email: string;
  phone: number;
  method: "email" | "phone";
  handleCloseModal: () => void;
}

const Verification: React.FC<VerificationProps> = ({
  method = "email",
  handleCloseModal,
  email,
  phone,
  onConfirm,
}) => {
  const [verificationMethod, setVerificationMethod] = useState(method);
  const [code, setCode] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const navigate = useNavigate();

  const handleSwitchMethod = () => {
    setVerificationMethod((prev) => (prev === "email" ? "phone" : "email"));
  };

  const handleVerifyCode = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/validate-verification-code", {
        to: email,
        code: verificationCode,
      });
      console.log(response.data.message || "Email verified successfully!");
      handleCloseModal();
      navigate("/dashboard"); 
      
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
      }}
    >
      {/* Header */}
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
        }}
      >
        {verificationText}
      </Typography>

      {/* Input Field */}
      <Box>
        <TextField
          label="Enter Code"
          variant="outlined"
          value={code}
          onChange={(e) => setCode(e.target.value)}
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
            onClick={handleVerifyCode}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Verification;
