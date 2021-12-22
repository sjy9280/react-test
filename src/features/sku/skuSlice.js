import { createSlice } from "@reduxjs/toolkit";


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
  name: 'size',
  initialState: {
    attr: [
      {
        name: '颜色',
        value: ['黑色']
      }, {
        name: '尺寸',
        value: ['13.3']
      }, {
        name: '存储',
        value: ['128', '256']
      }
    ],
    skuList: [{
      id: 0,
      inventory: '11',
      spec: ['黑色', '13.3', '128']
    }, {
      id: 0,
      inventory: '12',
      spec: ['黑色', '13.3', '256']
    }]
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
    }
  }
})

export const { addAttr, editAttr, deleteAttr } = skuSlice.actions
export const selectAttr = state => state.sku

export default skuSlice.reducer

