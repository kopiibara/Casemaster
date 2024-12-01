import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Box } from "@mui/system";

const CaseTracker = () => {
  return (
    <Box className="flex">
      <Sidebar />
      <Header title="Case Tracker" />
    </Box>
  );
};

export default CaseTracker;
