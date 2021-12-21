import { createSlice } from "@reduxjs/toolkit";

export const colorSlice = createSlice({
  name: 'color',
  initialState: JSON.parse(localStorage.getItem('colorList')) || ['蓝色'],
  reducers: {
    addColor: state => [...state, ''],
    editColor: (state, action) => {
      state[action.payload.index] = action.payload.value
    }
  }
})

export const { addColor, editColor } = colorSlice.actions

export const selectColorList = state => state.colorList

export default colorSlice.reducer
