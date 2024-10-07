import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../slice/userSlice/UserSlice'

export const store = configureStore({
    reducer: {
        users: usersReducer
    }
})