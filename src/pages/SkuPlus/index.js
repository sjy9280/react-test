import './index.scss'
import CreateSkuPlus from "./Component/CreateSkuPlus";
import { useState } from "react";
import { Button } from "antd";
import ChooseSkuPlus from "./Component/ChooseSkuPlus";

function SkuPlus() {

  const [skuState, setSkuState] = useState([])
  const [specState, setSpecState] = useState([])
  let tempSku = []
  let tempSpec = []

  const confirmSkus = () => {
    setSkuState([...tempSku])
    setSpecState([...tempSpec])
  }

  return (
    <div>
      <CreateSkuPlus onChange={
        (skus, spec) => {
          tempSku = skus
          tempSpec = spec
        }
      }/>
      <div className={ 'confirm-button' }>
        <Button onClick={ confirmSkus }>
          确认添加
        </Button>
      </div>
      <ChooseSkuPlus skus={ skuState.filter(sku => sku.inventory > 0) } specs={ specState }/>
    </div>
  )

}

export default SkuPlus
