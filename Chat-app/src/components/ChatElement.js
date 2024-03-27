import { Box, Typography, Stack, Avatar, Badge } from "@mui/material";
import { useTheme, styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import React from "react";
import { SelectConversation } from "../redux/slices/app";
// import { SelectConversation } from "../redux/slices/app";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
const ChatElement = ({ chatData }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <Box
      onClick={() => {
        dispatch(
          SelectConversation({
            room_id: chatData.id,
          })
        );
      }}
      sx={{
        width: "100%",
        borderRadius: 1,
        cursor: "pointer",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#fff"
            : theme.palette.background.default,
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2}>
          {chatData.online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={chatData.name} src={chatData.img} />
            </StyledBadge>
          ) : (
            <Avatar alt={chatData.name} src={chatData.img} />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{chatData.name}</Typography>
            <Typography variant="caption">{chatData.msg}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"}>
          <Typography sx={{ fontWeight: 600 }} variant="caption">
            {chatData.time}
          </Typography>
          <Badge color="primary" badgeContent={chatData.unread}></Badge>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ChatElement;
