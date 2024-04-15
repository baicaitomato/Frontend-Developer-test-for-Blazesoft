import { createSlice } from '@reduxjs/toolkit'

export const popupSlice = createSlice({
    name: "popup",
    initialState: 'none',
    reducers: {
        showAddPopup: (state) => state = 'add',
        showModifyPopup: (state) => state = 'modify',
        hidePopup: (state) => state = 'none'
    }
})

export const {showAddPopup, showModifyPopup, hidePopup} = popupSlice.actions;
export default popupSlice.reducer;