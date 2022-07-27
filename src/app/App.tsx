import CalendarScreen from "../components/CalendarScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { getToday } from "../helpers/dateFunctions";
import React, { useEffect, useState } from "react";
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

class App2 extends React.Component<{}, { user: IUser | null }> {
  setUser: (user: IUser) => void;
  onSignOut: () => void;

  constructor(props: {}) {
    super(props);
    this.state = { user: null };

    this.onSignOut = () => {
      this.setState({ user: null });
    };

    this.setUser = (user: IUser) => {
      this.setState({ user });
    };
  }

  render() {
    const month = getToday().substring(0, 7);

    const { user } = this.state;

    if (user) {
      return (
        <authContext.Provider value={{ user, onSingOut: this.onSignOut }}>
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
      return <LoginScreen onSignIn={this.setUser} />;
    }
  }

  componetDidMount() {
    getUserEndpoint().then(this.setUser, this.onSignOut);
  }
}

export default App;
