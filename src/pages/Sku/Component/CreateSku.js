import React from "react";
import BlockTitle from "../../../Components/BlockTitle";
import { PlusOutlined } from "@ant-design/icons";
import { Input } from 'antd'
import { addColor, editColor, selectColorList } from "../../../features/sku/colorSlice";
import { useDispatch, useSelector } from "react-redux";

import '../../../static/style/sku.css'
import { addSize, selectSizeList } from "../../../features/sku/sizeSlice";
import { addStorage, selectStorageList } from "../../../features/sku/storageSlice";

function CreateSku(props) {
  const colorList = useSelector(selectColorList)
  const sizeList = useSelector(selectSizeList)
  const storageList = useSelector(selectStorageList)
  const dispatch = useDispatch()

  function editColorList(index, ev) {
    const value = ev.target.value
    dispatch(editColor({ index, value }))
  }

  return (
    <div>
      <BlockTitle title={ '创建SKU' }/>
      <div className={ 'sku-specification' }>
        颜色：<PlusOutlined onClick={ () => dispatch(addColor()) }/>
        <div>
          { colorList.map((item, index) => {
            return <Input value={ item } key={ index } onChange={  editColorList.bind(this,index) }/>
          }) }
        </div>
      </div>
      <div className={ 'sku-specification' }>
        尺码：<PlusOutlined onClick={ () => dispatch(addSize()) }/>
        <div>
          { sizeList.map((item, index) => {
            return <Input value={ item } key={ index }/>
          }) }
        </div>
      </div>
      <div className={ 'sku-specification' }>
        存储：<PlusOutlined onClick={ () => dispatch(addStorage()) }/>
        <div>
          { storageList.map((item, index) => {
            return <Input value={ item } key={ index }/>
          }) }
        </div>
      </div>
    </div>
  )
}


export default CreateSku
