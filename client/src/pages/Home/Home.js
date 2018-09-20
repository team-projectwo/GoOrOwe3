import React, { Component } from "react";
// import API from "../../utils/API";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../../components/Grid";
// import { FormBtn } from "../../components/Form";
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
import firebase, { auth, provider } from "../../Firebase";
import { Parallax, Button } from "react-materialize";

class Home extends Component {
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
      <div className="app">
        <header>
          <div className="wrapper">
            <div>
              <Parallax imageSrc="https://images.unsplash.com/photo-1506197061617-7f5c0b093236?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=418764a3f148dde8a8debcea492f9156&auto=format&fit=crop&w=900&q=80" />
              <div className="section white">
                <div className="row container">
                  <h2 className="header">Go Or Owe</h2>
                  <p className="grey-text text-darken-3 lighten-3">
                    Keep Yourself and Your Friends Accountable. Hit The Gym or
                    Pay Up.
                  </p>
                  {this.state.user ? (
                    <Button waves onClick={this.logout}>
                      Log Out
                    </Button>
                  ) : (
                      <Button waves onClick={this.login}>
                        Sign In
                    </Button>
                    )}

                  <Button waves="light" node="a" href="/signin">
                    {" "}
                    Get Started{" "}
                  </Button>
                  {this.state.user ? (
                    <div>
                      <div className="user-profile">
                        <img src={this.state.user.photoURL} />
                      </div>
                    </div>
                  ) : (
                      <div className="wrapper" />
                    )}
                </div>
              </div>
              <Parallax imageSrc="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=de05b46a8ac91fcff2b134811e62d79f&auto=format&fit=crop&w=1000&q=80" />
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Home;
