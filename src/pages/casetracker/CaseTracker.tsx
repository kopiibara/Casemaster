import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import FilterButtons from "../../components/FilterButtons";
import TableComponent from "../../components/TableComponent";

const CaseTracker: React.FC = () => {
  const [caseType, setCaseType] = useState("Civil Case");

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

  const popoverContent = (
    <Box style={{ padding: "1rem" }}>
      <p>Additional options and actions can be placed here.</p>
    </Box>
  );

  const handleAddCase = () => {
    console.log("Add New Case button clicked");
    // Add your logic here
  };

  const handleCaseTypeChange = (index: number) => {
    const caseTypes = ["Civil Case", "Special Case", "Criminal Case"];
    setCaseType(caseTypes[index]);
  };

  return (
    <Box sx={{ marginX: 1, marginTop: 1 }}>
      {/* Button and FilterButtons for Case Type */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 2, gap: 2 }}>
        <Button
          variant="contained"
          onClick={handleAddCase}
          sx={{
            backgroundColor: "#0F2043",
            color: "#FFFFFF",
            borderRadius: "12px", 
            textTransform: "none", 
            paddingX: 3, 
            paddingY: 1, 
            "&:hover": {
              backgroundColor: "#0E1B39", 
            },
          }}
        >
          + Add New Case
        </Button>

        {/* Using FilterButtons component */}
        <FilterButtons
          options={["Case Type", "Civil Case", "Special Case", "Criminal Case"]}
          defaultIndex={0}
          // No need to modify FilterButtons itself
          onChange={handleCaseTypeChange} // This will be called when a selection is made
        />
      </Box>

      {/* Table */}
      <TableComponent
        tableHeadData={tableHeadData}
        tableBodyData={tableBodyData}
        popoverContent={popoverContent}
      />
    </Box>
  );
};

export default CaseTracker;
