import React, { useEffect, useState } from "react";
import BlockTitle from "../../../Components/BlockTitle";
import classNames from "classnames";

function ChooseSkuPlus(props) {
  const { skus, specs } = props
  const [specState, setSpecState] = useState({})
  const [inventoryState, setInventoryState] = useState(0)
  const [buyNumState, setBuyNumState] = useState(0)
  const [matrixState, setMatrixState] = useState([])
  const [currentSelectState, setCurrentSelectState] = useState({})
  const [specListState, setSpecListState] = useState([])


  const initSpec = () => {
    let spec = {}
    let specList = []
    let skuList = skus.filter(sku => sku.inventory > 0)
    skuList.forEach(sku => {
      sku.properties.forEach(pro => {
        if (specList.indexOf(pro.value) === -1) {
          specList.push(pro.value)
        }
      })
    })

    specs?.forEach(specItem => {
      spec[specItem.name] = []
      specItem.values.forEach(value => {
        spec[specItem.name].push({
          selected: false,
          disabled: specList.indexOf(value) === -1,
          value
        })
      })
    })
    setSpecState(spec)
    setSpecListState(specList)
    initMatrix(specList)
  }

  // 初始化邻接矩阵
  const initMatrix = (specList) => {
    let matrix = []
    for (let i = 0; i < specList.length; i++) {
      let array = []
      for (let j = 0; j < specList.length; j++) {
        array.push(0)
      }
      matrix.push(array)
    }
    fillMatrix(matrix, specList)
  }

  // 填充邻接矩阵
  const fillMatrix = (matrix, specList) => {
    let specKeys = specs.map(spec => spec.name)
    let edgeList = getAllPossiblePath(specKeys)
    skus.forEach((sku, skuIndex) => {
      edgeList.forEach(edge => {
        let node1Key = edge[0]
        let node2Key = edge[1]
        let node1Val
        sku.properties.map(item => {
          if (item.name === node1Key) node1Val = item.value
        })
        let node2Val
        sku.properties.forEach(item => {
          if (item.name === node2Key) node2Val = item.value
        })
        let node1Index = specList.indexOf(node1Val)
        let node2Index = specList.indexOf(node2Val)
        let cur = matrix[node1Index][node2Index]
        if (typeof cur !== 'number') {
          matrix[node1Index][node2Index].push(skuIndex + 2)
        } else if (cur > 1) {
          matrix[node1Index][node2Index] = [cur, skuIndex + 2]
        } else {
          matrix[node1Index][node2Index] = skuIndex + 2
        }
      })
    })
    addSameLevelEdge(matrix, specList)
  }

  // 添加同级可达路径
  const addSameLevelEdge = (matrix, specList) => {
    for (let i = 0; i < specs.length; i++) {
      let specItemList = specs[i].values
      specItemList = specItemList.filter(item => specList.indexOf(item) !== -1)
      if (specItemList.length >= 2) {
        let edgeList = getAllPossiblePath(specItemList)
        edgeList.forEach(edge => {
          let node1Index = specList.indexOf(edge[0])
          let node2Index = specList.indexOf(edge[1])
          let cur = matrix[node1Index][node2Index]
          if (typeof cur !== 'number') {
            matrix[node1Index][node2Index].push(1)
          } else if (cur > 1) {
            matrix[node1Index][node2Index] = [cur, 1]
          } else {
            matrix[node1Index][node2Index] = 1
          }
        })
      }
    }
    setMatrixState(matrix)
  }

  // 获取所有可能的边
  const getAllPossiblePath = (specKeys) => {
    let pairs = []
    for (let i = 0; i < specKeys.length; i++) {
      for (let j = 0; j < specKeys.length; j++) {
        pairs.push([specKeys[i], specKeys[j]])
      }
    }
    return pairs
  }

  // 点击属性按钮
  function selectSpec(key, index, value) {
    let newSpecs = { ...specState }
    let newCurrentSelected = { ...currentSelectState }
    newSpecs[key][index].selected = !newSpecs[key][index].selected
    if (newSpecs[key][index].selected) {
      newSpecs[key].forEach((item, index1) => {
        if (item.selected && index1 !== index) {
          newSpecs[key][index1].selected = false
        }
      })
      newCurrentSelected[key] = value
    } else {
      delete newCurrentSelected[key]
    }
    setCurrentSelectState(newCurrentSelected)
    setSpecState(newSpecs)

  }

  // 计算不能够到达的路径
  const calculateUnAvailableSpecItem = () => {
    let unAvailableSpecItemList = []
    let selectedCount = Object.keys(currentSelectState).length
  }

  useEffect(() => {
    initSpec()
  }, [skus])

  return (
    <>
      <BlockTitle title={ '选择SKU' }/>
      {
        skus.length > 0 ? (
          <div className={ 'choose-sku' }>
            {
              Object.keys(specState).map((key, index) => {
                return (
                  <div className={ 'sku-attr' } key={ index }>
                    <p>{ key }</p>
                    {
                      specState[key].map((spec, index) => {
                        return (
                          <button key={ index } className={ classNames('sku-btn', {
                            'selected': spec.selected,
                            'disabled': spec.disabled
                          }) } onClick={ () => selectSpec(key, index, spec.value) }
                                  disabled={ spec.disabled }>{ spec.value }</button>
                        )
                      }) }
                  </div>
                )
              })
            }
          </div>
        ) : ''
      }
    </>
  )
}

export default ChooseSkuPlus
