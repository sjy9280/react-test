import { createSlice } from "@reduxjs/toolkit";


// 组合生成
function attrArrange(attr) {
  let head = attr[0].value
  for (let i = 1; i < attr.length; i++) {
    head = addNewAttr(head, attr[i].value)
  }
  let skuList = []
  for (let i = 0; i < head.length; i++) {
    skuList.push({ id: i, inventory: '0', spec: head[i] })
  }
  return skuList
}

function addNewAttr(head, choice) {
  let result = [];
  for (let i = 0; i < head.length; i++) {
    for (let j = 0; j < choice.length; j++) {
      let spec = []
      if (head[i] instanceof Array) {
        spec.push(...head[i], choice[j])
      } else {
        spec.push(head[i], choice[j])
      }
      result.push(spec)
    }
  }
  return result;
}

export const skuSlice = createSlice({
  name: 'sku',
  initialState: {
    attr: [
      {
        name: '颜色',
        value: []
        // ['黑色', '银色']
      }, {
        name: '尺寸',
        value: []
        // ['13.3', '15']
      }, {
        name: '存储',
        value: []
        // ['128', '256', '512']
      }
    ],
    skuList: []
  },
  reducers: {
    addAttr: (state, action) => {
      state.attr[action.payload].value = [...state.attr[action.payload].value, '']
      state.skuList = attrArrange(state.attr)
    },
    editAttr: (state, action) => {
      const attrIndex = action.payload.attrIndex
      const valueIndex = action.payload.valueIndex
      const value = action.payload.value
      state.attr[attrIndex].value[valueIndex] = value
      state.skuList = attrArrange(state.attr)
    },
    deleteAttr: (state, action) => {
      const attrIndex = action.payload
      state.attr[attrIndex].value.pop()
      state.skuList = attrArrange(state.attr)
    },
    editInventory: (state, action) => {
      state.skuList[action.payload.row.id].inventory = action.payload.row.inventory
    }
  }
})

export const { addAttr, editAttr, deleteAttr, editInventory } = skuSlice.actions
export const selectAttr = state => state.sku

export default skuSlice.reducer

