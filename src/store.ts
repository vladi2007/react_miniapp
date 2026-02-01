import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import roleReducer from './features/role/roleSlice';
import { useSelector } from 'react-redux';
const store = configureStore({
  reducer: {
    user: userReducer,
    role: roleReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTelegramUser = () => {
  return useSelector((state: RootState) => state.user.user);
};
export const useUserRole = () => {
  return useSelector((state: RootState) => state.role.role);
};
