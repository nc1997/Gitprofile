import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import './card.css'
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux'
import { fetchRepos } from './actions'

class Cards extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }


  toggle = () => {
  
    this.setState(state => ({
      open: !state.open
    }));
    this.props.fetchRepos(this.props.data.login)
  }


  renderRepo=()=>(
  
    this.props.repos.map((value,index) => {
     
      return (
        <div>
          <p>Repo name : {value.name}&nbsp;&nbsp;&nbsp;&nbsp;Language : {value.language} </p>
          <p>Forks : {value.forks_count}&nbsp;&nbsp;&nbsp;&nbsp;watchers : {value.watchers}</p>
          <Divider />
        </div>

      )
    })
  )

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
                { Array.isArray(this.props.repos) ? 
                    this.renderRepo() : null
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

const mapStateToProps = ({ repos }) => ({
  repos
})

export default connect(mapStateToProps, { fetchRepos })(Cards)
