import "./RequestList.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRequestList,
  acceptRequest,
  declineRequest,
} from "../../redux/userReducer/userSlice";

const RequestList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequestList());
  }, []);

  const requests = useSelector((state) => state.user.requestList);

  const handleAcceptRequest = (id) => {
    try {
      dispatch(acceptRequest(id));
    } catch (error) {
      console.error("Handle Accept Request", error.message);
    }
  };

  const handleDeclineRequest = (id) => {
    try {
      dispatch(declineRequest(id));
    } catch (error) {
      console.error("Handle Decline Request", error.message);
    }
  };

  return (
    <>
      {requests &&
        requests.map((user) => {
          return (
            <div key={user?._id} className="requestlist-container">
              <div className="requestlist-main">
                <div className="requestlist-image-block">
                  <img
                    src={
                      user?.sender?.profilePicture ||
                      "./profile-placeholder.jpg"
                    }
                    alt="profile image"
                  />
                </div>
                <div className="requestlist-profile-info">
                  <p>{user?.sender?.username}</p>
                  <p>{user?.sender?.bio}</p>
                </div>
                <div className="requestlist-action-btn">
                  <button
                    className="requestlist-accept-btn"
                    onClick={() => handleAcceptRequest(user._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="requestlist-decline-btn"
                    onClick={() => handleDeclineRequest(user._id)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default React.memo(RequestList);
