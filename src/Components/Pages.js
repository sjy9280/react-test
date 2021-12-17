import { Component } from "react";
import { Route } from "react-router-dom";
import CountDown from "../pages/CountDown";
import TestPage from "../pages/TestPage";

class Pages extends Component {
  render() {
    return (
      <div className={ 'container' }>
        <Route path='/countdown' component={ CountDown }/>
        <Route path='/test' component={ TestPage }/>
      </div>
    )
  }
}

export default Pages
