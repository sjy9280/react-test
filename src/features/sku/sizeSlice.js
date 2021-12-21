import { createSlice } from "@reduxjs/toolkit";

export const sizeSlice = createSlice({
  name: 'size',
  initialState: JSON.parse(localStorage.getItem('sizeList')) || ['13.3'],
  reducers: {
    addSize: state =>  [...state, '']
  }
})

export const { addSize } = sizeSlice.actions

export const selectSizeList = state => state.sizeList

export default sizeSlice.reducer
