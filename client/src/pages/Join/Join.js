import React, { Component } from 'react';
import { Parallax, Button, Row, Col, Card, CardTitle } from "react-materialize";
import CheckoutForm from "../../components/Checkout/CheckoutForm";
import { Elements, StripeProvider } from 'react-stripe-elements';

class Join extends Component {
    // state = {
    //     group: null
    // };

    render() {
        return (
            <div className="container">
                <div className="row">

                    <div className="col s12">
                        <h2>Group Info</h2>
                        <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                            <div className="example">
                                <h1>React Stripe Elements Example</h1>
                                <Elements>
                                    <CheckoutForm />
                                </Elements>
                            </div>
                        </StripeProvider></div>
                </div>

            </div>
        )
    }
}

export default Join;