import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import store from "./redux/store";
import { loadUser } from "./redux/actions/authActions";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route path="/login" exact component={Login}></Route>
          <Route path="/signup" component={Register}></Route>
          <PrivateRoute exact path="/" component={Dashboard} />
        </div>
      </Switch>
    </Router>
  );
}

export default App;
