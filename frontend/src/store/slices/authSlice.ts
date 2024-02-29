import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  twoFactorEnabled: boolean;
  verifiedAt: Date;
  _id: string;
}

interface IInitialState {
  user: IUser | null;
}

const initialState: IInitialState = {
  user: null,
};

const slice = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = slice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export default slice.reducer;
