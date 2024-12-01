import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Box } from "@mui/system";

const Archive = () => {
  return (
    <Box className="flex">
      <Sidebar />
      <Header title="Archive" />
    </Box>
  );
};

export default Archive;
