import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
// import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { FormBtn } from "../../components/Form";
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
import firebase, { auth, provider } from "../../Firebase";
import { row, Input, Icon, CardPanel } from "react-materialize";

class Signin extends Component {
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
      <Row>
        <Input s={6} label="First Name" validate>
          <Icon>account_circle</Icon>
        </Input>
        <Input s={6} label="Last Name" validate>
          <Icon>account_circle</Icon>
        </Input>
        <Input s={6} label="Password" validate>
          <Icon>lock</Icon>
        </Input>
        <Input s={6} label="Email" validate>
          <Icon>contact_mail</Icon>
        </Input>
      </Row>
    );
  }
}

export default Signin;
