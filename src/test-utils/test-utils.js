import React from 'react';
import {render as rtlRender} from '@testing-library/react';
import {Provider} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import redditReducer from '../store/redditSlice';
import {redditApi} from '../api/redditAPI';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const store = configureStore({
    reducer: {
      reddit: redditReducer,
    }
});
  
const Providers = ({children}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

export const render = (ui, options) => rtlRender(ui, {wrapper: Providers, ...options});

export * from '@testing-library/react';