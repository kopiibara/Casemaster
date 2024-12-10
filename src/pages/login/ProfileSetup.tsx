import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Modal, Box, TextField, Button } from "@mui/material";
import React, { ChangeEvent } from "react";

const ProfileSetup = () => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [currentModalView, setCurrentModalView] = useState("email");
  const [inputValue, setInputValue] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleNext = () => {
    navigate("/pin-setup");
  };

  const handleUploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setCurrentModalView("email");
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setInputValue("");
  };

  return (
    <Box className="flex items-center justify-center min-h-screen">
      <Box className="w-full max-w-md p-4">
        {/* Profile Setup Title Section */}
        <Box className="flex justify-center items-center flex-col mb-8">
          <p className="text-[2.5rem] font-semibold text-[#0f2043]">
            Profile Setup
          </p>
          <p className="text-[rgba(15,32,67,0.3)] text-xl">
            Complete simple steps to get started.
          </p>
        </Box>

        {/* Step 1: Upload Profile Picture */}
        <Box className="mb-8">
          <Box className="flex items-center my-1 mb-5">
            {/* Number 1 */}
            <Box className="w-6 h-6 border border-[#0f2043] rounded-full flex justify-center items-center mr-4">
              1
            </Box>
            <h4 className="text-left font-medium">Upload a profile picture</h4>
          </Box>
          <Box className="flex items-start pl-8">
            {/* Image Holder */}
            <Box
              sx={{
                width: "7rem",
                height: "7rem",
                borderRadius: "0.5rem",
                overflow: "hidden",
                backgroundColor: "#E0E0E0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #CCCCCC",
              }}
            >
              <img
                src={uploadedImage || "https://via.placeholder.com/128"}
                alt="Profile Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Box className="flex flex-col items-start ml-6">
              <Button
                onClick={handleUploadImage}
                variant="outlined"
                sx={{
                  color: "#2E49D5",
                  borderColor: "#2E49D5",
                  backgroundColor: "rgba(46,73,213,0.3)",
                  borderRadius: "0.5rem",
                  height: "2rem",
                  width: "7rem",
                  marginBottom: "0.5rem",
                  fontSize: "0.7rem",
                  textTransform: "none",

                  "&:hover": {
                    backgroundColor: "rgba(46,73,213,0.5)",
                  },
                }}
              >
                Upload Image
              </Button>
              <Button
                onClick={handleRemoveImage}
                variant="outlined"
                sx={{
                  color: "#E13D3D",
                  borderColor: "#D52E2E",
                  backgroundColor: "rgba(213,46,46,0.3)",
                  borderRadius: "0.5rem",
                  height: "2rem",
                  width: "7rem",
                  marginBottom: "0.5rem",
                  fontSize: "0.7rem",
                  textTransform: "none",

                  "&:hover": {
                    backgroundColor: "rgba(213,46,46,0.5)",
                  },
                }}
              >
                Remove
              </Button>
              <p className="text-xs text-[rgba(15,32,67,0.3)]">
                PNG or JPG files up to 5 mb
              </p>
              <p className="text-xs text-[rgba(15,32,67,0.3)]">
                Recommended size is 256 x 256 px
              </p>
            </Box>
          </Box>

        {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

        </Box>

        <Box className="mb-8">
          <Box className="flex items-center my-1 mb-5">
            {/* Number 2 */}
            <Box className="w-6 h-6 border border-[#0f2043] rounded-full flex justify-center items-center mr-4">
              2
            </Box>
            <h4 className="text-left font-medium">
              Enter required information
            </h4>
          </Box>
          <Box className="flex flex-col items-start pl-8">
            {/* Label-Input Groups */}
            <Box className="flex flex-col space-y-4 w-[90%]">
              <Box className="flex items-center">
                <label htmlFor="fullname" className="w-32 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullname"
                  className="bg-transparent border border-[rgba(15,32,67,0.3)] text-xs rounded-md h-8 pl-2 focus:outline-none focus:border-[#517FD3] flex-1 w-[80%]"
                />
              </Box>
              <Box className="flex items-center">
                <label htmlFor="email" className="w-32 text-sm">
                  Personal Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="bg-transparent border border-[rgba(15,32,67,0.3)] text-xs rounded-md h-8 pl-2 focus:outline-none focus:border-[#517FD3] flex-1 w-[80%]"
                />
              </Box>
              <Box className="flex items-center">
                <label htmlFor="phoneNo" className="w-32 text-sm">
                  Phone No.
                </label>
                <input
                  type="text"
                  id="phoneNo"
                  name="phoneNo"
                  placeholder="+63 |"
                  className="bg-transparent border border-[rgba(15,32,67,0.3)] rounded-md h-8 pl-2 text-xs focus:outline-none focus:border-[#517FD3] flex-1 w-[80%]"
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="w-full flex justify-end items-center mt-4 gap-2">
          {/* Cancel Button */}
          <Button
            onClick={handleCancel}
            variant="outlined"
            sx={{
              color: "#757575", // Gray text
              borderColor: "#BDBDBD", // Gray border
              width: "5rem",
              height: "2rem",
              borderRadius: "10px",
              boxShadow: "none", // No shadow
              textTransform: "none", // No uppercase
              "&:hover": {
                backgroundColor: "#EBEBEB", // Solid gray background on hover
                borderColor: "#BDBDBD", // Match border with background on hover
              },
            }}
          >
            Cancel
          </Button>

          {/* Next Button */}
          <Button
            onClick={handleOpenModal}
            variant="contained"
            sx={{
              backgroundColor: "#517FD3",
              color: "white",
              width: "5rem",
              height: "2rem",
              borderRadius: "10px",
              boxShadow: "none", // Removes the shadow
              textTransform: "none", // No uppercase
              "&:hover": {
                backgroundColor: "#3D6FBF",
                boxShadow: "none", // Removes shadow on hover as well
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>

      {/* Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        <Box
          className="bg-white p-6 rounded-md shadow-lg flex-center"
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
          {currentModalView === "email" ? (
            <Box className="flex justify-center items-center flex-col">
              {/* Close Icon */}
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
              <h3 className="text-4xl font-semibold mb-4 text-[#0f2043] mt-8">
                Verify your email
              </h3>
              <p className="tracking-tight text-[rgba(15,32,67,0.3)]">
                To continue, please enter the code that has{" "}
              </p>
              <p className="tracking-tight text-[rgba(15,32,67,0.3)] mb-6">
                been sent to your email (*********@gmail.com)
              </p>
              <TextField
                label="Enter Code"
                variant="outlined"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-[70%]"
              />
              <Box className="w-[70%] mt-4">
                <p
                  className="tracking-tight text-xs text-[#517FD3] cursor-pointer hover:text-[#3D6FBF]"
                  onClick={() => console.log("Resend Code clicked")}
                  style={{ marginBottom: "8px" }} // Add spacing between text buttons
                >
                  Resend Code
                </p>
                <p
                  className="tracking-tight text-xs text-[#517FD3] cursor-pointer hover:text-[#3D6FBF]"
                  onClick={() => setCurrentModalView("phone")}
                >
                  Verify phone instead
                </p>
              </Box>
            </Box>
          ) : (
            <Box className="flex justify-center items-center flex-col">
              {/* Close Icon */}
              <Box className="flex w-full justify-end mt-6 mr-12">
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
              <h3 className="text-4xl font-semibold mb-4 text-[#0f2043] mt-8">
                Verify your phone
              </h3>
              <p className="tracking-tight text-[rgba(15,32,67,0.3)]">
                To continue, please enter the code that has{" "}
              </p>
              <p className="tracking-tight text-[rgba(15,32,67,0.3)] mb-6">
                been sent to your phone (09*********)
              </p>
              <TextField
                label="Enter Code"
                variant="outlined"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-[70%]"
              />
              <Box className="w-[70%] mt-4">
                <p
                  className="tracking-tight text-xs text-[#517FD3] cursor-pointer hover:text-[#3D6FBF]"
                  onClick={() => console.log("Resend Code clicked")}
                  style={{ marginBottom: "8px" }} // Add spacing between text buttons
                >
                  Resend Code
                </p>
                <p
                  className="tracking-tight text-xs text-[#517FD3] cursor-pointer hover:text-[#3D6FBF]"
                  onClick={() => setCurrentModalView("email")}
                >
                  Verify email instead
                </p>
              </Box>
            </Box>
          )}
          <Box className="flex justify-end">
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginRight: "5rem",
                marginTop: "1rem",
                borderRadius: "10px",
                boxShadow: "none",
                textTransform: "none",
                "&:hover": {
                  boxShadow: "none",
                },
              }}
              onClick={handleNext}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProfileSetup;
