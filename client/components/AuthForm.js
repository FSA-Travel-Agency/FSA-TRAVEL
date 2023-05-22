import React from 'react';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { authenticate } from '../store';
import { useDispatch } from 'react-redux';
import Home from './Home';
import { Link, Redirect } from 'react-router-dom';
import AccountProfile from './AccountProfile';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const AuthForm = (props) => {
  const { name, displayName, error, isLoggedIn, role, id } = props;
  const dispatch = useDispatch();

  function handleCallbackResponse(response) {
    //gives successful web token: very bare bones
    console.log('Encoded JWT id token', response.credential);
    const userObj = jwtDecode(response.credential);
    console.log('Decoded Info', userObj);
    const formName = 'login';
    dispatch(authenticate(userObj, formName));
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        '53771139103-07bg91j6j0tt69k4n60b374sd0ugpm4g.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('logInDiv'), {
      theme: 'outline',
      size: 'large',
    });

    // google.accounts.id.prompt();
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;

    dispatch(authenticate({ username, password }, formName));
  };

  const quickLogin = (evt) => {
    evt.preventDefault();
    const formName = 'login';
    dispatch(authenticate({ username: 'cody', password: '123' }, formName));
  };

  return (
    <div className='login-signup-container'>
      {!isLoggedIn ? (
        <>
          <form onSubmit={handleSubmit} name={name} className='login-container'>
            <h2 className='login-elements'>{displayName}</h2>
            <div className='login-elements'>
              <label htmlFor='username'></label>
              <input name='username' type='text' placeholder='Your Username' />
            </div>
            <div className='login-elements'>
              <label htmlFor='password'></label>
              <input
                name='password'
                type='password'
                placeholder='Your Password'
              />
            </div>
            <div className='login-elements'>
              <button type='submit' className='form-button'>
                {displayName}
              </button>
              <div className='recruiter-login' onClick={quickLogin}>
                Recruiter or Guest?
              </div>
              <div id='logInDiv'></div>
            </div>
            {error && error.response && (
              <div className='auth-error'>*{error.response.data}</div>
            )}
            <p className='signup-prompt'>
              New here?{' '}
              <Link to='/signup' className='signup-link'>
                Sign up
              </Link>
            </p>
            <div className='pop-up-icons'>
              <FaFacebook size={35} />
              <FaTwitter size={35} />
              <FaInstagram size={35} />
            </div>
          </form>
        </>
      ) : isLoggedIn && role === 'user' ? (
        <Redirect to='/home' />
      ) : isLoggedIn && role === 'admin' ? (
        <Redirect to={`/profile/${id}`} />
      ) : (
        <header>Page Cannot be Found</header>
      )}
    </div>
  );
};

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error,
    isLoggedIn: !!state.auth.id,
    role: state.auth.role,
    id: state.auth.id,
  };
};

export const Login = connect(mapLogin)(AuthForm);
