import { createSlice } from '@reduxjs/toolkit'
import type { Book } from '../types'

interface BookState {
    books: Book[],
    index: number
}

const initialState = {
    books: [],
    index: 0,
} as BookState

export const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        addbook: (state, action) => {
            state.books.push({...action.payload});
            state.index += 1;
        },
        removebook: (state, action) => {
            state.books = state.books.filter(book => book.id !== action.payload);
        },
        modifybook: (state, action) => {
            const modifyBookIndex = state.books.findIndex((book) => book.id == action.payload.id);
            state.books[modifyBookIndex].name = action.payload.name;
            state.books[modifyBookIndex].price = action.payload.price;
            state.books[modifyBookIndex].category = action.payload.category;
            state.books[modifyBookIndex].description = action.payload.description;
        }
    }
})

export const {addbook, removebook, modifybook} = bookSlice.actions;
export default bookSlice.reducer;