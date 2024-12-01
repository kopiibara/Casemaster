import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Box } from "@mui/system";

const Sent = () => {
  return (
    <Box className="flex">
      <Sidebar />
      <Header title="Sent" />
    </Box>
  );
};

export default Sent;
