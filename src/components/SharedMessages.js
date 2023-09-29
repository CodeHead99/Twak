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

const SharedMessages = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
            <Typography variant="subtitle2">Shared Messages</Typography>
          </Stack>
        </Box>
        <Tabs
          sx={{ px: 2, pt: 2 }}
          value={value}
          onChange={handleChange}
          centered
        >
          <Tab label="Media" />
          <Tab label="Links" />
          <Tab label="Docs" />
        </Tabs>
        <Stack
          height={"100%"}
          sx={{ position: "relative", flexGrow: 1, overflowY: "scroll" }}
          p={3}
          spacing={value === 1 ? 1 : 3}
        >
          {/* IIFE - Immediately Invoked Function Expression */}
          {(() => {
            switch (value) {
              case 0:
                return (
                  <Grid container spacing={2}>
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((el) => {
                      return (
                        <Grid item xs={4}>
                          <img
                            src={faker.image.avatar()}
                            alt={faker.name.fullName()}
                          />
                        </Grid>
                      );
                    })}
                  </Grid>
                );
              case 1:
                return SHARED_LINKS.map((el) => <LinkMsg el={el} />);
              case 2:
                return SHARED_DOCUMENTS.map((el) => <DocMsg el={el} />);
              default:
                break;
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  );
};

export default SharedMessages;
