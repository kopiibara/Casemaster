import React, { useState, useEffect } from "react";
import {
  Dialog,
  Box,
  Typography,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  IconButton,
} from "@mui/material";
import ProfilePage from "./modals/Profile";
import StaffManagementPage from "./modals/StaffManagement";
import SystemLogsPage from "./modals/SystemLogs";

// Icons
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { useAppContext } from "../../AppContext";


// Props interface for better reusability
interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ open, onClose }) => {
  // State to track the selected menu item
  const [selectedItem, setSelectedItem] = useState<string | null>("Profile");
  const { profileData } = useAppContext();
  // State to track hover on the cancel button

  // Function to handle clicking a menu item
  const handleListItemClick = (item: string) => {
    setSelectedItem(item);
  };

  // Reset to Profile page when modal opens
  useEffect(() => {
    if (open) {
      setSelectedItem("Profile");
    }
  }, [open]);

  // Reset hover state when modal is closed

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 3,
          maxWidth: "unset",
          width: "auto",
        },
      }}
    >
      <Box>
        <Stack direction={"row"} spacing={3}>
          {/* Navigation - sticky */}
          <Stack
            sx={{
              position: "sticky",
              top: 0,
              maxHeight: "calc(100vh - 48px)", // Adjust based on modal padding and header height
              overflowY: "auto", // Make it scrollable if content overflows
            }}
          >
            <List
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  sx={{ marginBottom: 2, padding: 1, color: "#0F2043" }}
                >
                  <Typography variant="h5" fontWeight={"bold"}>
                    Settings
                  </Typography>
                </ListSubheader>
              }
            >
              <ListItem disablePadding sx={{ color: "#0F2043" }}>
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                    backgroundColor:
                      selectedItem === "Profile" ? "#DBE7FF" : "transparent", // Active state style
                    "&:hover": {
                      backgroundColor:
                        selectedItem === "Profile" ? "#DBE7FF" : "#F3F7FF", // Hover effect
                    },
                  }}
                  onClick={() => handleListItemClick("Profile")}
                >
                  <ListItemText primary="Profile" />
                </ListItemButton>
              </ListItem>

            {profileData.role !=="Staff" && (
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                    backgroundColor:
                      selectedItem === "Staff Management"
                        ? "#DBE7FF"
                        : "transparent", // Active state style
                    "&:hover": {
                      backgroundColor:
                        selectedItem === "Staff Management"
                          ? "#DBE7FF"
                          : "#F3F7FF", // Hover effect
                    },
                  }}
                  onClick={() => handleListItemClick("Staff Management")}
                >
                  <ListItemText primary="Staff Management" />
                </ListItemButton>
              </ListItem>
            )}

            {profileData.role !=="Staff" && (
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    borderRadius: 2,
                    backgroundColor:
                      selectedItem === "System Logs"
                        ? "#DBE7FF"
                        : "transparent", // Active state style
                    "&:hover": {
                      backgroundColor:
                        selectedItem === "System Logs" ? "#DBE7FF" : "#F3F7FF", // Hover effect
                    },
                  }} 
                  onClick={() => handleListItemClick("System Logs")}
                >
                  <ListItemText primary="System Logs" />
                </ListItemButton>
              </ListItem>
            )}


            </List>
          </Stack>
          <Divider orientation="vertical" flexItem />
          {/* Content - scrollable */}
          <Stack
            spacing={3}
            sx={{
              maxHeight: "calc(100vh - 48px)", // Adjust for modal padding and header height
              overflowY: "auto", // Make the content area scrollable
              "&::-webkit-scrollbar": {
                width: 4, // Width of the scrollbar
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f0f0f0", // Scrollbar track color
                borderRadius: 4,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#D9D9D9", // Scrollbar thumb color
                borderRadius: 4,
                "&:hover": {
                  backgroundColor: "#909090", // Thumb color on hover
                },
              },
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
              sx={{
                position: "sticky",
                top: 0,
                maxHeight: "calc(100vh - 48px)", // Adjust based on modal padding and header height
                overflowY: "auto", // Make it scrollable if content overflows
              }}
            >
              <Box flexGrow={1} />
              <IconButton onClick={onClose}>
                <CancelOutlinedIcon className="text-[#517FD3]" />
              </IconButton>
            </Stack>
            {selectedItem === "Profile" && <ProfilePage />}
            {selectedItem === "Staff Management" && <StaffManagementPage />}
            {selectedItem === "System Logs" && <SystemLogsPage />}
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default ModalComponent;
