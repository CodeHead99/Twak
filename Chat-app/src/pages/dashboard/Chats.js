import {
  Box,
  Typography,
  Stack,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import {
  ArchiveBox,
  CircleDashed,
  MagnifyingGlass,
  Users,
} from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { ChatList } from "../../data";
import { SimpleBarStyle } from "../../components/Scrollbar";
import React, { useEffect, useState } from "react";
import ChatElement from "../../components/ChatElement";
import Friends from "../../sections/main/Friends";
import { socket } from "../../socket";
import { useDispatch, useSelector } from "react-redux";
import { FetchDirectConversations } from "../../redux/slices/conversations";

const user_id = window.localStorage.getItem("user_id");
const Chats = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const { conversations } = useSelector(
    (state) => state.conversation.direct_chat
  );
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  useEffect(() => {
    socket.emit("get_direct_conversations", { user_id }, (data) => {
      console.log(data); // this data is the list of conversations
      // dispatch action

      dispatch(FetchDirectConversations({ conversations: data }));
    });
  }, []);
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: 320,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant="h5">Chats</Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <IconButton
                onClick={() => {
                  handleOpenDialog();
                }}
              >
                <Users />
              </IconButton>
              <IconButton>
                <CircleDashed />
              </IconButton>
            </Stack>
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
          <Stack spacing={1}>
            <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
              <IconButton>
                <ArchiveBox size={24} />
              </IconButton>
              <Button variant="text">Archived</Button>
            </Stack>
            <Divider />
          </Stack>
          <Stack
            // spacing={2}
            direction={"column"}
            sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}
          >
            <SimpleBarStyle timeout={500} clickOnTrack={false}>
              {/* <Stack spacing={2.4}>
                <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  Pinned
                </Typography>
                {ChatList.filter((chat) => chat.pinned === true).map((item) => (
                  <ChatElement chatData={item} />
                ))}
              </Stack> */}
              <Stack spacing={2.4}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#676767" }}
                  mt={2.4}
                >
                  All Chats
                </Typography>
                {conversations
                  .filter((chat) => chat.pinned === false)
                  .map((item) => (
                    <ChatElement chatData={item} />
                  ))}
              </Stack>
            </SimpleBarStyle>
          </Stack>
        </Stack>
      </Box>
      {openDialog && (
        <Friends open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Chats;
