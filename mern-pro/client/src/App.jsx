import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import MainNavigation from "./shared/Navigation/MainNavigation";

function App() {
  return (
    <Router>
      <MainNavigation/>
      <main>
      {/* using switch so if one path match, then only particular component will execute not the remaining part code */}
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        {/* If any path is not matching */}
        <Redirect to="/" />
      </Switch>
      </main>
    </Router>
  );
}

export default App;
