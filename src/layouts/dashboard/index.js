import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Switch,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "../../assets/Images/logo.ico";
import { Nav_Buttons, Nav_Setting } from "../../data";
import AntSwitch from "../../components/AntSwitch";

const DashboardLayout = () => {
  const [switchValue, setSwitchValue] = useState(true);
  const theme = useTheme();
  const mode = theme.palette.mode;
  console.log(theme);

  const handleClick = (event) => {
    console.log(event);
  };
  const switchHandler = (event) => {
    console.log(event.target.checked);
  };
  return (
    <>
      <Box
        sx={{
          width: 100,
          height: "100vh",
          boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          background:
            mode === "light" ? "#F0F4FA" : theme.palette.background.paper,
        }}
        p={2}
      >
        <Stack alignItems={"center"} sx={{ width: "100%" }}>
          <Box
            sx={{
              background: theme.palette.primary.main,
              borderRadius: 1.5,
              width: 64,
              height: 64,
            }}
          >
            <img src={logo} alt="Twak App" />
          </Box>
          <Stack spacing={2} my={2}>
            {Nav_Buttons.map((el) => (
              <Box onClick={handleClick}>
                <IconButton>{el.icon}</IconButton>
              </Box>
            ))}
          </Stack>
          <Divider height={3} width={64} />
          <Stack mt={2}>
            {Nav_Setting.map((el) => (
              <Box>
                <IconButton>{el.icon}</IconButton>
              </Box>
            ))}
          </Stack>

          <Stack>
            <AntSwitch
              defaultChecked
              value={switchValue}
              onClick={switchHandler}
            />
            <Avatar alt="Profile">A</Avatar>
          </Stack>
        </Stack>
      </Box>
      <Outlet />
    </>
  );
};

export default DashboardLayout;
