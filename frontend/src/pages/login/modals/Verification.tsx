import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../../AppContext";

interface VerificationProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
  name: string;
  email: string;
  phone: string;
  method: "email" | "phone";
  role: string;
  image: string | null;
  isApproved: boolean;
  pin: string;
  user_id: number;
  handleCloseModal: () => void;
}

const Verification: React.FC<VerificationProps> = ({
  user_id,
  name,
  method = "email",
  handleCloseModal,
  email,
  phone,
  role,
  image,
  isApproved,
  pin,
  onConfirm,
}) => {
  const [verificationMethod, setVerificationMethod] = useState(method);
  const [code, setCode] = useState("");
  const { setProfileData } = useAppContext();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSwitchMethod = () => {
    setVerificationMethod((prev) => (prev === "email" ? "phone" : "email"));
  };

  const concealEmail = (email: string) => {
    const [username, domain] = email.split('@');
    const maskedUsername = username.slice(0, 3) + '*****'; // Mask part of the username
    return `${maskedUsername}@${domain}`;
  };

  useEffect(() => {
    setMessage(`${name} logged in successfully`);
  }, [name]);

  const handleSendEmail = async () => {
   
    try {
      const response = await axios.post(
        "http://localhost:3000/api/send-verification-email",
        { to: email }
      );
      console.log(response.data.message || "Email sent successfully!");
    } catch (err: any) {
      if (err.response) {
        console.log(err.response.data.error || "Failed to send email.");
      } else if (err.request) {
        console.log("No response from the server. Please try again.");
      } else {
        console.log("Error: " + err.message);
      }
    } finally { 
    }
  };
  
  const handleVerifyEmail = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/validate-verification-code", {
        to: email,
        code: code,
      });
      console.log(response.data.message || "Email verified successfully!");
      setProfileData({
        id: user_id,
        fullName: name,
        email: email,
        phoneNo: phone,
        image: null,
        selectedProfileImage: image,
        role: role,
        isApproved: isApproved,
        pin: pin,
      });
      saveActionLog(user_id, getCurrentDateTime());
      
      handleCloseModal();
      navigate("/dashboard/Dashboard"); 

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

  const getCurrentDateTime = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

const saveActionLog = async (userId: number, actionDateTime: string) => {
  const payload = {
    user_Id: userId,
    message: message,
    action_date_time: actionDateTime,
  };

  try {
    const response = await axios.post('http://localhost:3000/api/action-log', payload);
    console.log('Action log saved successfully:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error saving action log:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};


  const verificationText =
    verificationMethod === "email" ? (
      <>
        <Typography variant="body1" color="text.secondary">
          An email with a 6-digit verification code
        </Typography>
        <Typography variant="body1" color="text.secondary">
          was just sent to <strong>({concealEmail(email)}).</strong>
        </Typography>
      </>
    ) : (
      <>
        <Typography variant="body1" color="text.secondary">
          An SMS with a 6-digit verification code
        </Typography>
        <Typography variant="body1" color="text.secondary">
          was just sent to <strong>({phone}).</strong>
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
              onClick={handleSendEmail}
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
    </Box>
  );
};

export default Verification;