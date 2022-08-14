import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from "axios";
import {USERS_URL} from "../../urls";
import {IUsersResponse} from "../../models/models";

export interface usersSlice {
    users: IUsersResponse[];
    status: 'pending' | 'fulfilled' | 'rejected';
    currentUser: string | null
}

const initialState: usersSlice = {
    users: [],
    status: 'pending',
    currentUser: localStorage.getItem('userName')
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        currentUserLogin: (state, action: PayloadAction<IUsersResponse>) => {
            state.currentUser = action.payload.username;
            localStorage.setItem('userName', action.payload.username);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUsersResponse[]>) => {
            state.users = action.payload;
            state.status = 'fulfilled';
        });
        builder.addCase(fetchUsers.pending, (state) => {
            state.users = [];
            state.status = 'pending';
        });
        builder.addCase(fetchUsers.rejected, (state) => {
            state.users = [];
            state.status = 'rejected';
        });
    },

})

export const fetchUsers = createAsyncThunk<IUsersResponse[]>(
    'users/fetchUsers',
    async () => {
        const { data } = await axios.get<IUsersResponse[]>(USERS_URL);
        return data
    }
)

export const { currentUserLogin } = usersSlice.actions

export default usersSlice.reducer