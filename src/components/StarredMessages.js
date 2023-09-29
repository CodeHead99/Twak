import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { UpdateSidebarType } from "../redux/Slices/app";
import { CaretLeft } from "phosphor-react";
import { faker } from "@faker-js/faker";
import { SHARED_DOCUMENTS, SHARED_LINKS } from "../data";
import { LinkMsg, DocMsg } from "./Conversation/MsgTypes";
import Message from "./Conversation/Message";

const StarredMessages = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack direction={"column"} sx={{ height: "100%" }}>
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.default,
          }}
        >
          <Stack
            direction={"row"}
            sx={{ height: "100%", p: 2 }}
            alignItems={"center"}
            spacing={3}
          >
            <IconButton onClick={() => dispatch(UpdateSidebarType("CONTACT"))}>
              <CaretLeft />
            </IconButton>
            <Typography variant="subtitle2">Starred Messages</Typography>
          </Stack>
        </Box>

        <Stack
          height={"100%"}
          sx={{ position: "relative", flexGrow: 1, overflowY: "scroll" }}
          p={3}
          spacing={3}
        >
          <Message />
        </Stack>
      </Stack>
    </Box>
  );
};

export default StarredMessages;
