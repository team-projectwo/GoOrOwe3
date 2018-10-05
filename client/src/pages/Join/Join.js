import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

// =======================================================-

// import React, { Component } from "react";
// import { Parallax, Row, Col, Card, CardTitle } from "react-materialize";
// import {
//   Elements,
//   StripeProvider,
//   CardElement,
//   injectStripe
// } from "react-stripe-elements";
// import API from "../../utils/API";
// import { Container } from "../../components/Grid";
// import {Link} from "react-router-dom";
// import Jumbotron from "../../components/Jumbotron";
// import "../../../src/pages/Join/join.css";

// =========================================================

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});

const steps = ["Billing address", "Review your order", "Payment Details"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review />;

    case 2:
      return <PaymentForm />;
      <Review />;
    default:
      throw new Error("Unknown step");
  }
}

class Join extends React.Component {
  state = {
    activeStep: 0
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Go Or Owe
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="display1" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="headline" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subheading">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Join.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Join);
// ============================================================

// class Join extends React.Component {
//     state = {
//         group: {}
//     };

//     componentDidMount() {
//         console.log(this.props);
//         API.getGroupById(this.props.match.params.groupId)
//             .then(res => {
//                 this.setState({ group: res.data })
//                 console.log(this.state.group)
//         })
//             .catch(err => console.log(err))
//     }

//     joinGroup = () => {
//         var groupId = this.props.match.params.groupId
//         var userId = this.props.user._id
//         console.log(groupId);
//         console.log(userId);
//         var data = {
//             groupId,
//             userId
//         }
//         API.saveUserToGroup(data).then((dbResponse) => {
//             console.log(this.state.group)
//         })
//     }

//     render() {
//         return (
//             <div id="firebaseui-auth-container" className="container">
//                 <div className="row">

//                     <div className="col s12">
//                     <div className="row">
//                         users here

//                         <Button waves="light" onClick={this.joinGroup}>Join Group</Button>
//                     </div>
//                     <Container fluid>
//                         <Row>
//                         <Col size="md-12">
//                             <Jumbotron>
//                             <h1>
//                                 {this.state.group.title} Buy In: ${this.state.group.buyIn}
//                             </h1>
//                             </Jumbotron>
//                         </Col>
//                         </Row>
//                         <Row>
//                         <Col size="md-10 md-offset-1">
//                             <article>
//                             <h1>Description</h1>
//                             <p>
//                                 {this.state.group.info}
//                             </p>
//                             </article>
//                         </Col>
//                         </Row>
//                         <Row>
//                         <Col size="md-2">
//                             <Link to="/">← Back to Home</Link>
//                         </Col>
//                         </Row>
//                     </Container>
//                         <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
//                             <div className="example">
//                                 <h1>React Stripe Elements Example</h1>
//                                 <Elements>
//                                     <CheckoutForm />
//                                 </Elements>
//                             </div>
//                         </StripeProvider></div>
//                 </div>

//             </div>
//         )
//     }
// }

// export default Join;
