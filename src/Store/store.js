import { configureStore } from "@reduxjs/toolkit";
import colorReducer from '../features/sku/colorSlice'
import sizeReducer from '../features/sku/sizeSlice'
import storageReducer from '../features/sku/storageSlice'

export default configureStore({
  reducer: {
    colorList: colorReducer,
    sizeList: sizeReducer,
    storageList: storageReducer
  }
})
