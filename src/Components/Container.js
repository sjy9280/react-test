import { Component } from "react";
import SideBar from "./SideBar";
import Pages from "./Pages";

class Container extends Component {
  render() {
    return (
      <div className={'box'}>
        <SideBar/>
        <Pages/>
      </div>
    )
  }
}

export default Container
