
import React, { Component } from "react";
import { Parallax, Button, Row, Col, Card, CardTitle } from "react-materialize";
// import {
//   Elements,
//   StripeProvider,
//   CardElement,
//   injectStripe
// } from "react-stripe-elements";
import API from "../../utils/API";
import { Container } from "../../components/Grid";
import {Link} from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
// import "../../../src/pages/Join/join.css";



class GroupInfo extends Component {
    state = {
        group: {}
    };

    componentDidMount() {
        console.log(this.props);
        API.getGroupById(this.props.match.params.groupId)
            .then(res => {
                this.setState({ group: res.data })
                console.log(this.state.group)
        })
            .catch(err => console.log(err))
    }

    joinGroup = () => {
        var groupId = this.props.match.params.groupId
        var userId = this.props.user._id
        console.log(groupId);
        console.log(userId);
        var data = {
            groupId,
            userId
        }
        API.saveUserToGroup(data).then((dbResponse) => {
            console.log(this.state.group)
        })
    }

    render() {
        return (
            <Container fluid>
                <Col className='col s12 center-align'>
                    <Row>
                        <Col className='col s12 center-align'>
                            <Jumbotron>
                            <h1>
                                <strong>{this.state.group.title}</strong>
                            </h1>
                            <h5>
                                Buy In: ${this.state.group.buyIn}
                            </h5>
                            </Jumbotron>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='col s12 center-align'>
                            <article>
                            <h1>Description</h1>
                            <p>
                                {this.state.group.info}
                            </p>
                            </article>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='col s12 center-align'>
                            <Link to={'/join/group/' + this.props._id}> <Button waves="light" onClick={this.joinGroup}>Join Group</Button></Link>
                        </Col>
                        <Col className='col s12 center-align'>
                            <Link to="/">← Back to Home</Link>
                        </Col>
                    </Row>

                        <Row>
                            users here

                        </Row>
                </Col>
            
                    {/* <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                        <div className="example">
                            <h1>React Stripe Elements Example</h1>
                            <Elements>
                                <CheckoutForm />
                            </Elements>
                        </div>
                    </StripeProvider> */}
        </Container>
                
        )
    }
}

export default GroupInfo;
