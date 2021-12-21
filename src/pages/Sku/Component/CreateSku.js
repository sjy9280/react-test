import React from "react";
import BlockTitle from "../../../Components/BlockTitle";
import { useDispatch, useSelector } from "react-redux";

import '../../../static/style/sku.css'
import { addAttr, deleteAttr, editAttr, selectAttr } from "../../../features/sku/skuSlice";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Table } from "antd";

function CreateSku(props) {
  const sku = useSelector(selectAttr)
  const dispatch = useDispatch()

  const columns = [{
    title: 'id',
    dataIndex: 'id',
  }, {
    title: '颜色',
    dataIndex: 'color',
  }, {
    title: '尺寸',
    dataIndex: 'size'
  }, {
    title: '存储',
    dataIndex: 'storage'
  }, {
    title: '库存',
    dataIndex: 'inventory',
    editable: true
  }]

  const sourceDate = sku.skuList.map((item) => {
    return {
      id: item.id,
      color: item.spec[0],
      size: item.spec[1],
      storage: item.spec[2],
      inventory: item.inventory
    }
  })

  function changeInput(attrIndex, valueIndex, ev) {
    const value = ev.target.value
    dispatch(editAttr({ attrIndex, valueIndex, value }))
  }

  const EditableContext = React.createContext(null);

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  

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

      <Table columns={ columns } dataSource={ sourceDate } bordered/>

    </div>
  )
}


export default CreateSku
