import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './components/AuthForm';
import SignUp from './components/SignUp';
import { Signup } from './components/SignUpTemp';
import Home from './components/Home';
import { me } from './store';
import AllFlights from './components/AllFlights';
import { AccountCreated } from './components/AccountCreated';
import AccountProfile from './components/AccountProfile';
import ManageUsers from './components/ManageUsers';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/home' component={Home} />
          <Route path='/login' component={Login} />
          {/* <Route path="/signup" component={SignUp} /> */}
          <Route path='/signup' component={Signup} />
          <Route path='/created' component={AccountCreated} />
          <Route path='/flights' component={AllFlights} />
          <Route path='/profile/:id' component={AccountProfile} />
          <Route path='/admin/manageusers/:id' component={ManageUsers} />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Routes);
