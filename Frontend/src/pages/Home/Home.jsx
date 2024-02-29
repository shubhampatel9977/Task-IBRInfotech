import "./Home.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/userReducer/userSlice";
import UpdateUser from "../../components/UpdateUser/UpdateUser";
import UsersList from "../../components/UsersList/UsersList";
import RequestList from "../../components/RequestList/RequestList";
import FriendsList from "../../components/FriendsList/Friends";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userUpdate, setUserUpdate] = useState(false);
  const [selectList, setSelectList] = useState(0);

  useEffect(() => {
    const getUser = localStorage.getItem("IBR-token");
    if (!getUser) navigate("/");
    dispatch(getUserInfo())
  },[]);

  const userDetails = useSelector(state => state.user.userInfo);

  const updateUserPopup = () => {
    setUserUpdate(!userUpdate);
  };

  const userLogOutHandle = () => {
    localStorage.removeItem("IBR-token")
    navigate("/login");
  }
  
  return (
    <>
      <div className="home-Container">
        <div className="profile-container">
          <div className="image-block">
            <img src={ userDetails?.profilePicture || "./profile-placeholder.jpg" }alt="user profile" />
          </div>
          <div className="info-block">
            <div className="detail-block">
              <div>
                <h4>User Name</h4>
                <p>{userDetails?.username}</p>
              </div>
              <div>
                <h4>Name</h4>
                <p>{userDetails?.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{userDetails?.email}</p>
              </div>
            </div>
            <div className="user-bio-block">
              <p>{userDetails?.bio}</p>
            </div>
            <div className="profile-action-block">
              <button
                type="button"
                className="update-btn"
                onClick={updateUserPopup}
              >
                Update User
              </button>
              <button
                type="button"
                className="logout-btn"
                onClick={userLogOutHandle}
              >
                Log Out
              </button>
              <UpdateUser userUpdate={userUpdate} updateUserPopup={updateUserPopup} />
            </div>
          </div>
        </div>
        <div className="listing-btns">
          <div className={ selectList === 0 ? "list-btn list-btn-seagreen" : "list-btn list-btn-cadetblue" } onClick={() => setSelectList(0)}>
            <p>All Users</p>
          </div>
          <div className={ selectList === 1 ? "list-btn list-btn-seagreen" : "list-btn list-btn-cadetblue" } onClick={() => setSelectList(1)}>
            <p>Requests</p>
          </div>
          <div className={ selectList === 2 ? "list-btn list-btn-seagreen" : "list-btn list-btn-cadetblue" } onClick={() => setSelectList(2)}>
            <p>All Friends</p>
          </div>
        </div>
        <div>
          { selectList === 0 ? <UsersList /> : selectList === 1 ? <RequestList /> : <FriendsList />}
        </div>
      </div>
    </>
  );
}
