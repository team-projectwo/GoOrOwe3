import React, { Component } from 'react';
import { Parallax, Button, Row, Col, Card, CardTitle } from "react-materialize";

class Group extends Component {
    // state = {
    //     group: null
    // };

    render() {
        return (
            <Col m={6} s={12}>
                <Card className='blue-grey darken-1' textClassName='white-text' title={this.props.title} actions={[<a href='#'><Button waves>Join</Button></a>]}>
                    <div>
                        {this.props.children}
                    </div>
                </Card>
            </Col>
        )
    }
}

export default Group;