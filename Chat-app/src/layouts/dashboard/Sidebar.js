import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  useTheme,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import logo from "../../assets/Images/logo.ico";
import { Nav_Buttons, Nav_Setting, Profile_Menu } from "../../data";
import AntSwitch from "../../components/AntSwitch";
import useSettings from "../../hooks/useSettings";
import { faker } from "@faker-js/faker";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOutUser } from "../../redux/slices/auth";

const getPath = (index) => {
  switch (index) {
    case 0:
      return "/app";

    case 1:
      return "/group";

    case 2:
      return "/call";

    case 3:
      return "/settings";

    default:
      break;
  }
};

const getMenuPath = (index) => {
  switch (index) {
    case 0:
      return "/profile";

    case 1:
      return "/settings";

    case 2:
      //TODO => update token & set isAuth = false
      return "/auth/login";

    default:
      break;
  }
};

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = theme.palette.mode;
  const { onToggleMode } = useSettings();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
                  sx={{
                    width: "max-content",
                    color:
                      mode === "light" ? "#000" : theme.palette.text.primary,
                  }}
                  onClick={() => {
                    setSelected(el.index);
                    navigate(getPath(el.index));
                  }}
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
                  sx={{
                    width: "max-content",
                    color:
                      mode === "light" ? "#000" : theme.palette.text.primary,
                  }}
                  onClick={() => {
                    navigate(getPath(3));
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
          <Avatar
            alt="Profile"
            src={faker.image.avatar()}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <Stack spacing={1} px={1}>
              {Profile_Menu.map((el, idx) => {
                return (
                  <MenuItem key={idx} onClick={handleClose}>
                    <Stack
                      onClick={() => {
                        if (idx === 2) {
                          dispatch(LogOutUser());
                        } else {
                          navigate(getMenuPath(idx));
                        }
                      }}
                      sx={{ width: 100 }}
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <span>{el.title}</span>
                      {el.icon}
                    </Stack>
                  </MenuItem>
                );
              })}
            </Stack>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Sidebar;
