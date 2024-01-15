import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { Chat_History } from "../../data";

const Message = () => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {Chat_History.map((el) => {
          switch (el.type) {
            case "divider":
              return;
              break;
            case "msg":
              switch (el.subtype) {
                case "img":
                  return <img src={el.img} alt="img" />;
                  break;
                case "doc":
                  return <img src={el.img} alt="img" />;
                  break;
                case "link":
                  return <img src={el.img} alt="img" />;
                  break;
                case "reply":
                  return <img src={el.img} alt="img" />;
                  break;
                default:
                  return <p>{el.message}</p>;
              }
            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
