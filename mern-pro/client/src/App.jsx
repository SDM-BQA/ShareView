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
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        {/* using switch so if one path match, then only particular component will execute not the remaining part code */}
        <Switch>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Route path="/:userId/places" exact>
            <UserPlaces />
          </Route>
          <Route path="/places/:placeId" exact>
            <UpdatePlace />
          </Route>
          {/* If any path is not matching */}
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
