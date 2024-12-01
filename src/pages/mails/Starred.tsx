import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Box } from "@mui/system";

const Starred = () => {
  return (
    <Box className="flex">
      <Sidebar />
      <Header title="Starred" />
    </Box>
  );
};

export default Starred;
