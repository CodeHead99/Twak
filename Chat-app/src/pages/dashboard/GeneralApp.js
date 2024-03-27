import React from "react";
import Chats from "./Chats";
import { Stack, Box, useTheme, Typography } from "@mui/material";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import NoChat from "../../assets/Illustration/NoChat";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";
import { Link, useSearchParams } from "react-router-dom";

const GeneralApp = () => {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const { sidebar, room_id, chat_type } = useSelector((store) => store.app);
  console.log(room_id, chat_type);

  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      {/*Chats*/}
      <Chats />
      {/*Conversation window*/}
      <Box
        sx={{
          height: "100%",
          width: sidebar.open ? `calc(100vw - 740px )` : "calc(100vw - 420px )",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#FFF"
              : theme.palette.background.paper,
          borderBottom:
            searchParams.get("type") === "individual-chat" &&
            searchParams.get("id")
              ? "0px"
              : "6px solid #0162C4",
        }}
      >
        {chat_type === "individual" && room_id !== null ? (
          <Conversation />
        ) : (
          <Stack
            spacing={2}
            sx={{ height: "100%", width: "100%" }}
            alignItems="center"
            justifyContent={"center"}
          >
            <NoChat />
            <Typography variant="subtitle2">
              Select a conversation or start a{" "}
              <Link
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                }}
                to="/"
              >
                new one
              </Link>
            </Typography>
          </Stack>
        )}
      </Box>

      {sidebar.open &&
        (() => {
          switch (sidebar.type) {
            case "CONTACT":
              return <Contact />;
            case "STARRED":
              return <StarredMessages />;
            case "SHARED":
              return <SharedMessages />;
            default:
              break;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
