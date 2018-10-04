import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
// import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
// import { Col, Row, Container } from "../../components/Grid";
// import { FormBtn } from "../../components/Form";
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
import firebase, { auth, provider } from "../../Firebase";
import { Row, Input, Icon, CardPanel } from "react-materialize";


class Signin extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
    this.login = this.login.bind(this);
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
      if ( !(!user && typeof user === "object") ) {

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
