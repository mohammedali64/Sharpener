import { createSlice } from '@reduxjs/toolkit';

const getMailSlice = createSlice({
    name: 'getMail',
    initialState: {
        mails: [],
    },
    reducers: {
        getSentMails: (state, action) => {
            state.mails = action.payload;
        },
        
    },
});

export const { getSentMails } = getMailSlice.actions;
export default getMailSlice.reducer;
