// import React, { Component } from 'react';
// import { Parallax, Button, Row, Col, CardTitle, Footer } from "react-materialize";
import Card from "../../components/Card/Card";
import API from "../../utils/API";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import firebase, { auth, provider } from "../../Firebase";
import Button from "@material-ui/core/Button";



import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Grid } from "../../components/Grid";
import user from "../Signin"
import Paper from '@material-ui/core/Paper';
import { Row, Input, Icon, CardPanel } from "react-materialize";

var Buttonstyle = {
  marginLeft: "15px",
  fontFamily: "montserrat"
};






class Account extends Component {
  constructor() {
    super();
    this.state = {
      user: ""
    };
    this.logout = this.logout.bind(this);
  }

  // componentDidMount() {
  //   auth.onAuthStateChanged(user => {
  //     if (user) {
  //       this.setState({ user });
  //     }
  //   });
  // }

  // logout() {
  //   auth.signOut().then(() => {
  //     this.setState({
  //       user: null
  //     });
  //   });
  // }

  // login() {
  //   auth.signInWithPopup(provider).then(result => {
  //     const user = result.user;
  //     this.setState({
  //       user
  //     });
  //   });
  // }

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

      // how to properly check for null values
      if (!(!user && typeof user === "object")) {

        this.setState({
          user: user
        });
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






  render() {
    console.log(this.state.user)
    console.log(this.state.user.photoURL)
    const { classes } = this.props;
    const { value } = this.state;

    return (

      <div className="container">
        <Button

          onClick={this.props.logout}
          color="secondary"
          node='a' href='/'
          className={this.button}
          variant="outlined"
          style={Buttonstyle}
        >Log Out</Button>

        {this.props.user ? (
          <div>
            <div className="user-profile">
              <img src={this.props.user.photoURL} />
            </div>
          </div>
        ) : (
            <div className="wrapper" />
          )}

        <ul className="collapsible">
          <li>
            <div className="collapsible-header"><i className="material-icons">group</i>What Groups am I in?</div>
            <div className="collapsible-body"><span> yellow</span></div>
          </li>
          <li>
            <div className="collapsible-header"><i className="material-icons">account_box</i>Person information</div>
            <div className="collapsible-body"><span>Email: {this.state.user.email}</span></div>
            <div className="collapsible-body"><span>Display Name: {this.state.user.displayName}</span></div>
          </li>
        </ul>
      </div>

    )
  }
};


export default Account;




// export default Account;