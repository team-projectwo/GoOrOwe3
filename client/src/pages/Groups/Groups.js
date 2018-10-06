import React, { Component } from "react";
import {
  Parallax,
  Row,
  Col,
  CardTitle,
  Footer,
  Container
} from "react-materialize";
import Card from "../../components/Card/Card";
import API from "../../utils/API";
// import { Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { CLIENT_RENEG_LIMIT } from "tls";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Icon from "@material-ui/core/Icon";

var CardStyles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

var FooterStyle = {
  // display: 'flex',

  overflow: "hidden",
  // flexDirection: 'column',
  // flex: '1 0 auto',
  position: "bottom",

  width: "100%"
};

var groupButtonStyle = {
  display: "flex",
  position: "fixed",
  margin: "-80 -150 -300 580"
};

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
        this.setState({
          groups: res.data,
          title: "",
          info: "",
          buyIn: "",
          numberOfParticipants: this.state.numberOfParticipants + 1,
          duration: "",
          totalPot: ""
        });
      })
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
        totalPot:
          parseInt(this.state.buyIn) * parseInt(this.state.numberOfParticipants)
      })
        .then(res => this.loadGroups())
        .catch(err => console.log(err));
      // console.log("===================", "after laod groups call")
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col className="col s12 center-align">
            <Jumbotron>
              <h1>Groups to Join</h1>
            </Jumbotron>
            {this.state.groups.length ? (
              <ul>
                {this.state.groups.map(group => (
                  <Card
                    key={group._id}
                    title={group.title}
                    _id={group._id}
                    className={this.card}
                    href={"/group/info/" + group._id}
                  >
                    <CardContent>
                      <Typography className={this.title} color="textSecondary">
                        Buy In: ${group.buyIn}
                      </Typography>
                      <Typography variant="headline" component="h2">
                        Total Pot: ${group.totalPot}
                      </Typography>
                      <Typography className={this.pos} color="textSecondary">
                        Participants: {group.numberOfParticipants}
                      </Typography>
                      <Typography component="p">
                        <br />
                      </Typography>
                    </CardContent>
                    <CardActions />
                  </Card>
                ))}
              </ul>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Col className="col s6 center-align">
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
                disabled={
                  !(this.state.buyIn && this.state.title && this.state.duration)
                }
                onClick={this.handleFormSubmit}
              >
                Submit Group
              </FormBtn>
            </form>
          </Col>
        </Row>
        <BottomNavigation
          value={this.value}
          onChange={this.handleChange}
          showLabels
          className={this.root}
        >
          <BottomNavigationAction
            href={"/mygroups"}
            label="Recents"
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            href={"/account"}
            label="Account"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            href={"/mygroups"}
            label="My Groups"
            icon={<LocationOnIcon />}
          />
        </BottomNavigation>
      </Container>
    );
  }
}

export default Groups;
