import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography, Skeleton } from "@mui/material";  // Import Skeleton
import StaffPersonalDetails from "./StaffPersonalDetails"; // Assuming this is your component
import axios from "axios";
import { useEffect } from "react";

// Define the employee profile data type
interface EmployeeProfile {
  user_id: number;
  name: string;
  role: string;
  image: string; 
  email: string;
  phone: string;
  pin: string;
  isApproved: boolean; // This is used to set the status as "Active" or "Pending"
}

// Status mapping for Chip colors
const statusColors: Record<string, "default" | "success" | "warning" | "error"> = {
  Active: "success",
  Inactive: "default",
  Pending: "warning",
};

const DirectoryTable: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedStaff, setSelectedStaff] = React.useState<EmployeeProfile | null>(null);
  const [profilesData, setProfilesData] = React.useState<EmployeeProfile[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);  // Add loading state

  // Open dialog with selected Employee details
  const handleOpenDialog = (profile: EmployeeProfile) => {
    setSelectedStaff(profile); // Set the selected profile (EmployeeProfile) to state
    setOpen(true); // Open the dialog
  };

  // Close dialog and reset selection
  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedStaff(null); // Reset the selected staff on close
  };

  // Fetch profiles data from the API
  const fetchProfiles = async () => {
    try {
      setLoading(true);  // Set loading to true while fetching data
      const response = await axios.get('http://localhost:3000/api/get-profiles');
      const profilesWithValidImages = response.data.map((profile: EmployeeProfile) => ({
        ...profile,
        image: profile.image || 'path/to/default/image.jpg', // Replace with your default image path
      }));
      setProfilesData(profilesWithValidImages);
      setLoading(false);  // Set loading to false once data is fetched
      console.log(profilesWithValidImages);
    } catch (error) {
      console.error("Failed to fetch profiles", error);
      setLoading(false);  // Set loading to false if an error occurs
    }
  };

  // Initial fetch of profiles when component mounts
  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleStatusChange = () => {
    fetchProfiles();  // Re-fetch profiles to update the status in the table
  };

  return (
    <>
      <TableContainer component={Paper}>
        {loading ? (  // If loading, show the skeleton
          <Skeleton variant="rectangular" width="100%" height={400} />
        ) : (
          <Table sx={{ maxWidth: "full" }} aria-label="directory table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Profile</TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {profilesData.map((profile) => (
                <TableRow
                  key={profile.user_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => handleOpenDialog(profile)} // Open dialog with the selected EmployeeProfile
                >
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar alt={profile.name} src={profile.image} />
                      <Typography variant="subtitle2">{profile.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
                    <Chip
                      label={profile.isApproved ? "Active" : "Pending"} // Show status based on isApproved
                      color={profile.isApproved ? "success" : "warning"} // Color based on approval
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="text"
                      color="primary"
                      size="small"
                      sx={{
                        textTransform: "none",
                        color: "#0F2043",
                        "&:hover": { backgroundColor: "#DCE5F6" },
                      }}
                      onClick={() => handleOpenDialog(profile)} // Open dialog with the selected profile
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Dialog for Employee Profile Details */}
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="xs">
        <DialogContent>
          {selectedStaff && (
            <StaffPersonalDetails
              employee={selectedStaff} // Pass the selected profile to the component
              onClose={handleCloseDialog} // Pass the close function here
              onStatusChange={handleStatusChange} // Pass the status change handler
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DirectoryTable;
