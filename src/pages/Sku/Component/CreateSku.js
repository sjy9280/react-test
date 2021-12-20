import React from "react";
import BlockTitle from "../../../Components/BlockTitle";
import { PlusOutlined } from "@ant-design/icons";
import { Input } from 'antd'
import { bindActionCreators } from "redux";
import * as SkuActions from '../../../Store/Actions/Sku.Action'

import '../../../static/style/sku.css'
import { connect } from "react-redux";


function CreateSku(props) {
  return (
    <div>
      <BlockTitle title={ '创建SKU' }/>
      <div className={ 'sku-specification' }>
        颜色：<PlusOutlined onClick={ props.addColor }/>
        <div>
          { props.colorList.map((item, index) => {
            return <Input value={ item } key={ index } />
          }) }
        </div>
      </div>
      <div className={ 'sku-specification' }>
        尺寸：<PlusOutlined onClick={ props.addSize }/>
        <div>
          { props.sizeList.map((item, index) => {
            return <Input value={ item } key={ index } className={ 'sku-input' }/>
          }) }
        </div>
      </div>
      <div className={ 'sku-specification' }>
        存储：<PlusOutlined onClick={ props.addStorage }/>
        <div>
          { props.storageList.map((item, index) => {
            return <Input value={ item } key={ index }/>
          }) }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  colorList: state.colorList,
  sizeList: state.sizeList,
  storageList: state.storageList,
  skuList: state.skuList
})

const mapDispatchProps = dispatch => ({
  ...bindActionCreators(SkuActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchProps)(CreateSku)
