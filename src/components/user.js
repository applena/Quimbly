/* global gapi */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions.js';

class user extends React.Component{


  componentDidMount(){
    let name = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
    this.props.setUser(name);
  }

  render(){
    return(
      <h2>Hello {this.props.User}</h2>
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