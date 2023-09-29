import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "../store";
import { appBarClasses } from "@mui/material";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT",
  },
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar(state, action) {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebarType(state, action) {
      state.sidebar.type = action.payload.type;
    },
  },
});

export default slice.reducer;

export function ToggleSidebar() {
  return async () => {
    dispatch(slice.actions.toggleSidebar());
  };
}
export function UpdateSidebarType(type) {
  return async () => {
    dispatch(slice.actions.updateSidebarType({ type }));
  };
}
