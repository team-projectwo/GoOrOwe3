import React, { Component } from "react";
import { Parallax, Row, Col, CardTitle } from "react-materialize";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

var cardStyle = {
  // display: 'flex',
  minHeight: "425px",
  padding: "20px"
};

class Card extends Component {
  // state = {
  //     group: null
  // };


  render() {
    console.log(this.props);
    return (
      <Col m={12}>
        <div
          style={cardStyle}
          className="card content light-grey light-3 grey-text z-depth-5"
        >
          {" "}
          <span className="card-title">
            <h1>{this.props.title}</h1>
          </span>
          <h3>{this.props.children}</h3>
          <div className="card-action">
            <Link to={"/group/info/" + this.props._id}>
              {" "}
              <Button
                variant="outlined"
                color="secondary"
                className={this.button}
              >
                See Group
              </Button>
            </Link>
          </div>
        </div>
      </Col>
    );
  }

}

export default Card;
