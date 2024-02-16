import { Box, Divider } from "@mui/material";
import React from "react";

const AuthSocial = () => {
  return (
    <Box>
      <Divider
        sx={{
          my: 2.5,
          typography: "overline",
          color: "text.disabled",
          "&::before,&::after": { borderTopStyle: "dashed" },
        }}
      >
        OR
      </Divider>
    </Box>
  );
};

export default AuthSocial;
