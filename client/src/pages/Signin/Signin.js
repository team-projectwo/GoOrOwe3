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
// import { Button, Icon } from 'react-materialize'

class Signin extends Component {
    constructor() {
        super();
        this.state = {
            user: null
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    };

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
    }

    logout() {
        auth.signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }

    login() {
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });
            });
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col s={10}>
                    </Col>
                    <Col s={2}>
                        {/* <h1>Fun Food Friends</h1> */}
                        {this.state.user ?
                            <button onClick={this.logout}>Logout</button>
                            :
                            <button onClick={this.login}>Log In</button>
                        }
                    </Col>
                </Row>
                {this.state.user ?
                    <div>
                        <div className='user-profile'>
                            <img src={this.state.user.photoURL} />
                        </div>
                    </div>
                    :
                    <div className='wrapper'>
                        <p>You must be logged in to see anything.</p>
                    </div>
                }
            </Container>
        );
    }
}


export default Signin;