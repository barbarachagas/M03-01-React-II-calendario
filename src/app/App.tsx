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

function App() {
  const month = getToday().substring(0, 7);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    getUserEndpoint().then(setUser, () => setUser(null));
  }, []);

  function singOut() {
    setUser(null);
  }

  if (user) {
    return (
      <Router>
        <Switch>
          <Route path="/calendar/:month">
            <CalendarScreen user={user} onSingOut={singOut} />
          </Route>
          <Redirect to={{ pathname: "/calendar/" + month }} />
        </Switch>
      </Router>
    );
  } else {
    return <LoginScreen onSignIn={setUser} />;
  }
}

export default App;
