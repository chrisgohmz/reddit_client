import { configureStore } from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {redditApi} from '../api/redditAPI';
import redditSlice from '../features/Subreddits/redditSlice';

export const store = configureStore({
  reducer: {
    [redditApi.reducerPath]: redditApi.reducer,
    reddit: redditSlice
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(redditApi.middleware),
});

setupListeners(store.dispatch);