import React, { Component } from 'react';
import { Parallax, Button, Row, Col, Card, CardTitle, Footer } from "react-materialize";
import Group from "../../components/Group";

var FooterStyle = {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0
}

class Groups extends Component {
    // state = {
    //     group: null
    // };

    render() {
        return (
            <div>
                <div>
                    <Group>
                    </Group>
                    <Group>
                    </Group>
                    <Group>
                    </Group>
                </div>
                <div>
                    {this.props.user ?
                        <Footer style={FooterStyle}>
                            <row>
                                <Col>
                                    <div>
                                        <Button waves='light' node='a' href='/mygroups'>My Groups</Button>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <Button waves='light' node='a' href='/account'>Account</Button>
                                    </div>
                                </Col>
                            </row>
                        </Footer>

                        :
                        ""
                    }
                </div>
            </div>
        )
    }
}

export default Groups;