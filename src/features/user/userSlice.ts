import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TelegramUser } from '../../types/telegram';
const initialState = {
  user: undefined as TelegramUser | undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTelegramUser(state, action: PayloadAction<TelegramUser>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = undefined;
    },
  },
});
export const { setTelegramUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
