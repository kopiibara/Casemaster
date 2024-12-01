import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { Box } from "@mui/system";

const Dashboard = () => {
  return (
    <Box className="flex">
      <Sidebar />
      <Header title="Dashboard" />
    </Box>
  );
};

export default Dashboard;
