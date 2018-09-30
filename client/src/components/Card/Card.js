import React, { Component } from 'react';
import { Parallax, Button, Row, Col, CardTitle } from "react-materialize";

class Card extends Component {
    // state = {
    //     group: null
    // };
    
    render() {
        console.log(this.props)
        return (
            <Col m={6} s={12}>
                <div className='card content blue-grey darken-3 white-text'>  <span calssName='card-title'><h4>{this.props.title}</h4></span>

                    <h6>{this.props.children}</h6>

                    <div className="card-action">
                        <a href={'/groups/' + this.props._id}><Button waves>See Group</Button></a>
                    </div>
                </div>
            </Col>
        )
    }
}

export default Card;