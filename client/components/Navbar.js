import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Cart from './cart/Cart';
const Navbar = ({ isLoggedIn, userId }) => (
  <div className='nav-menu'>
    {isLoggedIn ? (
      <div className='navbar-links'>
        <Link to='/home' className='nav-link float-logo'>
          <img src='https://i.imgur.com/yNx0KW5.png' className='nav-logo' />
        </Link>
        <Cart userId={userId} />
        <div className='dropdown'>
          <button className='dropbtn'>
            Account
            <i className='fa fa-caret-down'></i>
          </button>
          <div className='dropdown-content'>
            <Link to={`/profile/${userId}`} className='nav-link float-account'>
              My Information
            </Link>
            <Link to={`/orderhistory`} className='nav-link float-account'>
              Order History
            </Link>
          </div>
        </div>
        <Link to='/home' className='nav-link float-home'>
          Home
        </Link>
      </div>
    ) : (
      <div className='navbar-links'>
        <Link to='/home' className='nav-link float-logo'>
          <img src='https://i.imgur.com/yNx0KW5.png' className='nav-logo' />
        </Link>
        <Cart userId={userId} />
        <Link to='/login' className='nav-link float-login'>
          Login
        </Link>
        <Link to='/home' className='nav-link float-home'>
          Home
        </Link>
      </div>
    )}
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
  };
};

export default connect(mapState)(Navbar);
