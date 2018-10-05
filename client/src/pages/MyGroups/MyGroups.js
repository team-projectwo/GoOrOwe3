import React, { Component } from "react";
import axios from 'axios';


class MyGroups extends Component {

    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
        };
        this.googleDataFetch = this.googleDataFetch.bind(this)
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                    gyms: []
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );

        this.googleDataFetch()

    }



    googleDataFetch() {

        axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.479,-111.919&radius=1500&type=gym&keyword=gym&key=AIzaSyBpN9uvSZcmOLHtbehWtVy3ISrbBOa84Y0`, { headers: { 'Access-Control-Allow-Origin': '*' } })
            .then(res => {
                // const gyms = res.data;
                this.setState({ gyms: res.data });
                console.log(this.state.gyms);
            })

    }

    render() {
        return (
            <div>
                <div style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <p>Latitude: {this.state.latitude}</p>
                    <p>Longitude: {this.state.longitude}</p>
                    {this.state.error ? <p>Error: {this.state.error}</p> : null}
                </div>
                <div>

                    {/* {this.state.gyms.map(gyms => <li>{gyms.results.name}</li>)} */}
                    {/* <div>{this.state.res.data}</div> */}

                </div>
            </div>
        );
    }
}

export default MyGroups;