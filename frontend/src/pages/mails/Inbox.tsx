import { Box } from "@mui/system";
import Stack from "@mui/material/Stack";
import FilterButtons from "../../components/FilterButtons"; // Assuming these are your filters
import MailContainer from "../../components/MailContainer";

const Inbox = () => {
  return (
    <Box sx={{ marginX: 3, marginY: 2 }}>
      <Stack spacing={2}>
        {/* Main Content Area */}
        <Box
          sx={{ display: "flex", flexDirection: "row", gap: 2, width: "100%" }}
        >
          {/* Mail Container */}
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <MailContainer />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Inbox;
