import { Box } from "@mui/system";
import React, { useState } from "react";
import FilterButtons from "../../components/FilterButtons";
import TableComponent from "../../components/TableComponent";
import TrackerDetailsComponent from "../../components/TrackerDetailsComponent"; 
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AddNewCase from "../../components/AddNewCase";  // Import AddNewCase component

const CaseTracker: React.FC = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal state

  const CaseType = ["Case Type", "Civil Case", "Special Case", "Criminal Case"];
  const Deadline = ["Deadline", "Today", "Yesterday", "Last 7 days", "Last 30 days"];
  const Dates = ["Date", "Today", "Yesterday", "Last 7 days", "Last 30 days"];

  const tableHeadData = ["Case No.", "Title", "Deadline", "Status"];
  const tableBodyData = [
    {
      "Case No.": 12345,
      Title: "PRESIDENT MARCOS VS VP SARAH DUTERTE",
      Deadline: "2024-12-10",
      Status: "Active",
    },
    // Add other cases as needed
  ];

  const handleDetailsToggle = () => setIsDetailsOpen((prev) => !prev);
  
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev); // Toggle modal visibility
  };

  return (
    <Box sx={{ marginX: 3, marginTop: 1 }}>
      {/* Top Section: Add Case Button, Filters, and Additional Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            onClick={toggleModal}  // Open the modal when clicked
            sx={{
              backgroundColor: "#0F2043",
              color: "#FFFFFF",
              borderRadius: "0.3rem",
              textTransform: "none",
              paddingX: 3,
              paddingY: 1,
              "&:hover": { backgroundColor: "#0E1B39" },
            }}
          >
            + Add New Case
          </Button>
          <FilterButtons options={CaseType} defaultIndex={0} />
          <FilterButtons options={Deadline} defaultIndex={0} />
          <FilterButtons options={Dates} defaultIndex={0} />
        </Box>

        {/* Right Side Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              paddingX: 0.5,
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#eeeee",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              },
            }}
            onClick={() => console.log("See Edit History")}
          >
            <AccessTimeOutlinedIcon sx={{ color: "Black" }} />
            <Typography
              sx={{
                color: "Black",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              See Edit History
            </Typography>
          </Box>

          <Tooltip
            title={isDetailsOpen ? "Close Details" : "View Details"}
            arrow
          >
            <IconButton onClick={handleDetailsToggle}>
              {isDetailsOpen ? (
                <CancelIcon sx={{ color: "#0F2043" }} />
              ) : (
                <InfoOutlinedIcon sx={{ color: "#0F2043" }} />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Table and Details Layout */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <TableComponent
            tableHeadData={tableHeadData}
            tableBodyData={tableBodyData}
            popoverContent={undefined}
          />
        </Box>
        {isDetailsOpen && <TrackerDetailsComponent />}
      </Box>

      {/* Modal Logic */}
      <AddNewCase
        open={isModalOpen}  // Pass the state here to control visibility
        onClose={toggleModal}  // Pass the toggle function to close the modal
      />
    </Box>
  );
};

export default CaseTracker;
