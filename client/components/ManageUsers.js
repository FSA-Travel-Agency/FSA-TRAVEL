import React from 'react';
import { getAllUsers } from '../store/admin';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import UserInfoModal from './AccountProfile/UserInfoModal';
import { updateUser } from '../store';
import axios from 'axios';

const ManageUsers = ({ users, allUsers, role }) => {
  // console.log('>>>>', role);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [popUpToggle, setPopUpToggle] = useState(false);

  const changeContent = (user) => {
    setUserInfo(user);
    setPopUpToggle(!popUpToggle);
    allUsers();
  };

  useEffect(() => {
    allUsers();
  }, []);

  async function handleClick(user) {
    const result = await axios.get(`/api/users/${user.id}`);
    setUserInfo(result.data);
    // console.log(result.data);
    changeContent(user);
  }

  function handleChange(e) {
    //need to look at this part
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(userInfo);
    const updated = await axios.put(`/api/users/${userInfo.id}`, userInfo);
    console.log(updated);
  }

  return (
    <div className='task-container'>
      {role === 'admin' ? (
        <div>
          <h1 className='task-title'>Admin Can Manage Users</h1>
          <div>
            <ul className='users-list'>
              {users.map((user) => (
                <div key={user.id}>
                  <li className='user'>
                    <ul onClick={() => handleClick(user)}>{user.username}</ul>
                  </li>
                </div>
              ))}
              <UserInfoModal
                user={userInfo}
                userInfo={userInfo}
                changeContent={changeContent}
                popUpToggle={popUpToggle}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </ul>
          </div>
        </div>
      ) : (
        <div>Oops Page Not Found</div>
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    users: state.admin,
    role: state.auth.role,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    allUsers() {
      dispatch(getAllUsers());
    },
  };
};

export default connect(mapState, mapDispatch)(ManageUsers);
