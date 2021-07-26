import { configureStore } from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {redditApi} from '../api/redditAPI';
import redditReducer from './redditSlice';

export const store = configureStore({
  reducer: {
    [redditApi.reducerPath]: redditApi.reducer,
    reddit: redditReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(redditApi.middleware)
});

setupListeners(store.dispatch);