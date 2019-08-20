import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import './card.css'
import { axiosInstance } from './config';
import Divider from '@material-ui/core/Divider';


export default class Cards extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      details: []
    };
  }


  toggle = () => {
    this.setState(state => ({
      open: !state.open
    }));
    axiosInstance.get(`users/${this.props.data.login}/repos`)
      .then(
        (res) => {
          this.setState({ details: res.data })
        },
      )
  }

  render() {

    if (this.state.open) {
      return (
        <div>
          <Card >
            <CardContent>
              <img style={{ height: 100, width: 100, borderRadius: '50%' }} src={this.props.data.avatar_url} />
              <div className="new">
                <p>Username : {this.props.data.login}</p>
                <p>Score : {this.props.data.score}</p>
                <br></br>
                {
                    this.state.details.map((value) => {
                      return (
                        <div>
                          <p>Repo name : {value.name}&nbsp;&nbsp;&nbsp;&nbsp;Language : {value.language} </p>
                          <p>Forks : {value.forks_count}&nbsp;&nbsp;&nbsp;&nbsp;watchers : {value.watchers}</p>
                          <Divider />
                        </div>

                      )
                    })
                }
              </div>
            </CardContent>
            <CardActions >
              <Button onClick={this.toggle} color="primary" size="medium">Details</Button>
            </CardActions>
          </Card>
          <br></br>
        </div>
      );
    }

    else {
      return (
        <div>
          <Card >
            <CardContent>
              <img style={{ height: 100, width: 100, borderRadius: '50%' }} src={this.props.data.avatar_url} />
              <div className="new">
                <p>Score : {this.props.data.score}</p>
                <p>Username : {this.props.data.login}</p>
              </div>
            </CardContent>
            <CardActions >
              <Button onClick={this.toggle} color="primary" size="medium">Details</Button>
            </CardActions>
          </Card>
          <br></br>
        </div>
      );
    }
  }
}