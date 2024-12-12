import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Button,
  TextField,
  Box,
} from "@mui/material";
import Icon from "../icon.png";

interface Profile {
  id: number;
  name: string;
  email: string;
  phone: number;
  role: string;
  image: Blob;
  pin: string;
}

interface ForgotPasswordProps {
  selectedProfile: Profile;
  handleCloseModal: () => void;
  setCurrentView: (view: string) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  selectedProfile,
  handleCloseModal,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("email");
  const [currentStep, setCurrentStep] = useState<string>("method-selection");
  const [code, setCode] = useState<string>("");

  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(event.target.value);
  };

  const handleSubmitMethod = () => {
    if (selectedMethod === "email") {
      setCurrentStep("email-verification");
    } else if (selectedMethod === "phone") {
      setCurrentStep("sms-verification");
    }
  };

  const handleSubmitCode = () => {
    console.log("Submitted code:", code);
    setCurrentStep("reset-pin");
  };

  const handleResetPin = () => {
    setCurrentStep("success");
  };

  const VerificationView = ({ type }: { type: string }) => {
    const [isEmailVerification, setIsEmailVerification] = useState<boolean>(
      type === "email"
    );

    const toggleVerificationMethod = () => {
      setIsEmailVerification(!isEmailVerification);
    };

    return (
      // EMAIL VERIFICATION
      <Box className="flex items-center justify-center flex-col item mt-8">
        <h3 className="font-semibold text-3xl text-[#0f2043] mt-2">
          Enter Security Code
        </h3>
        <p className="text-[#0f2043] text-opacity-40 mt-4 text-center">
          A 6-digit verification code was
        </p>
        <p className="text-[#0f2043] text-opacity-40 text-center mb-6">
          just sent to{" "}
          <b>
            {isEmailVerification
              ? selectedProfile.email
              : selectedProfile.phone}{" "}
          </b>
          .
        </p>
        <TextField
          label="Enter Code"
          variant="outlined"
          inputProps={{ maxLength: 6 }}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mb-4"
          sx={{ width: "100%" }}
        />
        <Box className="flex justify-between items-center w-full mt-3">
          <Box className="mt-4">
            <p className="flex justify-center items-start flex-col">
              <span className="tracking-tight text-[#517FD3] cursor-pointer text-xs">
                Resend Code
              </span>
              <span
                className="tracking-tight text-[#517FD3] cursor-pointer text-xs mt-1"
                onClick={toggleVerificationMethod}
              >
                Verify {isEmailVerification ? "phone" : "email"} instead
              </span>
            </p>
          </Box>
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
      <p className="text-sm text-[#0f2043] text-opacity-40 text-center mt-4">
        Avoid using easy to guess PINs like
      </p>
      <p className="text-sm text-[#0f2043] text-opacity-40 text-center">
        1234 or 0000 or your birthdate.
      </p>
      <Box className="flex flex-col items-center w-full mt-6 gap-5">
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
        className="mt-6"
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
    <Box className="flex items-center justify-center flex-col mt-14 gap-1">
      <Box
        component="img"
        src={Icon}
        alt="Success Icon"
        sx={{ width: 40, height: "auto", mb: 2 }}
      />
      <h3 className="font-semibold text-3xl text-[#0f2043] mt-2">
        PIN Successfully Reset
      </h3>
      <p className="text-sm text-[#0f2043] text-opacity-40 text-center mt-4">
        Your PIN has been successfully reset. <br />
        You can now use your new PIN to access your account.
      </p>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCloseModal}
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
      <h3 className="font-semibold text-3xl text-[#0f2043] mt-2">
        Forgot your PIN?
      </h3>
      <FormLabel
        component="legend"
        className="text-xl text-[#0f2043] text-opacity-40 mt-4 mb-2 tracking-tight text-center"
      >
        Choose how you want to recover your account:
      </FormLabel>
      <Box
        className="justify-center mt-2 text-[#0f2043]"
        sx={{ maxWidth: "100%" }}
      >
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
        <Box className="flex items-center justify-center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitMethod}
            className="mt-4"
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
      </Box>
    </Box>
  );

  return (
    <>
      {currentStep === "method-selection" && <MethodSelectionView />}
      {currentStep === "email-verification" && (
        <VerificationView type="email" />
      )}
      {currentStep === "sms-verification" && <VerificationView type="sms" />}
      {currentStep === "reset-pin" && <ResetPinView />}
      {currentStep === "success" && <SuccessView />}
    </>
  );
};

export default ForgotPassword;
