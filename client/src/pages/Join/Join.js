import React, { Component } from "react";
import { Parallax, Button, Row, Col, Card, CardTitle } from "react-materialize";
import CheckoutForm from "../../components/Checkout/CheckoutForm";
import {
  Elements,
  StripeProvider,
  CardElement,
  injectStripe
} from "react-stripe-elements";
import API from "../../utils/API";
import { Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import "../../../src/pages/Join/join.css";

class _CardForm extends React.Component {
  render() {
    return (
      <form
        onSubmit={() =>
          this.props.stripe.createToken().then(payload => console.log(payload))
        }
      >
        <CardElement />
        <button>Pay</button>
      </form>
    );
  }
}
injectStripe(CheckoutForm);

class Join extends Component {
  state = {
    group: {}
  };

  componentDidMount() {
    API.getGroupById(this.props.match.params.id)
      .then(res => this.setState({ group: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div id="firebaseui-auth-container" className="container">
        <div className="row">
          <div className="col s12">
            <Container fluid>
              <Row>
                <Col size="md-12">
                  <Jumbotron>
                    <h1>
                      {this.state.group.title} Buy In: ${this.state.group.buyIn}
                    </h1>
                  </Jumbotron>
                </Col>
              </Row>
              <Row>
                <Col size="md-10 md-offset-1">
                  <article>
                    <h1>Description</h1>
                    <p>{this.state.group.info}</p>
                  </article>
                </Col>
              </Row>
              <Row>
                <Col size="md-2">
                  <a to="/">← Back to Home</a>
                </Col>
              </Row>
            </Container>
            <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
              <div className="Checkout">
                <h1>Available Elements</h1>
                <Elements>
                  <CheckoutForm />
                </Elements>
              </div>
            </StripeProvider>
          </div>
        </div>
      </div>
    );
  }
}

export default Join;
