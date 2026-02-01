import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserRole } from '../../types/api/organization';
const initialState = {
  role: undefined as UserRole | undefined,
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole(state, action: PayloadAction<UserRole>) {
      state.role = action.payload;
    },
    clearRole(state) {
      state.role = undefined;
    },
  },
});
export const { setRole, clearRole } = roleSlice.actions;
export default roleSlice.reducer;
