import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Box } from "@mui/system";

const ManualInput = () => {
  return (
    <Box className="flex">
      <Sidebar />
      <Header title="Manual Input " />
    </Box>
  );
};

export default ManualInput;
