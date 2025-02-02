import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    addConnections: (state, action) => action.payload,
    removeConnections: (state, action) => null,
  },
});

export const { addConnections } = connectionsSlice.actions;
export default connectionsSlice.reducer;
