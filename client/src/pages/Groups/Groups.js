import React, { Component } from 'react';
import { Parallax, Button, Row, Col, CardTitle, Footer } from "react-materialize";
import Card from "../../components/Card/Card";
import API from "../../utils/API";
import { Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { CLIENT_RENEG_LIMIT } from 'tls';




var FooterStyle = {
    // display: 'flex',
    minHeight: '200px',
    // flexDirection: 'column',
    // flex: '1 0 auto',
    position: 'absolute',
    bottom: 0,
    width: '100%'

}

var groupButtonStyle = {
    display: 'flex',
    position: 'fixed',
    margin: '-80 -150 -300 580',
}

{
    // position: "absolute",
    // left: 0,
    // bottom: 0,
    // right: 0
}

class Groups extends Component {
    constructor() {
        super();
        this.state = {
            groups: [],
            title: "",
            info: "",
            buyIn: 0,
            numberOfParticipants: 0,
            duration: "",
            totalPot: 0,
            createGroup: false
        };

        // this.createGroupFunction = this.createGroupFunction.bind(this);

    }

    // createGroupFunction() {
    //     this.setState(state => ({
    //         createGroup: true
    //     }));
    // }

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
                numberOfParticipants: this.state.numberOfParticipants,
                totalPot: parseInt(this.state.buyIn) * parseInt(this.state.numberOfParticipants)
            })
                .then(res => this.loadGroups())
                .catch(err => console.log(err));
            // console.log("===================", "after laod groups call")
        }
    };

    render() {
        return (
            <Container fluid>
                <div className="row">
                    <div className="col s12 center-align">
                        <h1>Groups</h1>
                        <a className="btn-floating btn-small z-depth-5 waves-effect waves-light blue-grey darken-3" style={groupButtonStyle}>
                            <i className="material-icons">add</i></a>
                    </div>
                </div>
                <div className="row">
                    <div className='col s12 center-align'>

                        {this.state.groups.length ? (
                            <ul>
                                {this.state.groups.map(group => (

                                    <Card title={group.title} _id={group._id}>
                                        <ul key={group._id}>
                                            <a href={"/groups/" + group._id}>
                                                <strong>
                                                    Buy In: ${group.buyIn}
                                                    <br />
                                                    Total Pot: ${group.totalPot}
                                                    <br />
                                                    Participants: {group.numberOfParticipants}
                                                </strong>
                                            </a>
                                            {/* <DeleteBtn onClick={() => this.deleteGroup(group._id)} /> */}
                                        </ul>
                                    </Card>

                                ))}
                            </ul>
                        ) : (
                                <h3>No Results to Display</h3>
                            )}
                    </div>
                </div>

                <div className='col s6'>
                    {this.state.createGroupFunction ? (
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
                                Submit Groups
                            </FormBtn>
                        </form>

                    ) : (
                            ""
                        )}
                </div>

                <div>
                    {this.props.user ?
                        <Footer className='center-align' style={FooterStyle}>
                            <div className="row">
                                <div className="col">
                                    <div>
                                        <Button waves='light' node='a' href='/mygroups'>My Groups</Button>
                                    </div>
                                </div>
                                <div className="col">
                                    <div>
                                        <Button waves='light' node='a' href='/account'>Account</Button>
                                    </div>
                                </div>
                            </div>
                        </Footer>

                        :

                        <Footer style={FooterStyle}>
                            <div className="row">
                                <div className="col">
                                    <div>
                                        <Button waves='light' node='a' href='/'>Home</Button>
                                    </div>
                                </div>
                                <div className="col">
                                    <div>
                                        <Button waves='light' node='a' href='/signin'>Sign In</Button>
                                    </div>
                                </div>
                            </div>
                        </Footer>
                    }
                </div>
            </Container >
        )
    }
}

export default Groups;