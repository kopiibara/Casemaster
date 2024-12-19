import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterButtons from "../../components/FilterButtons";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

interface Case {
  case_no: string;
  title: string;
  deadline?: string; // Optional field
  status?: string;   // Optional field
}

const CaseTracker: React.FC = () => {
  const CaseType = ["Case Type", "Civil Case", "Special Case", "Criminal Case"];
  const Deadline = ["Deadline", "Today", "Yesterday", "Last 7 days", "Last 30 days"];
  const Dates = ["Date", "Today", "Yesterday", "Last 7 days", "Last 30 days"];

  const tableHeadData = ["Case No.", "Title", "Deadline", "Status"];

  const [cases, setCases] = useState<Case[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchCases = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axios.get("http://localhost:3000/api/get-case-tracker");
      console.log("Fetched cases:", response.data); // Log the response data
      setCases(response.data || []);
    } catch (error) {
      console.error("Failed to fetch cases:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleAddCase = () => {
    console.log("Add New Case button clicked");
    // Add your logic here
  };

  if (isLoading) {
    return <Box>Loading...</Box>; // Display loading text while data is being fetched
  }

  if (isError) {
    return <Box>Failed to load case data.</Box>; // Display error message if data fetch fails
  }

  // Transform cases to match the expected format for tableBodyData
  const tableBodyData = cases.map((caseItem) => ({
    caseNo: caseItem.case_no,
    title: caseItem.title,
    deadline: caseItem.deadline || "N/A", // Default value if deadline is not available
    status: caseItem.status || "N/A",     // Default value if status is not available
  }));

  console.log("Transformed tableBodyData:", tableBodyData);

  return (
    <Box sx={{ marginX: 3, marginTop: 1 }}>
      {/* Top Section: Add Case Button and Filters */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 2, marginBottom: 2 }}>
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
        <FilterButtons options={CaseType} defaultIndex={0} />
        <FilterButtons options={Deadline} defaultIndex={0} />
        <FilterButtons options={Dates} defaultIndex={0} />
      </Box>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            {tableHeadData.map((head, index) => (
              <TableCell key={index}>{head}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableBodyData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.caseNo}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.deadline}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default CaseTracker;
