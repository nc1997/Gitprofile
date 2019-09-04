import React, { Component } from "react";
import { connect } from "react-redux";
import { Input } from "reactstrap";
import { fetchUsers, UpdateSortType } from "./actions";
import "./header.scss";
import { options } from "./Utils/const";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      search: ""
    };
    this.timer = null;
  }

  handleSearch = event => {
    var val = event.target.value;
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.search(val);
    }, 500);
  };
  search = val => {
    this.setState({ search: val }, () => {
      this.props.fetchUsers(this.state.search, this.props.pageCount);
    });
  };

  searchCall = () => {
    this.props.fetchUsers(this.state.search, this.props.pageCount);
  };

  renderSearchBar = () => (
    <input
      type="text"
      className="container_search"
      placeholder="Search..."
      onChange={this.handleSearch}
    />
  );

  renderOption = ({ key, value }) => (
    <option key={key} value={value}>
      {key}
    </option>
  );

  renderSortby = () => (
    <Input
      className="sort"
      onChange={this.handleChange}
      type="select"
      name="sortType"
      id="exampleSelect"
    >
      {options.map(this.renderOption)}
    </Input>
  );

  handleChange = ({ target: { name, value } }) => {
    if (name === "username") {
      this.setState({ [name]: value }, () => this.search());
    } else {
      this.props.UpdateSortType(value);
    }
  };

  componentDidUpdate = () => {
    if (
      this.state.activePage !== this.props.pageCount &&
      this.props.pageCount !== undefined
    ) {
      console.log("caled");
      this.setState({ activePage: this.props.pageCount });
      this.searchCall();
    }
  };

  render() {
    return (
      <div className="header">
        {this.renderSearchBar()}
        {this.renderSortby()}
      </div>
    );
  }
}

const mapStateToProps = ({ users, utilities: { pageCount } }) => ({
  users,
  pageCount
});

export default connect(
  mapStateToProps,
  { fetchUsers, UpdateSortType }
)(Header);
