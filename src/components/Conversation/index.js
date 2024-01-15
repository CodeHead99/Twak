import { Box, Stack, useTheme } from "@mui/material";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Conversation = () => {
  const theme = useTheme();
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* ChatHeader */}
      <Header />
      {/* Messages */}
      <Box sx={{ width: "100%", flexGrow: 1 }}></Box>

      {/* chatFooter */}
      <Footer />
    </Stack>
  );
};

export default Conversation;
