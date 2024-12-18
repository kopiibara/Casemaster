import React, { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Avatar,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import TransferRoleCard from "./TransferRoleCard";
import { useAppContext } from "../../../AppContext";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [currentPinInput, setCurrentPinInput] = useState("");
  const [isPinValid, setIsPinValid] = useState(false); // Tracks if the current pin is valid
  const { profileData } = useAppContext();

  const handleCurrentPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCurrentPinInput(input);

    // Check if the input matches the current pin from profileData
    if (input === profileData.pin) {
      setIsPinValid(true); // Enable the new pin fields
    } else {
      setIsPinValid(false); // Disable the new pin fields
    }
  };

  return (
    <Box
      className="px-6"
      sx={{
        width: "500px",
        maxWidth: "500px",
        maxHeight: "600px",
        margin: "0 auto",
      }}
    >
      <Stack spacing={3}>
        {/* Header */}
        <Stack>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            sx={{ color: "#0F2043" }}
          >
            Profile
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#0F2043" }}>
            View your personal details here.
          </Typography>
        </Stack>

        {/* Avatar */}
        <Stack direction={"row"} spacing={4}>
          <Box>
            <Avatar
              src={profileData.selectedProfileImage || undefined}
              sx={{ width: 104, height: 104 }}
            ></Avatar>
          </Box>
          <Stack className="flex justify-center">
            <Typography variant="subtitle1" sx={{ color: "#0F2043" }}>
              Profile Picture
            </Typography>
            <Typography variant="caption" sx={{ color: "#0F2043" }}>
              PNG, JPEG under 15mb
            </Typography>
          </Stack>
          <Stack className="flex justify-center">
            <Button
              variant="outlined"
              sx={{
                color: "#2E49D5",
                borderColor: "#2E49D5",
                backgroundColor: "rgba(46,73,213,0.1)",
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
              variant="outlined"
              sx={{
                color: "#E13D3D",
                borderColor: "#D52E2E",
                backgroundColor: "rgba(213,46,46,0.1)",
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
          </Stack>
        </Stack>

        {/* Input Fields */}
        <Stack spacing={2}>
          <Typography variant="subtitle2" sx={{ color: "#0F2043" }}>
            Personal Details
          </Typography>

          {/* Full Name */}
          <FormControl
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                color: "#2E49D5",
                "& input": {
                  color: "#2E49D5",
                  padding: "0.5rem",
                },
                "& fieldset": {
                  borderColor: "#868FA0",
                },
                "&:hover fieldset": {
                  borderColor: "#2E49D5",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2E49D5",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#868FA0",
                fontSize: "0.9rem",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2E49D5",
              },
            }}
          >
            <InputLabel htmlFor="full-name">Full Name</InputLabel>
            <OutlinedInput
              id="full-name"
              label="Full Name"
              value={profileData.fullName}
            />
          </FormControl>

          {/* Personal Email */}
          <FormControl
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                color: "#2E49D5",
                "& input": {
                  color: "#2E49D5",
                  padding: "0.5rem",
                },
                "& fieldset": {
                  borderColor: "#868FA0",
                },
                "&:hover fieldset": {
                  borderColor: "#2E49D5",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2E49D5",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#868FA0",
                fontSize: "0.9rem",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2E49D5",
              },
            }}
          >
            <InputLabel htmlFor="personal-email">Personal Email</InputLabel>
            <OutlinedInput
              id="personal-email"
              value={profileData.email}
              onChange={(e) => setEmail(e.target.value)}
              label="Personal Email"
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      fontSize: "0.7rem",
                      textTransform: "none",
                      color: "green",
                      "&:hover": {
                        color: "#2E49D5",
                      },
                    }}
                  >
                    Verified
                  </Button>
                </InputAdornment>
              }
            />
          </FormControl>

          {/* Phone Number */}
          <FormControl
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                color: "#2E49D5",
                "& input": {
                  color: "#2E49D5",
                  padding: "0.5rem",
                },
                "& fieldset": {
                  borderColor: "#868FA0",
                },
                "&:hover fieldset": {
                  borderColor: "#2E49D5",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2E49D5",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#868FA0",
                fontSize: "0.9rem",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2E49D5",
              },
            }}
          >
            <InputLabel htmlFor="phone-number">Phone Number</InputLabel>
            <OutlinedInput
              id="phone-number"
              value={profileData.phoneNo}
              onChange={(e) => setPhone(e.target.value)}
              label="Phone Number"
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    variant="text"
                    size="small"
                    sx={{
                      fontSize: "0.7rem",
                      textTransform: "none",
                      color: "gray",
                      "&:hover": {
                        color: "#2E49D5",
                      },
                    }}
                  >
                    Verify
                  </Button>
                </InputAdornment>
              }
            />
          </FormControl>

          {/* Buttons */}
          <Stack direction={"row"} spacing={1}>
            <Box flexGrow={1} />
            <Button
              variant="outlined"
              disableElevation
              sx={{
                color: "#2E49D5",
                borderColor: "#2E49D5",
                borderRadius: "0.5rem",
                height: "2rem",
                width: "6rem",
                marginBottom: "0.5rem",
                fontSize: "0.7rem",
                textTransform: "none",

                "&:hover": {
                  backgroundColor: "rgba(46,73,213,0.1)",
                },
              }}
            >
              Discard
            </Button>
            <Button
              variant="contained"
              disableElevation
              sx={{
                color: "white",
                borderColor: "#2E49D5",
                borderRadius: "0.5rem",
                height: "2rem",
                width: "6rem",
                marginBottom: "0.5rem",
                fontSize: "0.7rem",
                textTransform: "none",
              }}
            >
              Save
            </Button>
          </Stack>
        </Stack>

        {/* Change Password */}
        <Stack spacing={2}>
          <Typography variant="subtitle2" sx={{ color: "#0F2043" }}>
            Personal Pin
          </Typography>

          {/* Current Pin */}
          <FormControl
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                color: "#2E49D5",
                "& input": {
                  color: "#2E49D5",
                  padding: "0.5rem",
                },
                "& fieldset": {
                  borderColor: "#868FA0",
                },
                "&:hover fieldset": {
                  borderColor: "#2E49D5",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2E49D5",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#868FA0",
                fontSize: "0.9rem",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#2E49D5",
              },
            }}
          >
            <InputLabel htmlFor="full-name">Current Pin</InputLabel>
            <OutlinedInput
              id="full-name"
              label="Current Pin"
              value={currentPinInput}
              onChange={handleCurrentPinChange}
            />
          </FormControl>

          {/* New Pin */}
          <FormControl
            variant="outlined"
            size="small"
            disabled={!isPinValid}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                color: "#E0E0E0", // Very light text color
                "& input": {
                  color: "#E0E0E0", // Very light input text color
                  padding: "0.5rem",
                },
                "& fieldset": {
                  borderColor: "#F2F2F2", // Very light border color
                },
                "&:hover fieldset": {
                  borderColor: "#F2F2F2", // Maintain light hover effect
                },
                "&.Mui-disabled": {
                  backgroundColor: "#FCFCFC", // Almost white background
                },
              },
              "& .MuiInputLabel-root": {
                color: "#E8E8E8", // Very light label color
                fontSize: "0.9rem",
              },
            }}
          >
            <InputLabel htmlFor="new-pin">New Pin</InputLabel>
            <OutlinedInput
              id="new-pin"
              label="New Pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </FormControl>

          {/* Confirm Pin */}
          <FormControl
            variant="outlined"
            size="small"
            disabled={!isPinValid}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
                fontSize: "0.9rem",
                color: "#E0E0E0", // Very light text color
                "& input": {
                  color: "#E0E0E0", // Very light input text color
                  padding: "0.5rem",
                },
                "& fieldset": {
                  borderColor: "#F2F2F2", // Very light border color
                },
                "&:hover fieldset": {
                  borderColor: "#F2F2F2", // Maintain light hover effect
                },
                "&.Mui-disabled": {
                  backgroundColor: "#FCFCFC", // Almost white background
                },
              },
              "& .MuiInputLabel-root": {
                color: "#E8E8E8", // Very light label color
                fontSize: "0.9rem",
              },
            }}
          >
            <InputLabel htmlFor="confirm-new-pin">Confirm New Pin</InputLabel>
            <OutlinedInput
              id="confirm-new-pin"
              label="Confirm New Pin"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </FormControl>

          {/* Buttons */}
          <Stack direction={"row"} spacing={1}>
            <Box flexGrow={1} />

            <Button
              variant="contained"
              disableElevation
              sx={{
                color: "white",
                borderColor: "#2E49D5",
                borderRadius: "0.5rem",
                height: "2rem",
                width: "full",
                marginBottom: "0.5rem",
                fontSize: "0.7rem",
                textTransform: "none",
              }}
            >
              Change Pin
            </Button>
          </Stack>
        </Stack>

        <TransferRoleCard />
      </Stack>
    </Box>
  );
};

export default Profile;