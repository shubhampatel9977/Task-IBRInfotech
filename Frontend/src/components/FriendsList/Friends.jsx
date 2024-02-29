import "./Friends.css";
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getFriendsList } from "../../redux/userReducer/userSlice"

const FriendsList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFriendsList())
  },[]);

  const friends = useSelector(state => state.user.friendsList);

  return (
    <>
      {friends &&
        friends.map((user) => {
          return (
            <div key={user._id} className="friendlist-container">
              <div className="friendlist-main">
                <div className="friendlist-image-block">
                  <img src={user?.receiver?.profilePicture} alt="profile image" />
                </div>
                <div className="friendlist-profile-info">
                  <p>{user?.receiver?.username}</p>
                  <p>{user?.receiver?.bio}</p>
                </div>
                <div className="friendlist-action-btn">
                  <button>Un Friend</button>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default React.memo(FriendsList);
