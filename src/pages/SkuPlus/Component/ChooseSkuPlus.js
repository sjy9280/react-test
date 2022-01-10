import React, { useEffect, useState } from "react";
import BlockTitle from "../../../Components/BlockTitle";
import classNames from "classnames";

function ChooseSkuPlus(props) {
  const { skus, specs } = props
  const [specState, setSpecState] = useState({})
  const [inventoryState, setInventoryState] = useState(0)
  const [buyNumState, setBuyNumState] = useState(0)
  const [matrixState, setMatrixState] = useState([])


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
    let edgeList = getAllPossiblePath()
    let skuList = skus.filter(sku => sku.inventory > 0)
    skuList.forEach(sku => {
      edgeList.forEach(edge => {
        let node1Key = edge[0];
        let node2Key = edge[1];
        let node1Val
        sku.properties.map(item => {
          if (item.name === node1Key) node1Val = item.value
        });
        let node2Val
        sku.properties.forEach(item => {
          if (item.name === node2Key) node2Val = item.value
        });
        let node1Index = specList.indexOf(node1Val);
        let node2Index = specList.indexOf(node2Val);
        matrix[node1Index][node2Index] = 1;
        matrix[node2Index][node1Index] = 1;
      });
    });
    addSameLevelEdge(matrix);
  }

  const addSameLevelEdge = (matrix) => {
    setMatrixState(matrix)
  }

  // 获取所有可能的边
  const getAllPossiblePath = () => {
    let specKeys = specs.map(spec => spec.name)
    let pairs = [];
    for (let i = 0; i < specKeys.length - 1; i++) {
      for (let j = i + 1; j < specKeys.length; j++) {
        pairs.push([specKeys[i], specKeys[j]])
      }
    }
    console.log(pairs)
    return pairs
  }

  const selectSpec = (key, value) => {

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
                          }) } onClick={ selectSpec(key, spec.value) }
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
