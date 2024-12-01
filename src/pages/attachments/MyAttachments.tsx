import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Box } from "@mui/system";

const MyAttachments = () => {
  return (
    <Box className="flex">
      <Sidebar />
      <Header title="My Attachments" />
    </Box>
  );
};

export default MyAttachments;
