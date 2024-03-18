import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    signOut: (state) => {
      state.isLoggedIn = false;
      state.token = "";
    },
  },
});

export default slice.reducer;

export function LoginUser(formValues) {
  return async (dispatch, getState) => {
    try {
      const res = await axios.post(
        "/auth/login",
        { ...formValues },
        { header: { "Content-Type": "application/json" } }
      );
      if (res.status === 200) {
        console.log(res);
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: res.data.token,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
}
