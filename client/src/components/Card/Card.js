import React, { Component } from 'react';
import { Parallax, Button, Row, Col, CardTitle } from "react-materialize";
import {Link} from "react-router-dom"

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
                        <Link to={'/join/group/' + this.props._id}><Button waves="light">See Group</Button></Link>
                    </div>
                </div>
            </Col>
        )
    }
}

export default Card;