import { createSlice } from "@reduxjs/toolkit";

const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: [],
    reducers: {
        setSubreddits: (state, action) => {
            state = action.payload;
        }
    }
});

export const selectSubreddits = state => state.subreddits;

export const {setSubreddits} = subredditsSlice.actions;
export default subredditsSlice.reducer;