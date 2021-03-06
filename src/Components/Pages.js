import { Component } from "react";
import { Route } from "react-router-dom";
import CountDown from "../pages/CountDown";
import TestPage from "../pages/TestPage";
import Sku from "../pages/Sku";
import SkuPlus from "../pages/SkuPlus";

class Pages extends Component {
  render() {
    return (
      <div className={ 'container' }>
        <Route path='/' component={ CountDown } exact/>
        <Route path='/countdown' component={ CountDown }/>
        <Route path='/sku' component={ Sku }/>
        <Route path='/sku-plus' component={ SkuPlus }/>
        <Route path='/test' component={ TestPage }/>
      </div>
    )
  }
}

export default Pages
