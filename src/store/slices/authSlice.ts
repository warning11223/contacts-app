import {createSlice} from '@reduxjs/toolkit'

export interface AuthSlice {
    isAuth: boolean
}

const initialState: AuthSlice = {
    isAuth: localStorage.getItem('isLoggedIn') === 'true',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        isLogin: (state) => {
            state.isAuth = true;
            localStorage.setItem('isLoggedIn', 'true');
        },
        isLogout: (state) => {
            state.isAuth = false;
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.removeItem('userName');
        }
    },
})


export const { isLogin, isLogout } = authSlice.actions

export default authSlice.reducer