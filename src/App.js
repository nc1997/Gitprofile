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
      let profileList = []
      if (e.target.value === 'name_dsc') {
        profileList = _.orderBy(this.state.items, ['login'], ['desc'])
      } else if (e.target.value === 'score_dsc') {
        profileList = _.orderBy(this.state.items, ['score'], ['desc'])
      } else if (e.target.value === 'score_asc') {
        profileList = _.orderBy(this.state.items, ['score'], ['asc'])
      } else if (e.target.value === 'name_asc') {
        profileList = _.orderBy(this.state.items, ['login'], ['asc']);
      }
      this.setState({ items: profileList });
    }
  }


  renderCardsSection = () => (
    this.state.items.map((item, index) => (
          <Cards data={item} />
    ))
  )


  render() {
    return (
      <div>
              <input
                type="text"
                className="container"
                placeholder="Search..."
                onChange={this.search}
              />
            
              <Input className="container" onChange={(e) => this.handleChange(e)} type="select" name="sortType" id="exampleSelect">
                  <option value="score_dsc">Rank by Dsc</option>
                  <option value="name_asc" >Name by Asc</option>
                  <option value="name_dsc" >Name by Dsc</option>
                  <option value="score_asc">Rank by Asc</option>
                </Input> 

              {this.renderCardsSection()}

        </div>
    );
  }
}


