import React, { Component } from "react";
import Content from "./content";
import Header from "./header";

export default class App extends Component {
  render() {
    return (
      <div>
          <Header match={this.props.match}/>
          <Content match={this.props.match}/>
       </div>
    );
  }
}
