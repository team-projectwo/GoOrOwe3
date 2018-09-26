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
    state = {
        groups: [
            {
                groupOne: ["Fitbit", "Info about fitbit"]
            },
            {
                groupTwo: ["Vasa", "Info about Vasa"]
            }
        ]

    };

    componentDidMount() {
        // API Call
        // setState group array


    };

    renderGroups() {
        return this.state.groups.map(group => {
            return (
                <Group groups={this.state.groups}></Group>
            )
        })

        // return (
        //     <div>

        //         <Group >
        //         </Group >
        //         <Group>
        //         </Group>
        //         <Group>
        //         </Group>
        //     </div>
        // )
    };


    render() {
        return (
            <div>
                {this.renderGroups()}
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