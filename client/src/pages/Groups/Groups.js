import React, { Component } from 'react';
import { Parallax, Button, Row, Col, Card, CardTitle, Footer } from "react-materialize";
import Group from "../../components/Group";
import API from "../../utils/API";


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
    state = {
        groups: [],
        title: "",
        info: "",
        buyIn: "",
        numberofParticipants: "",
        duration: "",
        totalPot: ""
      };

    componentDidMount() {
    this.loadGroups();
    }
      

    loadGroups = () => {
        API.getGroups()
          .then(res =>
            this.setState({ groups: res.data, title: "", info: "", buyIn: "", numberofParticipants: "", duration: "", totalPot: "" })
          )
          .catch(err => console.log(err));
      };

    renderGroups = () => {
        <Group></Group>
    }

    render() {
        return (
            <div>
                    <div style={{ height: 300, clear: "both", paddingTop: 120, textAlign: "center" }} className="jumbotron">

                        <h1>Groups</h1>

                    </div>
                    <div>
                            {this.state.groups.length ? (
                                <ul>
                                    {this.state.groups.map(group => (
                                        <Group title= {group.title}>
                                                <ul key={group._id}>
                                                    <a href={"/groups/" + group._id}>
                                                        <strong>
                                                        Buy In: ${group.buyIn}, Total Pot: ${group.totalPot}
                                                        </strong>
                                                    </a>
                                                    {/* <DeleteBtn onClick={() => this.deleteGroup(group._id)} /> */}
                                                </ul>
                                        </Group>
                                    ))}
                                </ul>
                            ) : (
                                 <h3>No Results to Display</h3>
                            )}
                            

                    </div>

                <div>
                    {this.props.user ?
                        <Footer style={FooterStyle}>
                            <Row>
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
                            </Row>
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