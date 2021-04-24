import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
import { Container } from "reactstrap";

import store from "./redux/store";
import { loadUser } from "./redux/actions/authActions";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div className="App">
      <AppNavbar />
      <Container>
        <ItemModal />
      </Container>
    </div>
  );
}

export default App;
