import BlockTitle from "../../../Components/BlockTitle";
import { useSelector } from "react-redux";
import { selectAttr } from "../../../features/sku/skuSlice";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { contain } from "../../../utils/util";

function ChooseSku() {
  const sku = useSelector(selectAttr)

  // 选择路径
  const [selectState, setSelectState] = useState({})
  // 按钮状态
  const [btnState, setBtnState] = useState({})
  // 购买数量
  const [buyNumState, setBuyNumState] = useState(1)
  // sku数量
  const [skuNum, setSkuNum] = useState(1)


  // 初始化按钮状态
  function initBtnState() {
    const skuBtn = {}
    sku.attr.forEach(attrItem => {
      skuBtn[attrItem.name] = []
      attrItem.value.forEach(item => {
        let count = 0
        for (let i = 0; i < sku.skuList.length; i++) {
          if (sku.skuList[i].spec.includes(item)) {
            if (parseInt(sku.skuList[i].inventory) !== 0) {
              count++
            }
          }
        }
        if (count === 0) {
          skuBtn[attrItem.name].push({
            disabled: true,
            selected: false,
            value: item
          })
        } else {
          skuBtn[attrItem.name].push({
            disabled: false,
            selected: false,
            value: item
          })
        }
      })
    })
    setBtnState(skuBtn)
    return skuBtn
  }

  // 加入购物车
  function addToShopping() {
    if (Object.keys(selectState).length < sku.attr.length) {
      checkSku()
    }
  }

  // 检查sku属性是否已选择
  function checkSku() {
    let attr = []
    Object.keys(selectState).forEach(item => {
      attr.push(item)
    })

    let unselected = Object.keys(btnState).filter(item => {
      return !attr.includes(item)
    })

    let msg = ''
    unselected.forEach(item => {
      msg += item
      msg += ','
    })
    msg = msg.substring(0, msg.length - 1)

    message.error(msg + '未选择')
  }

  function minusProduct() {
    if (buyNumState <= 1) {
      message.error('购买数量不可小于1', 1)
    } else {
      setBuyNumState(buyNumState - 1)
    }
  }

  function plusProduct() {
    setBuyNumState(buyNumState + 1)
  }

  useEffect(() => {
    initBtnState()
  }, [sku])

  // 点击按钮，选择
  function clickBtn(attr, index) {
    const btn = { ...btnState }
    const select = { ...selectState }

    // 按钮选择状态修改
    btn[attr][index].selected = !btn[attr][index].selected

    // 按钮选中
    if (btn[attr][index].selected) {

      if (attr in select) {
        // 需要将之前选中的状态修改为为选中
        btn[attr].forEach((item, pos) => {
          if (pos !== index && item.selected) {
            item.selected = false

          }
        })
      }
      select[attr] = btn[attr][index].value
    } else {
      // 按钮取消选中
      delete select[attr]
    }

    // // 将按钮状态初始化
    Object.keys(btn).forEach(attrItem => {
      for (let i = 0; i < btn[attrItem].length; i++) {
        let count = 0
        for (let j = 0; j < sku.skuList.length; j++) {
          if (sku.skuList[j].spec.includes(btn[attrItem][i].value)) {
            if (parseInt(sku.skuList[j].inventory) !== 0) {
              count++
            }
          }
        }
        btn[attrItem][i].disabled = count === 0
      }
    })
    let selectedAttr = []
    let selectedAttrValue = []
    Object.keys(select).forEach(item => {
      selectedAttr.push(item)
      selectedAttrValue.push(select[item])
    })

    // 根据已选择的select中的每一个选项改变按钮状态
    Object.keys(select).forEach(selectItem => {
      Object.keys(btn).forEach(attrItem => {
        if (selectItem !== attrItem) {
          btn[attrItem].forEach((item, index) => {
            let newAttrValue = [select[selectItem], item.value]
            let count = 0
            for (let i = 0; i < sku.skuList.length; i++) {
              if (contain(sku.skuList[i].spec, newAttrValue)) {
                if (parseInt(sku.skuList[i].inventory) !== 0) {
                  count++
                }
              }
            }
            btn[attrItem][index].disabled = count === 0 || btn[attrItem][index].disabled
          })
        }
      })
    })


    // 根据已选择的select改变按钮状态
    if (selectedAttr.length !== Object.keys(btn).length) {
      Object.keys(btn).forEach(attrItem => {
        if (!selectedAttr.includes(attrItem)) {
          btn[attrItem].forEach((item, index) => {
            let newAttrValue = [...selectedAttrValue, item.value]
            let count = 0
            for (let i = 0; i < sku.skuList.length; i++) {
              if (contain(sku.skuList[i].spec, newAttrValue)) {
                if (parseInt(sku.skuList[i].inventory) !== 0) {
                  count++
                }
              }
            }
            btn[attrItem][index].disabled = count === 0 || btn[attrItem][index].disabled
          })
        }
      })
    } else {
      Object.keys(btn).forEach(attrItem => {
        let newSelectValue = []
        Object.keys(select).forEach(item => {
          if (item !== attrItem) {
            newSelectValue.push(select[item])
          }
        })
        console.log(newSelectValue)
        btn[attrItem].forEach((item, index) => {
          if (!selectedAttrValue.includes(item.value)) {
            newSelectValue.push(item.value)
          }
          console.log(newSelectValue)
          let count = 0
          for (let i = 0; i < sku.skuList.length; i++) {
            if (contain(sku.skuList[i].spec, newSelectValue)) {
              if (parseInt(sku.skuList[i].inventory) !== 0) {
                count++
              }
            }
          }
          btn[attrItem][index].disabled = count === 0 || btn[attrItem][index].disabled
          if (newSelectValue.length === selectedAttrValue.length) {
            newSelectValue.pop()
          }
        })
      })
    }
    setSelectState(select)
    setBtnState(btn)
  }

  return (
    <div>
      <BlockTitle title={ '选择SKU' }/>
      <div className={ 'choose-border' }>
        {
          Object.keys(btnState).map(attr => {
            return (
              <div className={ 'sku-attr' }>
                <span>{ attr }</span>
                <div className={ 'attr-choice' }>
                  { btnState[attr].map((item, index) => {
                    return (
                      <button key={ index }
                              className={ classNames('sku-btn', {
                                'selected': item.selected,
                                'disabled': item.disabled
                              }) }
                              onClick={ () => clickBtn(attr, index) } disabled={ item.disabled }>{ item.value }</button>
                    )
                  }) }
                </div>
              </div>
            )
          })
        }
        {
          <div className={ 'buy-block' }>
            <span>数量：</span>
            <div>
              <MinusOutlined style={ { marginRight: 10 + 'px' } } onClick={ () => minusProduct() }/>
              <div className={ 'buy-num' }>{ buyNumState }</div>
              <PlusOutlined style={ { marginLeft: 10 + 'px' } } onClick={ () => plusProduct() }/>
            </div>
          </div>
        }
        {
          <div className={ 'buy-btn' }>
            <Button type="primary" shape="round" size={ 'large' } onClick={ () => addToShopping() }>加入购物车</Button>
          </div>
        }
      </div>
    </div>
  )
}

export default ChooseSku
