import "bootstrap-less/bootstrap/bootstrap.less";
import React, { Component } from "react";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import { UpdatePageCount } from "./actions";
import Card from "./card";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1
    };
  }

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
    this.props.UpdatePageCount(pageNumber);
  };

  componentDidMount=()=>{
    if(this.props.match.params.perpage!==undefined)
     this.setState({ activePage: parseInt(this.props.match.params.perpage) }); 
  }

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
        <Pagination
          className="page"
          activePage={this.state.activePage}
          itemsCountPerPage={5}
          totalItemsCount={this.props.totalCount}
          pageRangeDisplayed={20}
          onChange={this.handlePageChange}
        />
        {this.props.users.sort(this.sort).map(this.renderCard)}
        <br></br>
      </div>
    );
  }
}

const mapStateToProps = ({
  users,
  utilities: { sortType, pageCount, totalCount }
}) => {
  return {
    users,
    sortType,
    pageCount,
    totalCount
  };
};

export default connect(
  mapStateToProps,
  { UpdatePageCount }
)(Content);
