import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  Elements,
  StripeProvider,
  CardElement,
  injectStripe,
  CardNumberElement
} from "react-stripe-elements";
import "../../../src/pages/Join/join.css";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import classNames from "classnames";
import { Parallax, Button, Row, Col, Card, CardTitle } from "react-materialize";
import { Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import CheckoutForm from "../../components/Checkout/CheckoutForm";

function PaymentForm() {
  return (
    <div id="firebaseui-auth-container" className="container">
      <div className="row">
        <div className="col s12">
          <Container fluid>
            <Row>
              <Col size="md-12">
                <Jumbotron />
              </Col>
            </Row>
            <Row>
              <Col size="md-10 md-offset-1" />
            </Row>
            <Row />
          </Container>
          <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
            <div className="Checkout">
              <h1>Enter Your Card Info</h1>

              <Elements>
                <CheckoutForm />
              </Elements>
            </div>
          </StripeProvider>

          <br />
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
