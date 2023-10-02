import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";
import * as Yup from "yup";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { MagnifyingGlass, Phone } from "phosphor-react";
import { CallElement } from "../../components/CallElement";
import { CallLogs } from "../../data";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StartCall = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle sx={{ mb: 3 }}>{"Start Call"}</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search..."></StyledInputBase>
            </Search>
          </Stack>
          {CallLogs.map((el) => (
            <CallElement {...el} />
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default StartCall;
