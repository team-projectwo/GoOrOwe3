import React, { Component } from 'react';
import { Parallax, Button, Row, Col, CardTitle } from "react-materialize";

var cardStyle = {
    // display: 'flex',
    minHeight: '425px',
    padding: "20px"

}

class Card extends Component {
    // state = {
    //     group: null
    // };

    render() {
        console.log(this.props)
        return (
            <Col m={12}>
                <div style={cardStyle} className='card content blue-grey darken-3 white-text z-depth-5'>  <span className='card-title'><h1>{this.props.title}</h1></span>

                    <h3>{this.props.children}</h3>

                    <div className="card-action">
                        <a href={'/groups/' + this.props._id}><Button className="btn-large" waves>See Group</Button></a>
                    </div>
                </div>
            </Col>
        )
    }
}

export default Card;