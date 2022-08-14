import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ContactsResponse, PostUserResponse, PutUserResponse} from "../../models/models";
import axios from "axios";
import {CONTACTS_URL} from "../../urls";

export interface ContactsState {
    contacts: ContactsResponse[];
    status: 'pending' | 'fulfilled' | 'rejected';
}

const initialState: ContactsState = {
    contacts: [],
    status: 'pending'
}

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        filterContacts: (state, action:PayloadAction<string>) => {
            let filteredContacts: ContactsResponse[] = [];
            const usersVariable = state.contacts.map(item => {
                if(item.username === action.payload) {
                    filteredContacts.push(item)
                }
            });
            state.contacts = filteredContacts;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchContacts.fulfilled, (state, action: PayloadAction<ContactsResponse[]>) => {
            state.contacts = action.payload;
            state.status = 'fulfilled';
        });
        builder.addCase(fetchContacts.pending, (state) => {
            state.contacts = [];
            state.status = 'pending';
        });
        builder.addCase(fetchContacts.rejected, (state) => {
            state.contacts = [];
            state.status = 'rejected';
        });


        builder.addCase(deleteContact.fulfilled, (state, action: PayloadAction<string>) => {
            state.status = 'fulfilled';
            state.contacts = state.contacts.filter(item => item.id !== action.payload)
        });
        builder.addCase(deleteContact.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(deleteContact.rejected, (state) => {
            state.contacts = [];
            state.status = 'rejected';
        });


        builder.addCase(addContact.fulfilled, (state, action: PayloadAction<ContactsResponse>) => {
            state.status = 'fulfilled';
            state.contacts.push(action.payload)
        });
        builder.addCase(addContact.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(addContact.rejected, (state) => {
            state.contacts = [];
            state.status = 'rejected';
        });

        builder.addCase(editContact.fulfilled, (state, action: PayloadAction<PutUserResponse>) => {
            state.status = 'fulfilled';
            const editedContact = state.contacts.filter(item => {
                if(item.id === action.payload.id){
                    item.id = action.payload.id;
                    item.username = action.payload.username;
                    item.email = action.payload.email;
                    item.phone = action.payload.phone;
                }
            })
            state.contacts = [...state.contacts, ...editedContact]
        });
        builder.addCase(editContact.pending, (state) => {
            state.status = 'pending';
        });
        builder.addCase(editContact.rejected, (state) => {
            state.contacts = [];
            state.status = 'rejected';
        });
    })
})

export const fetchContacts = createAsyncThunk<ContactsResponse[]>(
    'contacts/fetchContacts',
    async () => {
        const { data } = await axios.get<ContactsResponse[]>(CONTACTS_URL);
        return data
    }
)

export const deleteContact = createAsyncThunk<string, string>(
    'contacts/deleteContact',
    async (id) => {
        const { data } = await axios.delete<ContactsResponse>(`${CONTACTS_URL}/${id}`);
        return id;
    }
)

export const addContact = createAsyncThunk<ContactsResponse, PostUserResponse>(
    'contacts/addContact',
    async ({username, email , phone}) => {

        const { data } = await axios.post<ContactsResponse>(
            CONTACTS_URL,
            {username, email, phone},
            {headers: {
                    'Content-Type': 'application/json',
                }}
            )
        return data;
    }
)

export const editContact = createAsyncThunk<PutUserResponse, PutUserResponse>(
    'contacts/editContact',
    async ({username, email , phone, id}) => {

        const { data } = await axios.put<PutUserResponse>(
            `${CONTACTS_URL}/${id}`,
            {username, email, phone},
            {headers: {
                    'Content-Type': 'application/json',
                }}
        )
        return data;
    }
)

export const { filterContacts } = contactsSlice.actions

export default contactsSlice.reducer