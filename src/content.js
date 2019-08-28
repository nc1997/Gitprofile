import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "./card";

class Content extends Component {
  renderCard = (data, index) => <Card key={index} data={data} />;

  sort = (a, b) => {
    switch (this.props.sortType) {
      case "name_desc":
        return a.login !== b.login ? (a.login > b.login ? -1 : 1) : 0;
      case "score_desc":
        return a.score !== b.score ? (a.score > b.score ? -1 : 1) : 0;
      case "score_asc":
        return a.score !== b.score ? (a.score < b.score ? -1 : 1) : 0;
      case "name_asc":
        return a.login !== b.login ? (a.login < b.login ? -1 : 1) : 0;
      default:
        return a.login !== b.login ? (a.login > b.login ? -1 : 1) : 0;
    }
  };
  render() {
    return (
      <div>
        {this.props.users.sort(this.sort).map(this.renderCard)}
        <br></br>
      </div>
    );
  }
}

const mapStateToProps = ({ users, utilities: { sortType } }) => {
  return {
    users,
    sortType
  };
};

export default connect(mapStateToProps)(Content);
