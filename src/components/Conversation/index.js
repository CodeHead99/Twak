import { Box, Stack } from "@mui/material";
import React from "react";

const Conversation = () => {
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* ChatHeader */}
      <Box
        sx={{
          height: 100,
          width: "100%",
          backgroundColor: "#F8FAFF",
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      ></Box>
      {/* Messages */}
      <Box sx={{ width: "100%", flexGrow: 1 }}></Box>

      {/* chatFooter */}
      <Box
        sx={{
          height: 100,
          width: "100%",
          backgroundColor: "#F8FAFF",
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      ></Box>
    </Stack>
  );
};

export default Conversation;
