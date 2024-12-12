import { Box } from "@mui/system";
import React, { useState } from "react";
import FilterButtons from "../../components/FilterButtons";
import TableComponent from "../../components/TableComponent";
import TrackerDetailsComponent from "../../components/TrackerDetailsComponent";
import { Button, IconButton, Tooltip, Typography, Modal } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AddNewCase from "../../components/AddNewCase"; // Import AddNewCase component


const CaseTracker: React.FC = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAddNewCaseVisible, setIsAddNewCaseVisible] = useState(false); 

  const CaseType = ["Case Type", "Civil Case", "Special Case", "Criminal Case"];
  const Deadline = ["Deadline", "Today", "Yesterday", "Last 7 days", "Last 30 days"];
  const Dates = ["Date", "Today", "Yesterday", "Last 7 days", "Last 30 days"];

  const tableHeadData = ["Case No.", "Title", "Deadline", "Status"];
  const tableBodyData = [
    {
      "Case No.": 12345,
      Title: "PRESIDENT MARCOS VS VP SARAH DUTERTE",
      "Date Added": "2024-12-01",
      Status: "Active",
    },
    {
      "Case No.": 67890,
      Title: "CITIZEN VS GOVERNMENT",
      "Date Added": "2024-11-30",
      Status: "Closed",
    },
    {
      "Case No.": 24680,
      Title: "GOVERNMENT VS CITIZEN",
      "Date Added": "2024-11-29",
      Status: "New",
    },
    {
      "Case No.": 13579,
      Title: "VP LENI ROBREDO VS SENATOR PACQUIAO",
      "Date Added": "2024-11-28",
      Status: "Appealed",
    },
    {
      "Case No.": 10101,
      Title: "SENATOR PACQUIAO VS VP LENI ROBREDO",
      "Date Added": "2024-11-27",
      Status: "Archived",
    },
    {
      "Case No.": 10101,
      Title: "SENATOR PACQUIAO VS VP LENI ROBREDO",
      "Date Added": "2024-11-27",
      Status: "Archived",
    },
    {
      "Case No.": 10101,
      Title: "SENATOR PACQUIAO VS VP LENI ROBREDO",
      "Date Added": "2024-11-27",
      Status: "Archived",
    },
    {
      "Case No.": 10101,
      Title: "SENATOR PACQUIAO VS VP LENI ROBREDO",
      "Date Added": "2024-11-27",
      Status: "Archived",
    },
    {
      "Case No.": 10101,
      Title: "SENATOR PACQUIAO VS VP LENI ROBREDO",
      "Date Added": "2024-11-27",
      Status: "Archived",
    },
  ];

  const handleDetailsToggle = () => setIsDetailsOpen((prev) => !prev);

  const toggleAddNewCaseVisibility = () => {
    setIsAddNewCaseVisible((prev) => !prev); // Toggle visibility of AddNewCase form
  };

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
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
            onClick={toggleAddNewCaseVisibility} // Show/hide the Add New Case form
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

      {/* Backdrop for modal-like effect */}
      {isAddNewCaseVisible && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999, // Ensure the backdrop is above other content
          }}
          onClick={toggleAddNewCaseVisibility} // Close form when clicking on the backdrop
        >
          <Box
            sx={{
              backgroundColor: "white",
              padding: 3,
              borderRadius: "0.5rem",
              boxShadow: 3,
              width: "80%", // Adjust width as needed
              maxWidth: "600px", // Max width for the form
            }}
            onClick={stopPropagation}
          >
            <AddNewCase onClose={toggleAddNewCaseVisibility} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CaseTracker;
