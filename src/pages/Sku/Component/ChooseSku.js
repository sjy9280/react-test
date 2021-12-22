import BlockTitle from "../../../Components/BlockTitle";
import { useSelector } from "react-redux";
import { selectAttr } from "../../../features/sku/skuSlice";
import { Button } from "antd";

function ChooseSku() {
  const sku = useSelector(selectAttr)



  return (
    <div>
      <BlockTitle title={ '选择SKU' }/>
      <div className={'choose-border'}>
        {
          sku.attr.map(pro => {
            return (
              <div className={ 'sku-attr' }>
                <span>{ pro.name }</span>
                <div className={ 'attr-choice' }>
                  { pro.value.map(item => {
                    return (
                      <Button shape="round" className={ 'interval-space' }>{ item }</Button>
                    )
                  }) }
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ChooseSku
