import { Route, Switch } from "react-router-dom";
import Container from "../Components/Container";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={ Container }/>
    </Switch>
  )
}

export default Routes
