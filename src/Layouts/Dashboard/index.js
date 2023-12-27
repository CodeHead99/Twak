import {
  Box,
  IconButton,
  useTheme,
  Stack,
  Divider,
  Avatar,
} from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../../assets/Images/logo.ico";
import { Nav_Buttons, Nav_Setting } from "../../data";

const DashboardLayout = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;
  console.log(theme);

  return (
    <>
      <Box
        sx={{
          width: 100,
          height: "100vh",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          background: `${
            mode === "light" ? "#F0F4FA" : theme.palette.background.paper
          }`,
        }}
      >
        <Box
          sx={{
            height: 64,
            width: 64,
            borderRadius: 1.5,
            backgroundColor: theme.palette.primary.main,
          }}
          p={1}
        >
          <img src={logo} alt="app logo" />
        </Box>
        <Stack>
          {Nav_Buttons.map((el) => {
            return (
              <Box>
                <IconButton>{el.icon}</IconButton>
              </Box>
            );
          })}
          <Divider />
          {Nav_Setting.map((el) => {
            return (
              <Box>
                <IconButton>{el.icon}</IconButton>
              </Box>
            );
          })}
        </Stack>
        <Stack>
          <Avatar alt="Remy Sharp" src={logo} />
        </Stack>
      </Box>
      <Outlet />
    </>
  );
};

export default DashboardLayout;
