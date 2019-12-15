/* global gapi */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions.js';
import When from './when';

class user extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userName: 'bob',
      show: false
    };
  }


  componentDidMount(){
    let name = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
    this.setState({
      userName: name,
      show: true
    });
  }

  render(){
    return(
      <When condition={this.state.show}>
        <h2>Hello {this.state.userName}</h2>
      </When>
    )
  }
}

const mapDispatchToProps = (dispatch, getState) => {
  return {
    setUser: (name) => dispatch(actions.setUser(name))
  }
};

const mapStateToProps = state => ({
  User: state.someData.User,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(user);