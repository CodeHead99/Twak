import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "../../assets/Images/logo.ico";
import { Nav_Buttons, Nav_Setting } from "../../data";
import AntSwitch from "../../components/AntSwitch";
import useSettings from "../../hooks/useSettings";
import { faker } from "@faker-js/faker";

const DashboardLayout = () => {
  const [selected, setSelected] = useState(0);
  const theme = useTheme();
  const mode = theme.palette.mode;
  const { onToggleMode } = useSettings();
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
        <Stack
          alignItems={"center"}
          sx={{ width: "100%" }}
          justifyContent={"space-between"}
          direction={"column"}
          spacing={3}
          height={"100%"}
        >
          <Stack alignItems={"center"} spacing={4}>
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
            <Stack
              spacing={3}
              sx={{ width: "max-content" }}
              direction={"column"}
              alignItems={"center"}
            >
              {Nav_Buttons.map((el) =>
                el.index === selected ? (
                  <Box
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 1.5,
                    }}
                  >
                    <IconButton
                      key={el.index}
                      sx={{ width: "max-content", color: "#fff" }}
                    >
                      {el.icon}
                    </IconButton>
                  </Box>
                ) : (
                  <IconButton
                    key={el.index}
                    sx={{ width: "max-content", color: "#000" }}
                    onClick={() => setSelected(el.index)}
                  >
                    {el.icon}
                  </IconButton>
                )
              )}
              <Divider height={3} width={64} />

              {Nav_Setting.map((el) =>
                selected === 3 ? (
                  <Box
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 1.5,
                    }}
                  >
                    <IconButton
                      key={el.index}
                      sx={{ width: "max-content", color: "#fff" }}
                    >
                      {el.icon}
                    </IconButton>
                  </Box>
                ) : (
                  <IconButton
                    key={el.index}
                    sx={{ width: "max-content", color: "#000" }}
                    onClick={() => {
                      setSelected(3);
                    }}
                  >
                    {el.icon}
                  </IconButton>
                )
              )}
            </Stack>
          </Stack>
          <Stack spacing={4}>
            <AntSwitch
              defaultChecked
              onChange={() => {
                onToggleMode();
              }}
            />
            <Avatar alt="Profile" src={faker.image.avatar()} />
          </Stack>
        </Stack>
      </Box>
      <Outlet />
    </>
  );
};

export default DashboardLayout;
