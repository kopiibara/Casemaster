import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Box } from "@mui/system";

const SharedWithMe = () => {
  return (
    <Box className="flex">
      <Sidebar />
      <Header title="Shared with Me" />
    </Box>
  );
};

export default SharedWithMe;
