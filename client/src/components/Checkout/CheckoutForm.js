import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Redirect } from "react-router-dom";

const CardElementStyle = {
  position: "absolute",
  top: 350,
  width: 350
};

const h1Style = {
  position: "absolute",
  top: 350,
  width: 350
};

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    let response = await fetch("/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });

    if (response.ok) this.setState({ complete: true });
  }

  render() {
    if (this.state.complete)
      return <h1 style={h1Style}>Purchase Complete!</h1> ? (
        <Redirect to="/account" />
      ) : null;

    return (
      <div className="checkout" style={CardElementStyle}>
        <p>Please enter your card info below:</p>
        <CardElement />

        <button onClick={this.submit}>Purchase</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);