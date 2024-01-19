import { Divider, Stack, Typography, useTheme, Box } from "@mui/material";
import React from "react";

const ReplyMsg = ({ el }) => {
  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      justifyContent={el.incoming ? "start" : "end"}
      alignItems={"center"}
    >
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      ></Box>
    </Stack>
  );
};

const MediaMsg = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      justifyContent={el.incoming ? "start" : "end"}
      alignItems={"center"}
    >
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Stack spacing={1}>
          <img
            src={el.img}
            alt={el.message}
            style={{ maxHeight: 210, borderRadius: "10px" }}
          />
          <Typography
            variant="body2"
            color={el.incoming ? theme.palette.text : "#fff"}
          >
            {el.message}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

const TextMsg = ({ el }) => {
  const theme = useTheme();

  return (
    <Stack
      direction={"row"}
      justifyContent={el.incoming ? "start" : "end"}
      alignItems={"center"}
    >
      <Box
        p={1.5}
        sx={{
          backgroundColor: el.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: "max-content",
        }}
      >
        <Typography
          variant="body2"
          color={el.incoming ? theme.palette.text : "#fff"}
        >
          {el.message}
        </Typography>
      </Box>
    </Stack>
  );
};

const TimeLine = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Divider width="46%" />
      <Typography variant="caption" sx={{ color: theme.palette.text }}>
        {el.text}
      </Typography>
      <Divider width="46%" />
    </Stack>
  );
};

export { TimeLine, TextMsg, MediaMsg, ReplyMsg };
