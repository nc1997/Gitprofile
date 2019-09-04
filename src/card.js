import Button from "@material-ui/core/Button";
import { default as Muicard } from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchRepos } from "./actions";
import "./card.scss";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  toggle = () => {
    this.setState(prevState => ({
      open: !prevState.open
    }));
    this.props.fetchRepos(this.props.data.login);
  };

  renderRepo = () => {
    return this.props.data.repos.map((value, index) => (
      <div>
        <p>
          Repo name : {value.name}&nbsp;&nbsp;&nbsp;&nbsp;Language :{" "}
          {value.language}{" "}
        </p>
        <p>
          Forks : {value.forks_count}&nbsp;&nbsp;&nbsp;&nbsp;watchers :{" "}
          {value.watchers}
        </p>
        <Divider />
      </div>
    ));
  };
  renderCardContent = () => {
    const value = this.props.data;
    return (
      <CardContent>
        <img
          style={{ height: 100, width: 100, borderRadius: "50%" }}
          src={value.avatar_url}
        />
        <div className="new">
          <p>Username : {value.login}</p>
          <p>Score : {value.score}</p>
          <br></br>
          {value.repos !== undefined && this.state.open && this.renderRepo()}
        </div>
      </CardContent>
    );
  };

  renderCardAction = () => (
    <CardActions className="detbutton">
      <Button onClick={this.toggle} color="primary" size="medium">
        Details
      </Button>
    </CardActions>
  );

  render() {
    return (
      <Muicard className="card">
        {this.renderCardContent()}
        {this.renderCardAction()}
      </Muicard>
    );
  }
}

export default connect(
  null,
  { fetchRepos }
)(Card);
