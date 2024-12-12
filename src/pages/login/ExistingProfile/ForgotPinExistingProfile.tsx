import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  TextField,
  Box,
  FormLabel,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router
import Icon from "../icon.png";

const ForgotPINExisting: React.FC = () => {
  // Mock profile data
  const selectedProfile = {
    email: "user@example.com",
    phone: "+1234567890",
  };

  const [selectedMethod, setSelectedMethod] = useState<string>("email");
  const [currentStep, setCurrentStep] = useState<string>("method-selection");
  const [code, setCode] = useState<string>("");
  const navigate = useNavigate();

  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(event.target.value);
  };

  const handleSubmitMethod = () => {
    setCurrentStep(
      selectedMethod === "email" ? "email-verification" : "sms-verification"
    );
  };

  const handleSubmitCode = () => {
    setCurrentStep("reset-pin");
  };

  const handleResetPin = () => {
    setCurrentStep("success");
  };

  const VerificationView = ({ type }: { type: string }) => {
    const isEmailVerification = type === "email";

    return (
      <Box className="flex items-center justify-center flex-col mt-8">
        <h3 className="font-semibold text-3xl text-[#0f2043] mt-2">
          Enter Security Code
        </h3>
        <FormLabel
          component="legend"
          className="text-xl text-[#0f2043] text-opacity-40 mt-4 mb-5 tracking-tight text-center"
        >
          A 6-digit verification code was just sent to{" "}
          <b>
            {isEmailVerification
              ? selectedProfile.email
              : selectedProfile.phone}
          </b>{" "}
        </FormLabel>
        <TextField
          label="Enter Code"
          variant="outlined"
          inputProps={{ maxLength: 6 }}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mb-4"
          sx={{ width: "100%" }}
        />
        <Box className="flex justify-center items-center w-full mt-3">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitCode}
            className="mt-4"
            sx={{
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#3D6FBF",
                boxShadow: "none",
              },
              textTransform: "none",
              marginTop: "1rem",
            }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    );
  };

  const ResetPinView = () => (
    <Box className="flex items-center justify-center flex-col mt-2">
      <h3 className="font-semibold text-3xl text-[#0f2043] mt-2">
        Set New PIN
      </h3>
      <FormLabel
        component="legend"
        className="text-xl text-[#0f2043] text-opacity-40 mt-4 tracking-tight text-center"
      >
        Avoid using easy to guess PINs like <br /> 1234 or 0000 or your
        birthdate.
      </FormLabel>
      <Box className="flex flex-col items-center w-full mt-6 mb-2 gap-5">
        <TextField
          label="New PIN"
          type="password"
          variant="outlined"
          inputProps={{ maxLength: 6 }}
          className="mb-4"
          sx={{ width: "120%" }}
        />
        <TextField
          label="Verify New PIN"
          type="password"
          variant="outlined"
          inputProps={{ maxLength: 6 }}
          sx={{ width: "120%" }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleResetPin}
        className="mt-8"
        sx={{
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#3D6FBF",
            boxShadow: "none",
          },
          marginTop: "1rem",
        }}
      >
        Submit
      </Button>
    </Box>
  );

  const SuccessView = () => (
    <Box className="flex items-center justify-center flex-col mt-12 gap-1">
      <Box
        component="img"
        src={Icon}
        alt="Success Icon"
        sx={{ width: 40, height: "auto", mb: 2 }}
      />
      <h3 className="font-semibold text-3xl text-[#0f2043] mt-2">
        PIN Successfully Reset
      </h3>
      <FormLabel
        component="legend"
        className="text-xl text-[#0f2043] text-opacity-40 mt-4 tracking-tight text-center"
      >
        Your PIN has been successfully reset. <br />
        You can now use your new PIN to access your account.
      </FormLabel>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/login")}
        className="mt-4"
        sx={{
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#3D6FBF",
            boxShadow: "none",
          },
          marginTop: "1rem",
        }}
      >
        Close
      </Button>
    </Box>
  );

  const MethodSelectionView = () => (
    <Box className="flex items-center justify-center flex-col mt-3">
      <h3 className="font-semibold text-3xl text-[#0f2043] mt-2 mb-3">
        Forgot your PIN?
      </h3>
      <FormLabel
        component="legend"
        className="text-xl text-[#0f2043] text-opacity-40 mt-2 mb-2 tracking-tight text-center"
      >
        Choose how you want to recover your account:
      </FormLabel>
      <RadioGroup
        value={selectedMethod}
        onChange={handleMethodChange}
        className="mb-4"
      >
        <FormControlLabel
          value="email"
          control={<Radio />}
          label={`Send code via email (${selectedProfile.email})`}
        />
        <FormControlLabel
          value="phone"
          control={<Radio />}
          label={`Send code via sms ${selectedProfile.phone}`}
        />
      </RadioGroup>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitMethod}
        sx={{
          boxShadow: "none",
          "&:hover": {
            backgroundColor: "#3D6FBF",
            boxShadow: "none",
          },
          textTransform: "none",
        }}
      >
        Confirm
      </Button>
    </Box>
  );

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
      {currentStep === "method-selection" && <MethodSelectionView />}
      {currentStep === "email-verification" && (
        <VerificationView type="email" />
      )}
      {currentStep === "sms-verification" && <VerificationView type="sms" />}
      {currentStep === "reset-pin" && <ResetPinView />}
      {currentStep === "success" && <SuccessView />}
    </Box>
  );
};

export default ForgotPINExisting;
