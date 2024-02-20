import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <Stack direction={"row"}>
        <Sidebar />
        <Outlet />
      </Stack>
    </>
  );
};

export default DashboardLayout;
