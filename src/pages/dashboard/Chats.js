import {
  Box,
  Typography,
  Stack,
  IconButton,
  InputBase,
  Button,
  Divider,
  Avatar,
  Badge,
} from "@mui/material";
import { ArchiveBox, CircleDashed, MagnifyingGlass } from "phosphor-react";
import { styled, alpha } from "@mui/material/styles";
import { ChatList } from "../../data";

import React from "react";
import { Link } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.background.paper, 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));
const Chats = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: 320,
        backgroundColor: "#F8FAFF",
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack p={3}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h5">Chats</Typography>
          <IconButton>
            <CircleDashed />
          </IconButton>
        </Stack>
        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <IconButton>
            <ArchiveBox />
          </IconButton>
          <Button variant="text">Archived</Button>
        </Stack>
        <Divider />
        <Stack>
          <Typography variant="subtitle">Pinned</Typography>
          {ChatList.filter((chat) => chat.pinned === true).map((item) => (
            <Box>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Avatar src={item.img} />
                <Stack>
                  <Typography variant="subtitle2">{item.name}</Typography>
                  <Typography variant="body">{item.msg}</Typography>
                </Stack>
                <Stack>
                  <Typography>{item.time}</Typography>
                  <Badge badgeContent={4} color="primary" />
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
        <Stack>
          <Typography variant="subtitle">All Chats</Typography>
          {ChatList.filter((chat) => chat.pinned !== true).map((item) => (
            <Box>
              <Stack direction={"row"}>
                <Avatar src={item.img} />
                <Stack>
                  <Typography variant="subtitle2">{item.name}</Typography>
                  <Typography variant="body">{item.msg}</Typography>
                </Stack>
                <Stack>
                  <Typography>{item.time}</Typography>
                  <Badge badgeContent={4} color="primary" />
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;
