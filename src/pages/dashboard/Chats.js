import { Box, Typography, Stack, IconButton, InputBase } from "@mui/material";
import { CircleDashed } from "phosphor-react";
import { styled, alpha } from "@mui/material/styles";
import React from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  width: "100%",
  backgroundColor: alpha(theme.palette.backgroundColor.paper, 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
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
      </Stack>
    </Box>
  );
};

export default Chats;
