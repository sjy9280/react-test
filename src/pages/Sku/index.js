import { Component } from "react";
import ChooseSku from "./Component/ChooseSku";
import CreateSku from "./Component/CreateSku";
import './index.css'

class Sku extends Component {
  render() {
    return (
      <div>
        <CreateSku/>
        <ChooseSku/>
      </div>
    )
  }
}

export default Sku
