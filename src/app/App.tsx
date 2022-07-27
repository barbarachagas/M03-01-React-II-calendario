import CalendarScreen from "../components/CalendarScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { getToday } from "../helpers/dateFunctions";
import { useEffect, useState } from "react";
import { getUserEndpoint, IUser } from "./backend";
import LoginScreen from "../components/LoginScreen";
import { authContext } from "../helpers/authContext";

function App() {
  const month = getToday().substring(0, 7);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndpoint().then(setUser, onSingOut);
  }, []);

  function onSingOut() {
    setUser(null);
  }

  if (user) {
    return (
      <authContext.Provider value={{ user, onSingOut }}>
        <Router>
          <Switch>
            <Route path="/calendar/:month">
              <CalendarScreen />
            </Route>
            <Redirect to={{ pathname: "/calendar/" + month }} />
          </Switch>
        </Router>
      </authContext.Provider>
    );
  } else {
    return <LoginScreen onSignIn={setUser} />;
  }
}

export default App;
