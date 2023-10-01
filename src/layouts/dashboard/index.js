import { Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import SideBar from "./SideBar";

const isAuthenticated = true;
const DashboardLayout = () => {
  const theme = useTheme();
  console.log(theme);
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }
  return (
    <>
      <Stack direction="row">
        <SideBar />
        <Outlet />
      </Stack>
    </>
  );
};

export default DashboardLayout;
