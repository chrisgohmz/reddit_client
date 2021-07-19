import { createSlice } from "@reduxjs/toolkit";

const redditSlice = createSlice({
    name: 'reddit',
    initialState: {
        posts: [],
        searchTerm: '',
        currentSubreddit: '/r/Maplestory',
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setCurrentSubreddit: (state, action) => {
            state.currentSubreddit = action.payload;
            state.searchTerm = '';
        },
        toggleShowingComments: (state, action) => {
            state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
        },
        setComments: (state, action) => {
            state.posts[action.payload.index].comments = action.payload.comments;
        }
    }
});

export const selectPosts = state => state.reddit.posts;
export const selectSearchTerm = state => state.reddit.searchTerm;
export const selectCurrentSubreddit = state => state.reddit.currentSubreddit;

export const {setPosts, setSearchTerm, setCurrentSubreddit, toggleShowingComments, setComments} = redditSlice.actions;
export default redditSlice.reducer;