import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    isPremium: false,
    membershipType: null,
    // other user fields...
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            return { ...state, ...action.payload };
        },
        removeUser: (state, action) => {
          return null;
        },
        updateUser: (state, action) => {
            state.isPremium = action.payload.isPremium;
            state.membershipType = action.payload.membershipType;
        },
    },
});

export const { addUser, removeUser,updateUser } = userSlice.actions;
export default userSlice.reducer;
