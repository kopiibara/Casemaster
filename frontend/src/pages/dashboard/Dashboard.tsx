import * as React from "react";
import { Box, Stack, Paper, Typography, Button } from "@mui/material";

import PieGraph from "./PieGraph";
import Notes from "./Notes";
import FilterButtons from "../../components/FilterButtons";

const Dashboard: React.FC = () => {
  const Dates = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getCurrentMonthIndex = (): number => {
    const currentMonth = new Date().getMonth();
    return currentMonth;
  };

  const currentMonthIndex = getCurrentMonthIndex();

  const data = [
    { id: 0, value: 10, label: "New Cases", color: "#3182CE" },
    { id: 1, value: 15, label: "Active Cases", color: "#38A169" },
    { id: 2, value: 20, label: "Closed Cases", color: "#E53E3E" },
    { id: 3, value: 20, label: "Appealed Cases", color: "#D69E2E" },
    { id: 4, value: 20, label: "Archived Cases", color: "#4A5568" },
  ];

  return (
    <Box sx={{ marginX: 3 }}>
      <Stack direction={"row"} spacing={3} className="flex w-full h-auto">
        {/* Summary of Cases */}
        <Paper className="p-10 flex-grow w-auto">
          <Stack spacing={3}>
            <Stack direction={"row"} spacing={2} className="flex ">
              <Typography variant="h5" className="text-[#0F2043]">
                Summary of Cases
              </Typography>
              <Box flexGrow={1} />
              <FilterButtons options={Dates} defaultIndex={currentMonthIndex} />
              <Button
                variant="contained"
                disableElevation
                sx={{
                  backgroundColor: "#0F2043",
                  color: "#FFFFFF",
                  borderRadius: "0.3rem",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#0B1730",
                  },
                }}
              >
                Generate Report
              </Button>
            </Stack>

            <Stack className="flex items-center justify-center ">
              <PieGraph data={data} />
            </Stack>
          </Stack>
        </Paper>

        <Stack spacing={3}>
          <Paper className="p-10 flex-grow w-[18rem]">
            <Box>
              <Notes />
            </Box>
          </Paper>
          <Paper className="p-10 flex-grow">
            <Box>Deadlines</Box>
          </Paper>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Dashboard;
