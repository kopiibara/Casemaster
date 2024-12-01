import React from "react";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-[#F0F4F8]">
        <h1 className="text-3xl font-bold p-4">Dashboard</h1>
      </div>
    </div>
  );
};

export default Dashboard;
