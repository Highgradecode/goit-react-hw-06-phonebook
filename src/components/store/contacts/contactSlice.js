import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contactsArr:[],
    },
    reducers: {
        addContact({contactsArr}, action) {
            contactsArr.push(action.payload)
        },
        deleteContact({contactsArr}, action) {
            return { contactsArr: contactsArr.filter(contact => contact.id !== action.payload) }
        },
    }
});

const persistConfig = {
  key: 'contacts',
  storage,
}

export const contactsReducer = persistReducer(
    persistConfig,
    contactsSlice.reducer)

export const { addContact, deleteContact } = contactsSlice.actions;


// selectors

export const getContacts = state => state.contacts.contactsArr;

