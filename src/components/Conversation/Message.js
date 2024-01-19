import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { Chat_History } from "../../data";
import { MediaMsg, ReplyMsg, TextMsg, TimeLine } from "./MsgTypes";

const Message = () => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {Chat_History.map((el) => {
          switch (el.type) {
            case "divider":
              return <TimeLine el={el} />;

            case "msg":
              switch (el.subtype) {
                case "img":
                  return <MediaMsg el={el} />;
                case "doc":
                  return <img src={el.img} alt="img" />;
                  break;
                case "link":
                  return <img src={el.img} alt="img" />;
                  break;
                case "reply":
                  return <ReplyMsg el={el} />;

                default:
                  return <TextMsg el={el} />;
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
