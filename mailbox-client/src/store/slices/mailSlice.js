import { createSlice } from '@reduxjs/toolkit';

const mailSlice = createSlice({
    name: 'mail',
    initialState: {
        mails: [],
    },
    reducers: {
        setMails: (state, action) => {
            state.mails = action.payload;
        },
        markMailAsRead: (state, action) => {
            const mailId = action.payload;
            const mail = state.mails.find((mail) => mail.id === mailId);
            if (mail) {
                mail.read = true;
            }
        },
    },
});

export const { setMails, markMailAsRead } = mailSlice.actions;
export default mailSlice.reducer;
