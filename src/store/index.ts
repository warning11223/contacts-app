import {configureStore} from '@reduxjs/toolkit'
import authSlice from "./slices/authSlice";
import usersSlice from "./slices/usersSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import contactsSlice from "./slices/contactsSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        users: usersSlice,
        contacts: contactsSlice
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector