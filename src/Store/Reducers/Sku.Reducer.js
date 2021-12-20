import { ADD_COLOR, ADD_SIZE, ADD_SKU, ADD_STORAGE } from "../Action_types/Sku.Action.types";

const initialState = {
  sku: localStorage.getItem('sku') || [],
  colorList: JSON.parse(localStorage.getItem('colorList')) || ['蓝色'],
  sizeList: JSON.parse(localStorage.getItem('sizeList')) || [],
  storageList: JSON.parse(localStorage.getItem('storageList')) || []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COLOR:
      const colorState = { ...state }
      const colorList = [...state.colorList, '']
      colorState.colorList = colorList
      return colorState
    case ADD_SIZE:
      const sizeState = { ...state }
      const sizeList = [...state.sizeList, '']
      sizeState.sizeList = sizeList
      return sizeState
    case ADD_STORAGE:
      const storageState = { ...state }
      const storageList = [...state.storageList, '']
      storageState.storageList = storageList
      return storageState
    case ADD_SKU:
      return state
    default:
      return state
  }
}
