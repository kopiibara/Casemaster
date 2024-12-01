import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Box } from "@mui/system";

const AllAttachments = () => {
  return (
    <Box className="flex">
      <Sidebar />
      <Header title="All Attachments" />
    </Box>
  );
};

export default AllAttachments;
