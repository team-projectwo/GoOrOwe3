
import React, { Component } from "react";
import { Parallax, Button, Row, Col, Card, CardTitle } from "react-materialize";
import API from "../../utils/API";
import { Container } from "../../components/Grid";
import {Link} from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";

// import "../../../src/pages/Join/join.css";



class GroupInfo extends Component {
    state = {
        group: {},
        participants: [],
     
    };

    componentDidMount() {
        console.log(this.props);
        API.getGroupById(this.props.match.params.groupId)
            .then(res => {
                this.setState({ group: res.data, participants: res.data.participants})
                console.log(this.state.group)
                console.log(this.state.participants)
        })
            .catch(err => console.log(err))
    }

    joinGroup = () => {
        var groupId = this.props.match.params.groupId
        var userId = this.props.user._id
        console.log(groupId);
        console.log(userId);
        var data = {
            groupId,
            userId
        }
        API.saveUserToGroup(data).then((dbResponse) => {
            console.log(this.state.group)
        })
    }

    loadJoinedUsers = () => {
        API.getGroupById()
            .then(res => {          
                this.setState({ groups: res.data, title: "", info: "", buyIn: "", numberOfParticipants: "", duration: "", totalPot: "" })
            }

            )
            .catch(err => console.log(err));
    };

    render() {
        return (
            <Container fluid>
                <Col className='col s12 center-align'>
                    <Row>
                        <Col className='col s12 center-align'>
                            <Jumbotron>
                            <h1>
                                <strong>{this.state.group.title}</strong>
                            </h1>
                            <h5>
                                Buy In: ${this.state.group.buyIn}
                            </h5>
                            </Jumbotron>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='col s12 center-align'>
                            <article>
                            <h1>Description</h1>
                            <p>
                                {this.state.group.info}
                            </p>
                            </article>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='col s12 center-align'>
                            <Link to={'/join/group/' + this.props._id}> <Button waves="light" onClick={this.joinGroup}>Join Group</Button></Link>
                        </Col>
                        <Col className='col s12 center-align'>
                            <Link to="/">← Back to Home</Link>
                        </Col>
                    </Row>

                        <Row>
                            participants here
                            
                            {this.state.participants.length ? (
                                <ul>
                                    {this.state.participants.map(p => (
                                        <Card key={p._id} title= {p.displayName} _id= {p._id}>
                                                <ul key={p._id}>
                                                        <strong>
                                                        <img href={p.photoURL}/>
                                                        </strong>
                                                </ul>
                                        </Card>
                                    ))}
                                </ul>
                            ) : (
                                <h3>Be the first to join!</h3>
                            )}
                                
                                {/* {this.state.participants.map(p => (
                                    <ul>
                                    <li>{p.displayName}</li>
                                    <li>{p.email}</li>
                                    </ul>
                                ))}
                            */}

                        </Row>
                </Col>
        </Container>
                
        )
    }
}

export default GroupInfo;
