import { Component } from "react";
import SideBar from "./SideBar";
import Pages from "./Pages";

class Container extends Component {
  render() {
    return (
      <div>
        <SideBar/>
        <Pages/>
      </div>
    )
  }
}

export default Container
