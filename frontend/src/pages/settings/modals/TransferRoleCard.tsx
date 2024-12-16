import React, { useState, useEffect } from "react";
import { Box, Stack, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useAppContext } from "../../../AppContext";
import { SelectChangeEvent } from '@mui/material/Select';
import axios from "axios";
import { AppProvider } from "../../../AppContext";

interface Profile {
  user_id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  image: string; 
  pin: string;
  isApproved: boolean;
}

const TransferRoleCard = () => {
  const { profileData } = useAppContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [age, setAge] = React.useState('');
  const { id } = profileData;
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/get-profiles');
        const profilesWithValidImages = response.data.map((profile: Profile) => ({
          ...profile,
          image: profile.image || 'path/to/default/image.jpg' // Replace with your default image path
        }));
        setProfiles(profilesWithValidImages);
        console.log(profilesWithValidImages);
      } catch (error) {
        console.error("Failed to fetch profiles", error);
      } finally {

      }
    };

    fetchProfiles();
  }, []);

  // Handle dialog open and close
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };


  const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value as string);
    };

  return (
    <>
      {profileData.role !== "Staff" && (
        <Box>
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography variant="h6" fontWeight={"bold"}>
                Transfer Admin Role
              </Typography>
              <Typography variant="body2">
                Transfer admin responsibilities to another user. Once assigned, the
                new admin will have full control, and you will no longer have admin
                access unless reassigned.
              </Typography>
            </Stack>
            <Stack direction={"row"}>
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
                onClick={handleDialogOpen}  // Open the dialog when button is clicked
              >
                Transfer Role Admin
              </Button>
              <Box flexGrow={1}></Box>
            </Stack>
          </Stack>
        </Box>
      )}

      {/* Dialog for Admin Role Transfer */}
      <Dialog
  open={openDialog}
  onClose={handleDialogClose}
  sx={{
    '& .MuiDialog-paper': {
      width: '500px', // Adjust width as needed
      maxWidth: 'none', // Remove any maximum width limit
      padding: '20px', // Optional: add some padding inside the dialog
    },
  }}
>
  <DialogTitle>Transfer Admin Role</DialogTitle>
  <DialogContent>
    <Typography variant="body2" sx={{ marginBottom: 2 }}>
      Are you sure you want to transfer the Admin role to another user? Once you confirm, the new admin will have full control.
      </Typography>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Staff Name</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Staff Name"
    onChange={handleChange}
  >
    {profiles
      .filter(profile => profile.role === "Staff") // Filter for "Staff" role
      .map(profile => (
        <MenuItem key={profile.user_id} value={profile.user_id}>
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Image */}
            <img
              src={profile.image} 
              alt={profile.name}
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%", // Circle shape
                objectFit: "cover",
              }}
            />
            {/* Name */}
            <Typography variant="body2">{profile.name}</Typography>
          </Stack>
        </MenuItem>
      ))}
  </Select>
</FormControl>

    </Box>
    
  </DialogContent>
  <DialogActions>
    <Button onClick={handleDialogClose} color="primary">
      Cancel
    </Button>
    <Button onClick={handleDialogClose} color="primary" variant="contained">
      Transfer
    </Button>
  </DialogActions>
</Dialog>

    </>
  );
};

export default TransferRoleCard;
