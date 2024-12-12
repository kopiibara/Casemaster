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
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Stack, Typography } from "@mui/material";
import StaffPersonalDetails from "./StaffPersonalDetails";

// Define the staff data type
interface Staff {
  avatar: string;
  fullName: string;
  status: string;
}

// Status mapping for Chip colors
const statusColors: Record<
  string,
  "default" | "success" | "warning" | "error"
> = {
  Active: "success",
  Inactive: "default",
  Pending: "warning",
};

// Sample data
const rows: Staff[] = [
  {
    avatar: "https://i.pravatar.cc/150?img=1",
    fullName: "John Doe",
    status: "Active",
  },
  {
    avatar: "https://i.pravatar.cc/150?img=2",
    fullName: "Jane Smith",
    status: "Inactive",
  },
  {
    avatar: "https://i.pravatar.cc/150?img=3",
    fullName: "Samuel Green",
    status: "Pending",
  },
  {
    avatar: "https://i.pravatar.cc/150?img=4",
    fullName: "Emily White",
    status: "Inactive",
  },
  {
    avatar: "https://i.pravatar.cc/150?img=5",
    fullName: "Michael Brown",
    status: "Active",
  },
];

const DirectoryTable: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedStaff, setSelectedStaff] = React.useState<Staff | null>(null);

  // Open dialog with selected staff details
  const handleOpenDialog = (staff: Staff) => {
    setSelectedStaff(staff);
    setOpen(true);
  };

  // Close dialog and reset selection
  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedStaff(null);
  };

  return (
    <>
      <TableContainer component={Paper}>
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
            {rows.map((row) => (
              <TableRow
                key={row.fullName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar alt={row.fullName} src={row.avatar} />
                    <Typography variant="subtitle2">{row.fullName}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="left">
                  {/* Chip for Status using statusColors mapping */}
                  <Chip
                    label={row.status}
                    color={statusColors[row.status] || "default"}
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
                    onClick={() => handleOpenDialog(row)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Staff Details */}
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="xs">
        <DialogContent>
          {selectedStaff && (
            <StaffPersonalDetails
              avatar={selectedStaff.avatar}
              fullName={selectedStaff.fullName}
              status={selectedStaff.status}
              onClose={handleCloseDialog} // Pass the close function here
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DirectoryTable;
