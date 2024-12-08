import { Box } from "@mui/system";
import React, { useState } from "react";
import FilterButtons from "../../components/FilterButtons";
import TableComponent from "../../components/TableComponent";
import TrackerDetailsComponent from "../../components/TrackerDetailsComponent";  {/* Changed here */}
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const CaseTracker: React.FC = () => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

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
    {
      "Case No.": 67890,
      Title: "CITIZEN VS GOVERNMENT",
      Deadline: "2024-12-15",
      Status: "Closed",
    },
    {
      "Case No.": 24680,
      Title: "GOVERNMENT VS CITIZEN",
      Deadline: "2024-12-20",
      Status: "New",
    },
    {
      "Case No.": 13579,
      Title: "VP LENI ROBREDO VS SENATOR PACQUIAO",
      Deadline: "2024-12-25",
      Status: "Appealed",
    },
    {
      "Case No.": 10101,
      Title: "SENATOR PACQUIAO VS VP LENI ROBREDO",
      Deadline: "2024-12-30",
      Status: "Archived",
    },
  ];

  const handleDetailsToggle = () => setIsDetailsOpen((prev) => !prev);

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
            onClick={() => console.log("Add New Case")}
            sx={{
              backgroundColor: "#0F2043",
              color: "#FFFFFF",
              borderRadius: "12px",
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
          {/* See Edit History Button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              paddingX: 0.5,
              borderRadius: "8px", // Rounded rectangle
              transition: "background-color 0.3s ease, box-shadow 0.3s ease",
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

          {/* View Details Button */}
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
        {isDetailsOpen && <TrackerDetailsComponent />}  {/* Changed here */}
      </Box>
    </Box>
  );
};

export default CaseTracker;
