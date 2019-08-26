import React, { Component } from 'react';
import Cards from './card'
import { Input } from 'reactstrap';
import './App.css'
import _ from 'lodash';
import { connect } from 'react-redux'
import { fetchUsers ,sortUsers} from './actions'


 class App extends Component {

  search = (event) => {
    this.props.fetchUsers(event.target.value)
   }

  handleChange(e) {
    if (e.target.name === "username") {
      this.setState({ [e.target.name]: e.target.value }, () => this.search());
    } else {
      this.props.sortUsers(e.target.value)

    }
  }


  renderCardsSection = () => (
    this.props.users.items.map((item) => (
          <Cards data={item} />
    ))
  )

  renderSearchBar = () => (
    <input
    type="text"
    className="container"
    placeholder="Search..."
    onChange={this.search}
  />
  )

  renderSortby=()=>(
    <Input className="container" onChange={(e) => this.handleChange(e)} type="select" name="sortType" id="exampleSelect">
                  <option value="score_dsc">Rank by Dsc</option>
                  <option value="name_asc" >Name by Asc</option>
                  <option value="name_dsc" >Name by Dsc</option>
                  <option value="score_asc">Rank by Asc</option>
                </Input> 
  )


  render() {
    return (
      <div>
              {this.renderSearchBar()}
              {this.renderSortby()}
              {this.props.users.items!==undefined ? this.renderCardsSection() : null}

        </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users,
})

export default connect(mapStateToProps, { fetchUsers,sortUsers })(App)


