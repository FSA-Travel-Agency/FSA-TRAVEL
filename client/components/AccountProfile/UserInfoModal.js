import React from 'react';

const UserInfoModal = ({
  user,
  userInfo,
  handleSubmit,
  handleChange,
  popUpToggle,
  changeContent,
}) => {
  return (
    <div>
      {popUpToggle && (
        <div className='pop-up-container'>
          <div className='pop-up-body' onClick={(e) => e.stopPropagation()}>
            <div className='pop-up-header'>
              <button className='pop-up-x' onClick={changeContent}>
                X
              </button>
            </div>
            <div className='pop-up-content'>
              <div className='pop-up-card'>
                <h4>User Name</h4>
                <input
                  type='text'
                  name='username'
                  value={userInfo.username}
                  placeholder={user.username}
                  onChange={handleChange}
                />
              </div>
              <div className='pop-up-card'>
                <h4>First Name</h4>
                <input
                  type='text'
                  name='firstName'
                  value={userInfo.firstName}
                  placeholder={user.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className='pop-up-card'>
                <h4>Last Name</h4>
                <input
                  type='text'
                  name='lastName'
                  value={userInfo.lastName}
                  placeholder={user.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className='pop-up-card'>
                <h4>Email</h4>
                <input
                  type='text'
                  name='email'
                  value={userInfo.email}
                  placeholder={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className='pop-up-card'>
                <h4>Phone Number</h4>
                <input
                  type='text'
                  name='phone'
                  value={userInfo.phone}
                  placeholder={user.phone}
                  onChange={handleChange}
                />
              </div>
              <button
                type='submit'
                className='edit-button'
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfoModal;
