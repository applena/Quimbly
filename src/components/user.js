/* global gapi */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions.js';

class user extends React.Component {


  async componentDidMount() {
    const name = await gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
    this.props.setUser(name);
    console.log('user - the user', this.props, name);

  }

  render() {
    return (
      <h2>Hello {this.props.User && this.props.User}</h2>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log('user dispatch');
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