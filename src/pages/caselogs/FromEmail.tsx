import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Box } from "@mui/system";

const FromEmail = () => {
  return (
    <Box className="flex">
      <Sidebar />
      <Header title="From Email" />
    </Box>
  );
};

export default FromEmail;
