import React from 'react';
import { logout, getUser } from '../store';
import { connect, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { updateUser } from '../store';
import ProfileInfo from './AccountProfile/ProfileInfo';

const AccountProfile = ({ handleClick, user }) => {
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
    // console.log(user);
    setUserInfo(user);
    setPopUpToggle(!popUpToggle);
  };

  function handleChange(e) {
    const newUserInfo = userInfo;
    newUserInfo[e.target.name] = e.target.value;
    setUserInfo(newUserInfo);
  }

  async function handleSubmit(e) {
    console.log('user info', userInfo);
    e.preventDefault();
    dispatch(updateUser(user.id, userInfo));
    changeContent();
  }

  useEffect(() => {
    getUser(user.id);
    // dispatch(getUser(user.id));
  }, []);

  return (
    <div className='profile-container'>
      {user.role === 'user' ? (
        <ProfileInfo
          user={user}
          userInfo={userInfo}
          handleClick={handleClick}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          popUpToggle={popUpToggle}
          changeContent={changeContent}
          role={user.role}
        />
      ) : (
        <ProfileInfo
          user={user}
          userInfo={userInfo}
          handleClick={handleClick}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          popUpToggle={popUpToggle}
          changeContent={changeContent}
          role={user.role}
        />
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
    getUser() {
      dispatch(getUser());
    },
  };
};

export default connect(mapState, mapDispatch)(AccountProfile);

// import React from 'react';
// import { logout, getUser } from '../store';
// import { connect } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { updateUser } from '../store';

// const AccountProfile = ({ handleClick, user }) => {
//   const [edit, setEdit] = useState(false);
//   const [userInfo, setUserInfo] = useState({
//     username: user.username,
//     password: user.password,
//     firstName: user.firstName,
//     lastName: user.lastName,
//     email: user.email,
//     phone: user.phone,
//   });

//   function handleChange(e) {
//     setUserInfo({
//       [e.target.name]: e.target.value,
//     });
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     updateUser(user.id, userInfo);
//     console.log('Submit Working!');
//   }

//   useEffect(() => {
//     getUser(user.id);
//   });
//   // onSubmit={updateUser(user.id, userInfo)}
//   return (
//     <div className='profile-container'>
//       {user.role === 'user' ? (
//         // <form>
//         <div className='account-details'>
//           <h1 className='account-title'>{user.username}'s Account Profile</h1>
//           <div className='user-details'>
//             <h4>Username</h4>
//             {edit ? (
//               <input
//                 type='text'
//                 name='username'
//                 value={userInfo.username || ''}
//                 placeholder={user.username}
//                 onChange={handleChange}
//               />
//             ) : (
//               <p className='user-info'>{user.username}</p>
//             )}
//           </div>
//           <div className='user-details'>
//             <h4>Name</h4>
//             {edit ? (
//               <div>
//                 <input
//                   type='text'
//                   name='firstName'
//                   value={userInfo.firstName || ''}
//                   placeholder={`${user.firstName}`}
//                   onChange={handleChange}
//                 />
//                 <input
//                   type='text'
//                   name='lastName'
//                   value={userInfo.lastName || ''}
//                   placeholder={`${user.lastName}`}
//                   onChange={handleChange}
//                 />
//               </div>
//             ) : (
//               <p className='user-info'>
//                 {user.firstName} {user.lastName}
//               </p>
//             )}
//           </div>
//           <div className='user-details'>
//             <h4>Email</h4>
//             {edit ? (
//               <input
//                 type='text'
//                 name='email'
//                 value={userInfo.email || ''}
//                 placeholder={user.email}
//                 onChange={handleChange}
//               />
//             ) : (
//               <p className='user-info'>{user.email}</p>
//             )}
//           </div>
//           <div className='user-details'>
//             <h4>Phone Number</h4>
//             {edit ? (
//               <input
//                 type='text'
//                 name='phone'
//                 value={userInfo.phone || ''}
//                 placeholder={user.phone}
//                 onChange={handleChange}
//               />
//             ) : (
//               <p className='user-info'>{user.phone}</p>
//             )}
//           </div>
//           <button type='submit' className='logout-button'>
//             <a href='#' onClick={handleClick}>
//               Logout
//             </a>
//           </button>
//           <form>
//             {edit ? (
//               // <form onSubmit={updateUser(user.id, userInfo)}>
//               <button
//                 type='submit'
//                 className='edit-button'
//                 onClick={updateUser(user.id, userInfo)}
//               >
//                 Save
//               </button>
//             ) : (
//               // </form>
//               <button
//                 type='submit'
//                 className='edit-button'
//                 onClick={() => setEdit(!edit)}
//               >
//                 Edit
//               </button>
//             )}
//           </form>
//         </div>
//       ) : (
//         // </form>
//         <div className='account-details'>
//           <h1 className='account-title'>
//             <div>
//               {user.username}'s' {user.role} Dashboard
//             </div>
//             <small className='admin-task'>
//               <Link to={`/admin/manageusers/${user.id}`}>Manage Users</Link>
//             </small>
//           </h1>
//           <hr style={{ color: 'black' }} />
//           <div className='user-details'>
//             <h4>Username</h4>
//             {edit ? (
//               <form>
//                 <input type='text' placeholder={user.username} />
//               </form>
//             ) : (
//               <p className='user-info'>{user.username}</p>
//             )}
//           </div>
//           <div className='user-details'>
//             <h4>Name</h4>
//             {edit ? (
//               <form>
//                 <input
//                   type='text'
//                   placeholder={`${user.firstName} ${user.lastName}`}
//                 />
//               </form>
//             ) : (
//               <p className='user-info'>
//                 {user.firstName} {user.lastName}
//               </p>
//             )}
//           </div>
//           <div className='user-details'>
//             <h4>Email</h4>
//             {edit ? (
//               <form>
//                 <input type='text' placeholder={user.email} />
//               </form>
//             ) : (
//               <p className='user-info'>{user.email}</p>
//             )}
//           </div>
//           <div className='user-details'>
//             <h4>Phone Number</h4>
//             {edit ? (
//               <form>
//                 <input type='text' placeholder={user.phone} />
//               </form>
//             ) : (
//               <p className='user-info'>{user.phone}</p>
//             )}
//           </div>
//           <button type='submit' className='logout-button'>
//             <a href='#' onClick={handleClick}>
//               Logout
//             </a>
//           </button>
//           <button
//             type='submit'
//             className='edit-button'
//             onClick={() => setEdit(!edit)}
//           >
//             Edit
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// const mapState = (state) => {
//   return {
//     user: state.auth,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     handleClick() {
//       dispatch(logout());
//     },
//     getUser(id) {
//       dispatch(getUser(id));
//     },
//     updateUser(id, info) {
//       dispatch(updateUser(id, info));
//     },
//   };
// };

// export default connect(mapState, mapDispatch)(AccountProfile);

// {
//   /* <form>
//           <div className='account-details'>
//             <h1 className='account-title'>{user.username}'s Account Profile</h1>
//             <div className='user-details'>
//               <h4>Username</h4>
//               {edit ? (
//                 <input
//                   type='text'
//                   name='username'
//                   value={userInfo.username || ''}
//                   placeholder={user.username}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 <p className='user-info'>{user.username}</p>
//               )}
//             </div>
//             <div className='user-details'>
//               <h4>Name</h4>
//               {edit ? (
//                 <div>
//                   <input
//                     type='text'
//                     name='firstName'
//                     value={userInfo.firstName || ''}
//                     placeholder={`${user.firstName}`}
//                     onChange={handleChange}
//                   />
//                   <input
//                     type='text'
//                     name='lastName'
//                     value={userInfo.lastName || ''}
//                     placeholder={`${user.lastName}`}
//                     onChange={handleChange}
//                   />
//                 </div>
//               ) : (
//                 <p className='user-info'>
//                   {user.firstName} {user.lastName}
//                 </p>
//               )}
//             </div>
//             <div className='user-details'>
//               <h4>Email</h4>
//               {edit ? (
//                 <input
//                   type='text'
//                   name='email'
//                   value={userInfo.email || ''}
//                   placeholder={user.email}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 <p className='user-info'>{user.email}</p>
//               )}
//             </div>
//             <div className='user-details'>
//               <h4>Phone Number</h4>
//               {edit ? (
//                 <input
//                   type='text'
//                   name='phone'
//                   value={userInfo.phone || ''}
//                   placeholder={user.phone}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 <p className='user-info'>{user.phone}</p>
//               )}
//             </div>
//             <button type='submit' className='logout-button'>
//               <a href='#' onClick={handleClick}>
//                 Logout
//               </a>
//             </button>
//             {edit ? (
//               <button
//                 type='submit'
//                 className='edit-button'
//                 onClick={() => setEdit(!edit)}
//               >
//                 Save
//               </button>
//             ) : (
//               <button
//                 type='submit'
//                 className='edit-button'
//                 onClick={() => setEdit(!edit)}
//               >
//                 Edit
//               </button>
//             )}
//           </div>
//         </form> */
// }
