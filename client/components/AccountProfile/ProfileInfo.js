import React from 'react';
import { Link } from 'react-router-dom';
import UserInfoModal from './UserInfoModal';

const ProfileInfo = ({
  user,
  userInfo,
  handleClick,
  handleSubmit,
  handleChange,
  popUpToggle,
  changeContent,
  role,
}) => {
  return (
    <div className='account-details'>
      {role === 'user' ? (
        <h1 className='account-title'>{user.username}'s Account Profile</h1>
      ) : (
        <h1 className='account-title'>
          <div>
            {user.username}'s' {user.role} Dashboard
          </div>
          <small className='admin-task'>
            <Link to={`/admin/manageusers/${user.id}`}>Manage Users</Link>
          </small>
        </h1>
      )}
      <div className='user-details'>
        <h4>Username</h4>
        <p className='user-info'>{user.username}</p>
      </div>
      <div className='user-details'>
        <h4>Name</h4>
        <p className='user-info'>
          {user.firstName} {user.lastName}
        </p>
      </div>
      <div className='user-details'>
        <h4>Email</h4>
        <p className='user-info'>{user.email}</p>
      </div>
      <div className='user-details'>
        <h4>Phone Number</h4>
        <p className='user-info'>{user.phone}</p>
      </div>
      <button type='submit' className='logout-button'>
        <a href='#' onClick={handleClick}>
          Logout
        </a>
      </button>
      <button
        type='submit'
        className='edit-button'
        onClick={() => changeContent({ user })}
      >
        Edit
      </button>
      <UserInfoModal
        user={user}
        userInfo={userInfo}
        handleClick={handleClick}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        popUpToggle={popUpToggle}
        changeContent={changeContent}
      />
    </div>
  );
};

export default ProfileInfo;
