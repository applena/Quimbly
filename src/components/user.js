/* global gapi */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions.js';
import When from './when';

class user extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userName: 'bob'
    };
  }


  componentDidMount(){
    let name = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
    this.setState({
      userName: name
    });
  }

  render(){
    return(
      <h2>Hello {this.state.userName}</h2>
    )
  }
}

const mapDispatchToProps = (dispatch, getState) => {
  return {
    setUser: (name) => dispatch(actions.setUser(name))
  }
};

const mapStateToProps = state => ({
  User: state.User,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(user);