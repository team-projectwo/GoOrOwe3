import React, { Component } from "react";
import axios from 'axios';
import { Button, Col, Card } from "react-materialize";
import {Link} from "react-router-dom"
import API from "../../utils/API";



var cardStyle = {
    // display: 'flex',
    minHeight: '425px',
    padding: "20px"

}

class MyGroups extends Component {

    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            gyms: [],
            user:{},
            joinedGroups: []
        };

        this.timer = setTimeout(this.googleDataFetch, 5000)

        this.googleDataFetch = this.googleDataFetch.bind(this)
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        API.getUserById(this.props.match.params.userId)
            .then(res => {
                console.log(res.data)
                this.setState({ user: res.data, 
                                joinedGroups: res.data.joinedGroups
                 })
            })
        API.getGroupById()
            .then(res => {
                console.log(res)
            })

        return


    }

    // componentWillUnmount() {

    //     console.log(this.state.latitude, this.state.longitude)


    //     this.googleDataFetch(this.state.latitude, this.state.longitude)
    //     return
    // }



    googleDataFetch = () => {



        axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.latitude},${this.state.longitude}&radius=1500&type=gym&keyword=gym&key=AIzaSyBpN9uvSZcmOLHtbehWtVy3ISrbBOa84Y0`, { headers: { 'Access-Control-Allow-Origin': '*' } })
            .then(res => {
                // const gyms = res.data;
                this.setState({ gyms: res.data.results });
                console.log(res.data);

                console.log(this.state.gyms)

            })

        console.log(this.state.latitude)
        console.log(this.state.longitude)

        // this.groupLoopFunction()
    };

    // groupLoopFunction = () => {
    //     for (i = 0; i < this.state.gyms.length; i++) {

    //     }

    // }

    render() {
        return (
            <div>
                <div style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <p>Latitude: {this.state.latitude}</p>
                    <p>Longitude: {this.state.longitude}</p>
                    {this.state.error ? <p>Error: {this.state.error}</p> : null}
                </div>
                <div>
                    {this.state.gyms !== null ? <p>you are checked in</p> : null}
                </div>

                <div>
                {this.state.joinedGroups.length ? (
                            <ul>
                                {this.state.joinedGroups.map(g => (
                                    <Card key={g._id} title={g.title} _id={g._id}>
                                        <ul key={g._id}>
                                            <a href={"/group/info/" + g._id}>
                                                <strong>
                                                    Buy In: ${g.buyIn}
                                                    <br />
                                                    Total Pot: ${g.totalPot}
                                                    <br />
                                                    Participants: {g.numberOfParticipants}
                                                </strong>
                                            </a>
                                            {/* <DeleteBtn onClick={() => this.deleteGroup(group._id)} /> */}
                                        </ul>
                                    </Card>
                                ))}
                            </ul>
                        ) : (
                                <h3>No Joined Groups!</h3>
                            )}

                </div>
            </div>
        );
    }
}

export default MyGroups;