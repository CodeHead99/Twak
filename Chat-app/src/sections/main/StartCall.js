import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";
import React from "react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { MagnifyingGlass } from "phosphor-react";
import { CallElement } from "../../components/CallElement";
import { MembersList } from "../../data";
const transition = React.forwardRef(function transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const StartCall = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={transition}
      keepMounted
      sx={{ p: 4 }}
      onClose={handleClose}
    >
      <DialogTitle sx={{ mb: 3 }}>Start Call</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
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
          {MembersList.map((el) => (
            <CallElement {...el} />
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default StartCall;
