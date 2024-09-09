import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginPayload {
  uid: string;
  email: string;
  username: string;
  name: string;
  accessToken: string;
  refreshToken: string;
}

const initialState = {
  user: {
    uid: "",
    email: "",
    username: "",
    name: "",
  },
  auth: {
    accessToken: "",
    refreshToken: "",
  },
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { uid, email, username, name, accessToken, refreshToken } =
        action.payload;

      state.user.uid = uid;
      state.user.email = email;
      state.user.username = username;
      state.user.name = name;
      state.auth.accessToken = accessToken;
      state.auth.refreshToken = refreshToken;
    },
    logout: (state) => {
      state.user.uid = "";
      state.user.email = "";
      state.user.username = "";
      state.user.name = "";
      state.auth.accessToken = "";
      state.auth.refreshToken = "";
    },
  },
});

export const { login, logout } = accountSlice.actions;
export { type LoginPayload };
export default accountSlice.reducer;
