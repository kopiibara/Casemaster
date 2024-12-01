import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Box } from "@mui/system";

const Inbox = () => {
  return (
    <Box className="flex">
      <Sidebar />
      <Header title="Inbox" />
    </Box>
  );
};

export default Inbox;
