import React, { useEffect, useState } from "react";
import BlockTitle from "../../../Components/BlockTitle";
import { Button, Form, Input, Select, Space, Table } from "antd";
import { cartesian } from "../../../utils/util";

function CreateSkuPlus(props) {

  const { Option } = Select
  const { onChange } = props

  const [skuAttrState, setSkuAttrState] = useState([{
    name: '颜色',
    key: 1,
    values: ['黑色', '白色']
  }, {
    name: '尺寸',
    key: 2,
    values: ['13.3', '15']
  }, {
    name: '存储',
    key: 3,
    values: ['128', '256']
  }])
  const [columnsState, setColumnsState] = useState([])
  const [rowsState, setRowsState] = useState([])

  // 商品属性相关操作
  const goodsAttr = {
    // 添加属性
    addAttr() {
      setSkuAttrState((pre) => [
        ...pre,
        {
          name: '',
          key: Math.random(),
          values: []
        }
      ])
    },

    // 删除属性
    removeAttr(index) {
      setSkuAttrState((pre) => {
        const newSkuAttr = [...pre]
        newSkuAttr.splice(index, 1)
        return newSkuAttr
      })
    },

    //改变属性名
    changeAttrName(index, name) {
      setSkuAttrState((pre) => {
        const newSkuAttr = [...pre]
        newSkuAttr[index].name = name
        return newSkuAttr
      })
    },

    // 改变属性值
    changeAttrValue(index, values) {
      setSkuAttrState((pre) => {
        const newSkuAttr = [...pre]
        newSkuAttr[index].values = values
        return newSkuAttr
      })
    }
  }

  // 表格数据相关操作
  const tableData = {
    changeInventory(row, inventory) {
      setRowsState((prevState => {
        row.inventory = Number(inventory)
        const newRowsState = JSON.parse(JSON.stringify(prevState));
        return newRowsState
      }))
    }
  }

  // 当属性发生变化时，表格改变
  useEffect(() => {

    const columns = []
    const rows = []

    const properties = []
    skuAttrState.forEach((skuAttr) => {
      if (skuAttr.name && skuAttr.values.length > 0) {
        const cartesianItem = []

        columns.push({
          title: skuAttr.name,
          dataIndex: "properties"
        })

        skuAttr.values.forEach(value => {
          cartesianItem.push({
            name: skuAttr.name,
            value
          })
        })
        properties.push(cartesianItem)
      }
    })

    // 计算出所有的组合并添加到行数据中
    const cartesianSku = cartesian(...properties)
    cartesianSku?.forEach((cartesianItem, index) => {
      rows.push({
        key: index,
        properties: Array.isArray(cartesianItem) ? cartesianItem : [cartesianItem],
        inventory: 0
      })
    })

    columns.forEach((column, columnIndex) => {
      column.render = (value, _, index) => {
        const item = value.find(v => v.name === column.title)
        const obj = {
          children: item?.value,
          props: {}
        }
        return obj
      }
    })

    columns.push({
      title: '库存',
      dataIndex: 'inventory',
      width: 200,
      render: (value, row, index) => {
        return (
          <Input
            value={ value }
            required
            onChange={ (e) => tableData.changeInventory(row, e.target.value) }
          />
        )
      }
    })
    setRowsState(rows)
    setColumnsState(columns)

  }, [skuAttrState])

  useEffect(() => {
    onChange?.(rowsState, skuAttrState)
  }, [rowsState])

  return (
    <div>
      <BlockTitle title={ '创建SKU' }/>
      <div>
        <Form.Item label={ '商品属性' } colon={ true }>
          <Space direction={ "vertical" }>
            {
              skuAttrState.map((attr, index) => (
                <Space key={ attr.key }>
                  <Input
                    addonBefore="属性名"
                    defaultValue={ attr.name }
                    onChange={ (e) => goodsAttr.changeAttrName(index, e.target.value) }
                  />
                  <Select
                    mode="tags"
                    style={ { width: 400 } }
                    placeholder="添加属性值"
                    value={ attr.values }
                    onChange={ (v) => goodsAttr.changeAttrValue(index, v) }
                    // onChange={handleChange}
                  >
                    { attr?.values?.map((value) => (
                      <Option key={ value } value={ value }>
                        { value }
                      </Option>
                    )) }
                  </Select>
                  <Button type="link" danger onClick={ () => goodsAttr.removeAttr(index) }>
                    删除
                  </Button>
                </Space>
              ))
            }
            {
              skuAttrState.length < 6 && (
                <Button onClick={ goodsAttr.addAttr }>
                  添加属性
                </Button>
              )
            }
          </Space>
        </Form.Item>
        {
          rowsState.length > 0 ? (
            <Form.Item label={ '商品库存' } colon={ true }>
              <Table dataSource={ rowsState } columns={ columnsState } bordered
                     pagination={ false }/></Form.Item>

          ) : ''
        }
      </div>
    </div>
  )
}

export default CreateSkuPlus
