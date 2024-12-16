import * as React from "react";
import { Box, Stack, Paper, Typography, Button } from "@mui/material";

import PieGraph from "./PieGraph";
import Notes from "./Notes";
import Deadlines from "./Deadlines";
import FilterButtons from "../../components/FilterButtons";
import Icon from "../../assets/summary-of-cases.svg";

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

  const deadlineData = [
    { title: "MALAPITAN VS TRILLANES", dueDate: "Due 3 days left" },
    { title: "PROJECT A DEADLINE", dueDate: "Due 1 week left" },
    { title: "REVIEW EXAM", dueDate: "Due 5 days left" },
  ];

  return (
    <Box sx={{ marginX: 3 }}>
      <Stack direction={"row"} spacing={3} className="flex w-auto h-full">
        {/* Summary of Cases */}
        <Paper className="p-10 flex-grow w-auto">
          <Stack spacing={3}>
            <Stack direction={"row"} spacing={2} className="flex ">
              <Stack direction={"row"} spacing={1.5} alignItems="center">
                {" "}
                <img src={Icon} alt="icon" width={32} />
                <Typography variant="h6" className="text-[#0F2043]">
                  Summary of Cases
                </Typography>
              </Stack>
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
          <Paper className="p-10 flex-grow w-[24rem]">
            <Box>
              <Notes />
            </Box>
          </Paper>
          <Paper className="p-10 flex-grow w-[24rem]">
            <Box>
              <Deadlines deadlines={deadlineData} />
            </Box>
          </Paper>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Dashboard;
