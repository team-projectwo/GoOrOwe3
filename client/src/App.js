import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Groups from "./pages/Groups";
import Join from "./pages/Join";
import API from "./utils/API";
// import Detail from "./pages/Detail";
// import Signin from "./pages/Signin";
// import NoMatch from "./pages/NoMatch";
// import Nav from "./components/Nav";
import firebase, { auth, provider } from "../src/Firebase";
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './components/Checkout/CheckoutForm';
import * as firebaseui from 'firebaseui'



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
      console.log(user);
      if (!(!user && typeof user === "object")) {
        var userEmail = {
          email: user.email
        }
        API.getUserByEmail(userEmail).then((res) => {
          console.log(res);
          this.setState({
            user: res.data[0]
          });
        })

      }

      //how to properly check for null values
      // if ( !(!user && typeof user === "object") ) {

      //   this.setState({
      //     user: user
      //   });
      // }
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
      ///result.user;
      const user = {}
      user.displayName = result.user.displayName
      user.email = result.user.email
      user.uid = result.user.uid
      user.emailVerified = result.user.emailVerified
      user.photoURL = result.user.photoURL
      console.log(user);
      // /api/user/signin
      API.createUser(user).then((res) => {
        console.log(res);
        this.setState({
          user: res.data
        });
      }).catch((err) => {
        if (err) {
          console.log("If error 422 is above this console.log() dont trip that user probably exists in your db already and unique clause stopped it from duplication --Ryan B");
        }
      })

    });
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" render={
                () => {
                  return <Home user={this.state.user} login={this.login} logout={this.logout} />
                }
              }
              ></Route>
              <Route exact path="/groups" render={
                () => {
                  return <Groups user={this.state.user} login={this.login} logout={this.logout} />
                }
              } ></Route>
              <Route exact path="/join" component={Join} />
            </Switch>
          </div>
        </Router>

      </div>

    );
  }
}

export default App;
