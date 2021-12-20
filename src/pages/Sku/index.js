import { Component } from "react";
import ChooseSku from "./Component/ChooseSku";
import CreateSku from "./Component/CreateSku";
import ShowSku from "./Component/ShowSku";

class Sku extends Component {
  render() {
    return (
      <div>
        <CreateSku/>
        <ChooseSku/>
        <ShowSku/>
      </div>
    )
  }
}

export default Sku
