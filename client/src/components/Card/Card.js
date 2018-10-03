import React, { Component } from 'react';
import { Parallax, Button, Row, Col, CardTitle } from "react-materialize";
import {Link} from "react-router-dom"

class Card extends Component {
    // state = {
    //     group: null
    // };
    
    render() {
        console.log(this.props)
        return (
            <Col m={6} s={12}>
                <div className='card content blue-grey darken-3 white-text'>  <span className='card-title'><h4>{this.props.title}</h4></span>

                    <h6>{this.props.children}</h6>

                    <div className="card-action">
                        <Link to={'/join/group/' + this.props._id}><Button waves="light">See Group</Button></Link>
                    </div>
                </div>
            </Col>
        )
    }
}

export default Card;