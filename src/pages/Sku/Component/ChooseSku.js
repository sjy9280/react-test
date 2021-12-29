import BlockTitle from "../../../Components/BlockTitle";
import { useSelector } from "react-redux";
import { selectAttr } from "../../../features/sku/skuSlice";
import { useEffect, useState } from "react";

function ChooseSku() {
  const sku = useSelector(selectAttr)

  // 选择路径
  const [selectState, setSelectState] = useState([])
  // 按钮状态
  const [btnState, setBtnState] = useState({})


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
  }

  useEffect(() => {
    initBtnState()
  }, [sku])


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
                  { btnState[attr].map(item => {
                    return (
                      <></>
                    )
                  }) }
                </div>
              </div>
            )
          })
          // sku.attr.map(pro => {
          //   return (
          //     <div className={ 'sku-attr' }>
          //       <span>{ pro.name }</span>
          //       <div className={ 'attr-choice' }>
          //         { pro.value.map(item => {
          //           return (
          //             <Button shape="round" className={ 'interval-space' }>{ item }</Button>
          //           )
          //         }) }
          //       </div>
          //     </div>
          //   )
          // })
        }
      </div>
    </div>
  )
}

export default ChooseSku
