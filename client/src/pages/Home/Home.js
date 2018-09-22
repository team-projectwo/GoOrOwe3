import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
// import API from "../../utils/API";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../../components/Grid";
// import { FormBtn } from "../../components/Form";
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
// import firebase, { auth, provider } from "../../Firebase";
import { Parallax } from "react-materialize";
import Button from "@material-ui/core/Button";

import "typeface-montserrat";

var Buttonstyle = {
  marginLeft: "15px",
  fontFamily: "montserrat"
};

class Home extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: ""
  };

  render() {
    return (
      <div className="app">
        <header>
          <div className="wrapper">
            <div>
              <Parallax imageSrc="https://images.unsplash.com/photo-1506197061617-7f5c0b093236?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=418764a3f148dde8a8debcea492f9156&auto=format&fit=crop&w=900&q=80" />
              <div className="section white">
                <div className="row container">
                  <h2 style={Buttonstyle} className="header">
                    Go Or Owe
                  </h2>
                  <p
                    style={Buttonstyle}
                    className="grey-text text-darken-3 lighten-3"
                  >
                    Keep Yourself and Your Friends Accountable. Hit The Gym or
                    Pay Up.
                  </p>
                  {this.props.user ? (
                    <Button
                      onClick={this.props.logout}
                      color="secondary"
                      className={this.button}
                      variant="outlined"
                      style={Buttonstyle}
                    >
                      Log Out
                    </Button>
                  ) : (
                    <Button
                      onClick={this.props.login}
                      color="secondary"
                      className={this.button}
                      variant="outlined"
                      style={Buttonstyle}
                    >
                      Sign In
                    </Button>
                  )}
                  <Button
                    href="/groups"
                    onClick={this.props.login}
                    color="secondary"
                    className={this.button}
                    variant="outlined"
                    style={Buttonstyle}
                  >
                    Get Started
                  </Button>
                  {this.props.user ? (
                    <div>
                      <div className="user-profile">
                        <img src={this.props.user.photoURL} />
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
