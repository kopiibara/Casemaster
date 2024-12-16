import { Box, Stack, Typography, Button } from "@mui/material";
import Icon from "../../assets/dashboard-icon.svg";
import FilterButtons from "../../components/FilterButtons";

// Create a reusable DeadlineCard component
interface DeadlineCardProps {
  title: string;
  dueDate: string; // Format: "Due X days left"
}

const DeadlineCard = ({ title, dueDate }: DeadlineCardProps) => (
  <Button
    sx={{
      backgroundColor: "#FAFAFA",
      borderColor: "#D5D5D5",
      borderWidth: 1,
      borderStyle: "solid",
      "&:hover": {
        scale: 1.02,
      },
    }}
  >
    {/* Deadline Content */}
    <Stack spacing={0.5} className="p-2 flex justify-start items-start">
      <Typography variant="subtitle1" className="text-[#0F2043]">
        {title}
      </Typography>
      <Typography variant="body2" className="text-[#878FA1]">
        {dueDate}
      </Typography>
    </Stack>
  </Button>
);

interface NotesProps {
  deadlines: { title: string; dueDate: string }[]; // Array of deadlines passed as prop
}

const Deadline = ({ deadlines }: NotesProps) => {
  const Dates = ["Today", "Yesterday", "This Week", "Last Week"];

  return (
    <Box className="flex flex-col w-full h-full">
      <Stack
        spacing={2}
        sx={{
          height: "100%",
          maxHeight: "25rem",
          display: "flex",
        }}
      >
        <Stack
          direction={"row"}
          spacing={1.5}
          className="flex items-center justify-start"
        >
          <img src={Icon} alt="icon" width={32} />
          <Typography variant="h6" className="text-[#0F2043]">
            Deadlines
          </Typography>
          <Box flexGrow={1}></Box>
          <FilterButtons options={Dates} defaultIndex={0} />
        </Stack>

        {/* Render dynamic DeadlineCard components based on the deadlines array */}
        {deadlines.map((deadline, index) => (
          <DeadlineCard
            key={index}
            title={deadline.title}
            dueDate={deadline.dueDate}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Deadline;
