import { createSlice } from "@reduxjs/toolkit";

export const storageSlice = createSlice({
  name: 'storage',
  initialState: JSON.parse(localStorage.getItem('storageList')) || ['256g'],
  reducers: {
    addStorage: state => [...state, '']
  }
})

export const { addStorage } = storageSlice.actions

export const selectStorageList = state => state.storageList

export default storageSlice.reducer
