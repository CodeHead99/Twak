import { Box, Stack } from "@mui/material";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";

const Conversation = () => {
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* ChatHeader */}
      <Header />
      {/* Messages */}
      <Box
        sx={{ width: "100%", flexGrow: 1, height: "100%", overflow: "scroll" }}
      >
        <Message menu={true} />
      </Box>

      {/* chatFooter */}
      <Footer />
    </Stack>
  );
};

export default Conversation;
