import React, { useState, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import EnterPin from "./modals/EnterPin";
import ForgotPIN from "./modals/ForgotPIN";
import Verification from "./modals/Verification";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

interface ModalViewProps {
  isModalOpen: boolean;
  currentView: string;
  handleCloseModal: () => void;

  selectedProfile: {
    user_id: number;
    name: string;
    role: string;
    image: string;
    email: string;
    phone: string;
    pin: string;
    isApproved: boolean;
  };
}



const ModalView: React.FC<ModalViewProps> = ({
  isModalOpen,
  currentView,
  handleCloseModal,
  selectedProfile,
}) => {
  const [pinValues, setPinValues] = useState<string[]>(new Array(4).fill(""));
  const [errorIndexes, setErrorIndexes] = useState<number[]>([]);
  const inputRefs = Array.from({ length: 4 }, () =>
    useRef<HTMLInputElement>(null)
  );
  const navigate = useNavigate();
  const [currentViewState, setCurrentViewState] = useState<string>(currentView);
  const correctPin = "1234";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { value } = e.target;

    if (/^\d$/.test(value) || value === "") {
      const updatedPinValues = [...pinValues];
      updatedPinValues[index] = value;
      setPinValues(updatedPinValues);

      if (value && index < inputRefs.length - 1) {
        inputRefs[index + 1].current?.focus();
      } else if (!value && index > 0) {
        inputRefs[index - 1].current?.focus();
      }

      if (updatedPinValues.join("") === selectedProfile.pin) {
        handleSendEmail();
        setCurrentViewState("verification"); // Show verification modal
      } else if (updatedPinValues.every((v) => v)) {
        setErrorIndexes([0, 1, 2, 3]);
      } else {
        setErrorIndexes([]);
      }
    }
  };

  const handleSendEmail = async () => {
    if (!selectedProfile.email) {
      console.log("Please enter your email address.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/api/send-verification-email", { to: selectedProfile.email }); 
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

  const renderView = () => {
    switch (currentViewState) {
      case "enter-pin":
        return (
          <EnterPin
            selectedProfile={selectedProfile}
            pinValues={pinValues}
            showPin={true}
            errorIndexes={errorIndexes}
            inputRefs={inputRefs}
            handleInputChange={handleInputChange}
            handleCloseModal={handleCloseModal}
            setCurrentView={setCurrentViewState}
          />
        );
      case "forgot-pin":
        return (
          <ForgotPIN
            selectedProfile={selectedProfile}
            handleCloseModal={handleCloseModal}
            setCurrentView={setCurrentViewState}
          />
        );

      case "verification":
        return (
          <Verification
            method="email" // Optionally use method dynamically
            email={selectedProfile.email} // Pass email
            phone={selectedProfile.phone}
            role={selectedProfile.role}
            name={selectedProfile.name}
            image={selectedProfile.image} // Pass phone
            handleCloseModal={handleCloseModal}
            isOpen={isModalOpen}
            onConfirm={() => {
              navigate("/dashboard/Dashboard");
            }}
            onClose={handleCloseModal}
          />
        );

      default:
        return <div>View not found</div>;
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      }}
    >
      <Box
        className="bg-white p-6 rounded-md shadow-lg flex flex-col items-center"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 550,
          height: 480,
          outline: "none",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <Box className="flex w-full justify-end mt-6 mr-12">
          <Box flexGrow={1}></Box>
          <Box
            onClick={handleCloseModal}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              color: "#808080", // Grayish color
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.1)", // Light gray on hover
              },
            }}
          >
            <CloseIcon />
          </Box>
        </Box>
        {renderView()}
      </Box>
    </Modal>
  );
};

export default ModalView;
