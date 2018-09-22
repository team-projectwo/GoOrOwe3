import React, { Component } from 'react';
import { Parallax, Button, Row, Col, Card, CardTitle } from "react-materialize";

class Group extends Component {
    // state = {
    //     group: null
    // };

    render() {
        return (
            <Col m={6} s={12}>
                <Card className='blue-grey darken-1' textClassName='white-text' title='Group Title [FromDB]' actions={[<a href='#'><Button waves>Join</Button></a>]}>
                    <div>Group Info [FromDB]</div>
                </Card>
            </Col>


        )
    }
}

export default Group;