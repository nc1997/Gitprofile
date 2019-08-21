import React, { Component } from 'react';
import Cards from './card'
import { axiosInstance } from './config';
import { Input } from 'reactstrap';
import './App.css'
import _ from 'lodash';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  search = (event) => {
    var val = event.target.value
    axiosInstance.get(`search/users?q=${val}`)
      .then(
        (res) => {
          this.setState({ items: res.data.items })
        },
      )

  }

  handleChange(e) {
    if (e.target.name === "username") {
      this.setState({ [e.target.name]: e.target.value }, () => this.search());
    } else {
      let profileList = this.state.items
      if (e.target.value === 'name_dsc') {
        profileList.sort((a, b) => a.login !== b.login ? a.login > b.login ? -1 : 1 : 0);
      } else if (e.target.value === 'score_dsc') {
        profileList.sort((a, b) => a.score !== b.score ? a.score > b.score ? -1 : 1 : 0);
      } else if (e.target.value === 'score_asc') {
        profileList.sort((a, b) => a.score !== b.score ? a.score < b.score ? -1 : 1 : 0);
      } else if (e.target.value === 'name_asc') {
        profileList.sort((a, b) => a.login !== b.login ? a.login < b.login ? -1 : 1 : 0);
      }
      this.setState({ items: profileList })
    }
  }


  renderCardsSection = () => (
    this.state.items.map((item) => (
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
              {this.renderCardsSection()}

        </div>
    );
  }
}


