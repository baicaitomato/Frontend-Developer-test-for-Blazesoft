import { configureStore } from '@reduxjs/toolkit'
import bookReducer from './bookSlice'
import popupRedicer from './PopupSlice';

export const store = configureStore({
    reducer: {
        book: bookReducer,
        popup: popupRedicer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;