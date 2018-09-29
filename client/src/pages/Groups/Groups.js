import React, { Component } from 'react';
import { Parallax, Button, Row, Col, Card, CardTitle, Footer } from "react-materialize";
import Group from "../../components/Group";
import API from "../../utils/API";
import { Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { CLIENT_RENEG_LIMIT } from 'tls';




var FooterStyle = {
    display: 'flex',
    minHeight: '100px',
    flexDirection: 'column',
    flex: '1 0 auto'

}
  
{
    // position: "absolute",
    // left: 0,
    // bottom: 0,
    // right: 0
}

class Groups extends Component {
    // state = {
    //     group: null
    // };
    state = {
        groups: [],
        title: "",
        info: "",
        buyIn: 0,
        numberOfParticipants: 0,
        duration: "",
        totalPot: 0
      };

    componentDidMount() {
    this.loadGroups();
    }
      

    loadGroups = () => {
        API.getGroups()
          .then(res => {  
            // console.log(typeof(this.state.title))
            // console.log(typeof(this.state.buyIn))
            // console.log(typeof(this.state.duration))
            // console.log(typeof(this.state.info))
            // console.log(typeof(this.state.numberOfParticipants))
            // console.log(typeof(this.state.totalPot))          
            this.setState({ groups: res.data, title: "", info: "", buyIn: "", numberOfParticipants: this.state.numberOfParticipants + 1, duration: "", totalPot: "" })
          }
   
          )
          .catch(err => console.log(err));
      };

      handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };

      handleFormSubmit = event => {
        event.preventDefault();
        // console.log(this.state.numberOfParticipants)
        if (this.state.buyIn && this.state.title && this.state.duration) {
          API.saveGroup({
            title: this.state.title,
            buyIn: parseInt(this.state.buyIn),
            duration: this.state.duration,
            info: this.state.info,
            numberOfParticipants: this.state.numberOfParticipants + 1,
            totalPot: parseInt(this.state.buyIn) * parseInt(this.state.numberOfParticipants)
          })
            .then(res => this.loadGroups())
            .catch(err => console.log(err));
            // console.log("===================", "after laod groups call")
        }
      };

    renderGroups = () => {
        <Group></Group>
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col className='col s6 center-align'>
                        <Jumbotron>
                            <h1>Groups to Join</h1>
                        </Jumbotron>
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
                    </Col>
                    <Col className='col s6 center-align'>
                        <Jumbotron>
                            <h1>Create a Group</h1>
                        </Jumbotron>

                        <form>
                            <Input
                                value={this.state.title}
                                onChange={this.handleInputChange}
                                name="title"
                                placeholder="Title (required)"
                            />
                            <Input
                                value={this.state.buyIn}
                                onChange={this.handleInputChange}
                                name="buyIn"
                                placeholder="Buy In (required)"
                            />
                            <Input
                                value={this.state.duration}
                                onChange={this.handleInputChange}
                                name="duration"
                                placeholder="Duration (required)"
                            />
                            <TextArea
                                value={this.state.info}
                                onChange={this.handleInputChange}
                                name="info"
                                placeholder="Description (Optional)"
                            />
                            <FormBtn
                                disabled={!(this.state.buyIn && this.state.title && this.state.duration)}
                                onClick={this.handleFormSubmit}
                            >
                                Submit Group
                            </FormBtn>
                        </form>       
                    </Col>
                </Row>
                <div>
                    {this.props.user ?
                        <Footer className='center-align' style={FooterStyle}>
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

                        <Footer style={FooterStyle}>
                            <Row>
                                <Col>
                                    <div>
                                        <Button waves='light' node='a' href='/'>Home</Button>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <Button waves='light' node='a' href='/signin'>Sign In</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Footer>
                    }
                </div>
            </Container>
        )
    }
}

export default Groups;