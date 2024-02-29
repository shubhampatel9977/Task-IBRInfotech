import "./UsersList.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserList, sendFriendRequest } from "../../redux/userReducer/userSlice"

const UsersList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserList())
  },[]);

  const users = useSelector(state => state.user.usersList);

  const handleSendRequest = (id) => {
    try{
      dispatch(sendFriendRequest({receiverId: id}));
    } catch(error) {
      console.error('Handle Send Request', error.message);
    }
  }

  return (
    <>
      {users &&
        users.map((user) => {
          return (
            <div key={user?._id} className="userlist-container">
              <div className="userlist-main">
                  <div className="userlist-image-block">
                    <img src={user?.profilePicture || "./profile-placeholder.jpg"} alt="profile image" />
                  </div>
                  <div className="userlist-profile-info">
                    <p>{user?.username}</p>
                    <p>{user?.bio}</p>
                  </div>
                  <div className="userlist-action-btn">
                    <button onClick={() => handleSendRequest(user._id)}>Get Friend</button>
                  </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default React.memo(UsersList);
