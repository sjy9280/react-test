import { configureStore } from "@reduxjs/toolkit";
import skuReducer from '../features/sku/skuSlice'

export default configureStore({
  reducer: {
    sku: skuReducer
  }
})
