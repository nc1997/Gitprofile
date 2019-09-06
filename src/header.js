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
    if (val !== undefined) {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.search(val);
      }, 500);
    }
  };

  search = val => {
    this.setState({ search: val }, () => {
      this.props.fetchUsers(this.state.search, this.props.pageCount);
    });
  };

  searchCall = (val, page) => {
    if (val !== undefined) this.props.fetchUsers(val, page);
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
      this.setState({ activePage: this.props.pageCount });
      this.searchCall(this.state.search, this.props.pageCount);
    }
  };

  componentDidMount = () => {
    this.searchCall(
      this.props.match.params.username,
      this.props.match.params.perpage
    );
  };

  render() {
    if (this.state.search !== "") {
      if (this.props.pageCount !== undefined) {
        window.location.href = `/#/users/${this.state.search}/${this.state.activePage}`;
      }
      else {
        window.location.href = `/#/users/${this.state.search}/${1}`;
      }
    }

    return (
      <div className="header">
        {this.renderSearchBar()}
        {this.renderSortby()}
      </div>
    );
  }
}

const mapStateToProps = ({ users, utilities: { pageCount, totalCount } }) => ({
  users,
  pageCount,
  totalCount
});

export default connect(
  mapStateToProps,
  { fetchUsers, UpdateSortType }
)(Header);
