import { configureStore } from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {redditApi} from '../api/redditAPI';
import redditSlice from './redditSlice';
import subredditsSlice from './subredditsSlice';

export const store = configureStore({
  reducer: {
    [redditApi.reducerPath]: redditApi.reducer,
    reddit: redditSlice,
    subreddits: subredditsSlice
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(redditApi.middleware),
});

setupListeners(store.dispatch);