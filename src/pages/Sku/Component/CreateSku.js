import React from "react";
import BlockTitle from "../../../Components/BlockTitle";
import { useDispatch, useSelector } from "react-redux";

import '../../../static/style/sku.css'
import { addAttr, deleteAttr, editAttr, selectAttr } from "../../../features/sku/skuSlice";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Input, Table } from "antd";

function CreateSku(props) {
  const sku = useSelector(selectAttr)
  const dispatch = useDispatch()
  const columns = [{
    title: 'id',
    dataIndex: 'id',
  }, {
    title: '样式',
    dataIndex: 'spec',
  }, {
    title: '库存',
    dataIndex: 'inventory'
  }]

  function changeInput(attrIndex, valueIndex, ev) {
    const value = ev.target.value
    dispatch(editAttr({ attrIndex, valueIndex, value }))
  }

  return (
    <div>
      <BlockTitle title={ '创建SKU' }/>
      {
        sku.attr.map((item, attrIndex) => {
          return (
            <div className={ 'sku-specification' } key={ attrIndex }>
              <span>{ item.name }:</span><PlusOutlined onClick={ () => dispatch(addAttr(attrIndex)) }/>
              <div>
                {
                  item.value.map((item1, valueIndex) => {
                    return <Input value={ item1 } key={ valueIndex }
                                  onChange={ changeInput.bind(this, attrIndex, valueIndex) }/>
                  })
                }
                { item.value.length > 0 ? <DeleteOutlined onClick={ () => dispatch(deleteAttr(attrIndex)) }/> : '' }
              </div>
            </div>
          )
        })
      }

      <Table columns={ columns } dataSource={ sku.skuList } bordered/>

    </div>
  )
}


export default CreateSku
