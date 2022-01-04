import BlockTitle from "../../../Components/BlockTitle";
import { useSelector } from "react-redux";
import { selectAttr } from "../../../features/sku/skuSlice";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { contain } from "../../../utils/util";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, message } from "antd";

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

  // 选择后按钮的状态变化
  function changeBtnState() {
    let attr = []
    let attrValue = []
    Object.keys(selectState).forEach(item => {
      attr.push(item)
      attrValue.push(selectState[item])
    })

    let btn = { ...btnState }

    if (Object.keys(selectState).length > 0) {
      if (Object.keys(selectState).length > 0) {
        Object.keys(btn).forEach(attrItem => {
          if (!attr.includes(attrItem)) {
            btnState[attrItem].forEach((item, index) => {
              let count = 0
              let newAttrValue = [...attrValue, item.value]
              for (let i = 0; i < sku.skuList.length; i++) {
                if (contain(sku.skuList[i].spec, newAttrValue)) {
                  if (parseInt(sku.skuList[i].inventory) !== 0) {
                    count++
                  }
                }
              }
              btn[attrItem][index].disabled = count === 0;
            })
          }
        })
        setBtnState(btn)
      }
    } else {
      initBtnState()
    }

    if (Object.keys(selectState).length === sku.attr.length) {
      for (let i = 0; i < sku.skuList.length; i++) {
        if (contain(sku.skuList[i].spec, attrValue)) {
          setSkuNum(sku.skuList[i].inventory)
        }
      }
    }
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
      if (!attr.includes(item)) {
        return item
      }
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
    changeBtnState()
  }, [selectState])

  useEffect(() => {
    initBtnState()
  }, [sku])

  function clickBtn(attr, index) {
    const btn = { ...btnState }
    const select = { ...selectState }
    btn[attr][index].selected = !btn[attr][index].selected
    if (btn[attr][index].selected) {
      btn[attr].forEach((item, pos) => {
        if (pos !== index) {
          if (item.selected) {
            item.selected = false
          }
        }
      })
      select[attr] = btn[attr][index].value
    } else {
      delete select[attr]
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
