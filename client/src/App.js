import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Groups from "./pages/Groups";
// import Detail from "./pages/Detail";
// import Signin from "./pages/Signin";
// import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";
import firebase, { auth, provider } from "../src/Firebase";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  }

  login() {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <Home
                    user={this.state.user}
                    login={this.login}
                    logout={this.logout}
                  />
                );
              }}
            />
            <Route exact path="/groups" component={Groups} />
            {/* <Route exact path="/books/:id" component={Detail} /> */}
            {/* <Route exact path="/signin" component={Signin} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
