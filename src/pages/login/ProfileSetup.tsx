import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Modal, Box, TextField, Button } from "@mui/material";

const ProfileSetup = () => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [currentModalView, setCurrentModalView] = useState("email");
  const [inputValue, setInputValue] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleNext = () => {
    navigate("/pin-setup");
  };

  const handleUploadImage = () => {};

  const handleOpenModal = () => {
    setOpenModal(true);
    setCurrentModalView("email");
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setInputValue("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-4">
        {/* Profile Setup Title Section */}
        <div className="flex justify-center items-center flex-col mb-8">
          <p className="text-[2.5rem] font-semibold text-[#0f2043]">
            Profile Setup
          </p>
          <p className="text-[rgba(15,32,67,0.3)] text-xl">
            Complete simple steps to get started.
          </p>
        </div>

        {/* Step 1: Upload Profile Picture */}
        <div className="mb-8">
          <div className="flex items-center my-1 mb-5">
            {/* Number 1 */}
            <div className="w-6 h-6 border border-[#0f2043] rounded-full flex justify-center items-center mr-4">
              1
            </div>
            <h4 className="text-left font-medium">Upload a profile picture</h4>
          </div>
          <div className="flex items-start pl-8">
            {" "}
            {/* Consistent alignment */}
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
            <div className="flex flex-col items-start ml-6">
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
                }}
              >
                Upload Image
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: "#E13D3D",
                  borderColor: "#D52E2E",
                  backgroundColor: "rgba(213,46,46,0.2)",
                  borderRadius: "0.5rem",
                  height: "2rem",
                  width: "7rem",
                  marginBottom: "0.5rem",
                  fontSize: "0.7rem",
                  textTransform: "none",
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
            </div>
          </div>
        </div>

        {/* Step 2: Enter Required Information */}
        <div className="mb-8">
          <div className="flex items-center my-1 mb-5">
            {/* Number 2 */}
            <div className="w-6 h-6 border border-[#0f2043] rounded-full flex justify-center items-center mr-4">
              2
            </div>
            <h4 className="text-left font-medium">
              Enter required information
            </h4>
          </div>
          <div className="flex flex-col items-start pl-8">
            {" "}
            {/* Consistent alignment */}
            {/* Label-Input Groups */}
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <label htmlFor="fullname" className="w-32 text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullname"
                  className="bg-transparent border border-[rgba(15,32,67,0.3)] rounded-md h-8 pl-2 focus:outline-none flex-1"
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="email" className="w-32 text-sm">
                  Personal Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="bg-transparent border border-[rgba(15,32,67,0.3)] rounded-md h-8 pl-2 focus:outline-none flex-1"
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="phoneNo" className="w-32 text-sm">
                  Phone No
                </label>
                <input
                  type="text"
                  id="phoneNo"
                  name="phoneNo"
                  placeholder="+63 |"
                  className="bg-transparent border border-[rgba(15,32,67,0.3)] rounded-md h-8 pl-2 focus:outline-none flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end items-center mt-4 gap-2">
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
                backgroundColor: "#BDBDBD", // Solid gray background on hover
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
                boxShadow: "none", // Removes shadow on hover as well
              },
            }}
          >
            Next
          </Button>
        </div>
      </div>

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
          className="bg-white p-6 rounded-md shadow-lg"
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
            <div className="flex justify-center items-center flex-col">
              <div className="flex justify-end w-full mt-6">
                <div
                  onClick={handleCloseModal}
                  className="w-8 h-8 border border-[#0f2043] rounded-full flex justify-center items-center mr-6 cursor-pointer text-[#0f2043]"
                >
                  X
                </div>
              </div>
              <h3 className="text-4xl font-medium mb-4 text-[#0f2043] font-bold mt-8">
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
              <div className="w-[70%] mt-2">
                <p className="tracking-tight text-xs text-[#517FD3]">
                  Resend Code
                </p>
                <p
                  className="tracking-tight text-xs text-[#517FD3]"
                  onClick={() => setCurrentModalView("phone")}
                >
                  Verify phone instead
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col">
              <div className="flex justify-end w-full mt-6">
                <div
                  onClick={handleCloseModal}
                  className="w-8 h-8 border border-[#0f2043] rounded-full flex justify-center items-center mr-6 cursor-pointer text-[#0f2043]"
                >
                  X
                </div>
              </div>
              <h3 className="text-4xl font-medium mb-4 text-[#0f2043] font-bold mt-8">
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
              <div className="w-[70%] mt-2">
                <p className="tracking-tight text-xs text-[#517FD3]">
                  Resend Code
                </p>
                <p
                  className="tracking-tight text-xs text-[#517FD3]"
                  onClick={() => setCurrentModalView("email")} // Switch to email view
                >
                  Verify email instead
                </p>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button
              variant="contained"
              color="primary"
              sx={{
                marginRight: "5rem",
                marginTop: "1rem",
                borderRadius: "10px",
              }}
              onClick={handleNext}
            >
              Confirm
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileSetup;
