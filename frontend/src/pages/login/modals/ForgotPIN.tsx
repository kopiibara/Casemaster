import React, { useState, useRef } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Button,
  TextField,
  Box,
} from "@mui/material";
import Profile from "../Profiles";
import Icon from "../icon.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const newPinRef = useRef<HTMLInputElement>(null);
  const verifyPinRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();


  const handleChangePin = () => {
    const newPin = newPinRef.current?.value;
    const verifyPin = verifyPinRef.current?.value;
    if (newPin && verifyPin) {
      if (newPin === verifyPin) {
        console.log("PINs match!");
        handleNewPin();
        setError("");
      } else {
        setError(newPin);
      }
    } else {
      setError("Please fill in both fields.");
    }
  };


  const handleNewPin= async () => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/change-pin",
        { pin: newPinRef.current?.value ,
          userId: selectedProfile.user_id
         }
      );
      setCurrentStep("success");
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


  const handleSendEmail = async () => {
   
    try {
      const response = await axios.post(
        "http://localhost:3000/api/send-verification-email",
        { to: selectedProfile.email }
      );
      setCurrentStep("email-verification");
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
        to: selectedProfile.email,
        code: code,
      });
      setCurrentStep("reset-pin");
      console.log(response.data.message || "Email verified successfully!");

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

  const handleSuccess = () => {
    handleCloseModal();
    window.location.reload();
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
              <span className="tracking-tight text-[#517FD3] cursor-pointer text-xs" onClick={handleSendEmail}>
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
            onClick={handleVerifyEmail}
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
        1234 or {selectedProfile.user_id} or your birthdate.
      </p>
      <Box className="flex flex-col items-center w-full mt-6 gap-5">
        <TextField
          label="New PIN"
          type="password"
          variant="outlined"
          inputProps={{ maxLength: 4 }}
          className="mb-4"
          sx={{ width: "120%" }}
          inputRef={newPinRef}
        />
        <TextField
          label="Verify New PIN"
          type="password"
          variant="outlined"
          inputProps={{ maxLength: 4 }}
          sx={{ width: "120%" }}
          inputRef={verifyPinRef}
        />
      </Box>
      {error && (
        <Box sx={{ color: "red", marginTop: "10px" }}>
          <p>{error}</p>
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleChangePin}
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
        onClick={handleSuccess}
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
            onClick={handleSendEmail}
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
