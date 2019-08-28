import { Input } from 'reactstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchUsers} from './actions'
import { options } from './Utils/const';
import { UpdateSortType } from './actions'
import './header.scss'

class Header extends Component {

  search = (event) => {
    this.props.fetchUsers(event.target.value)
  }


  renderSearchBar = () => (
    <input
      type="text"
      className="container_search"
      placeholder="Search..."
      onChange={this.search}
    />
  )

  renderOption = ({ key, value }) => <option key={key} value={value}>{key}</option>

  renderSortby = () => (
    <Input
      className="container_sort"
      onChange={this.handleChange}
      type="select"
      name="sortType"
      id="exampleSelect"
    >
      {options.map(this.renderOption)}
    </Input>
  )

  handleChange = ({ target: { name, value } }) => {
    if (name === "username") {
      this.setState({ [name]: value }, () => this.search());
    } else {
      this.props.UpdateSortType(value)
    }
  }

  render() {
    return (
      <div className="header">
        {this.renderSearchBar()}
        {this.renderSortby()}
      </div>

    )
  }

}

const mapStateToProps = ({ users }) => ({
  users,
})

export default connect(mapStateToProps, { fetchUsers, UpdateSortType })(Header)
