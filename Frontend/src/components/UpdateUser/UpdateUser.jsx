import "./UpdateUser.css";
import React, { useEffect, useState, useRef } from 'react'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, getUserInfo } from "../../redux/userReducer/userSlice";

const schema = yup
  .object({
    // profilePicture: yup.file(),
    username: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().required(),
    bio: yup.string(),
  })
  .required();

const UpdateUser = ({ userUpdate, updateUserPopup }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const userDetails = useSelector(state => state.user.userInfo);

  const setFormData = () => {
    // setValue('profilePicture', 'value');
    setValue('username', userDetails?.username);
    setValue('name', userDetails?.name);
    setValue('email', userDetails?.email);
    setValue('bio', userDetails?.bio);
  }

  useEffect(() => {
    setFormData();
  });

  const handleClosePopUp = () => {
    if(image) {
      setImage(null);
    }
    reset();
    updateUserPopup();
  }

  const handleProfileUpload = () => {
    inputRef.current.click()
  };
  const handleImageChange = async (event) => {
    setImage(event.target.files[0]);
  };

  const onSubmit = async (data) => {
    if(image) {
      data.profilePicture = image
    }
    await dispatch(updateUser(data));
    await dispatch(getUserInfo());
    handleClosePopUp();
  };

  return (
    userUpdate && (
      <div className="up-user-popup">
        <div className="up-user-container">
          <div className="up-user-heading">
            <p>Update User</p>
          </div>
          <form
            className="up-user-input-fields"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="up-user-img-container">
              <div className="up-user-img-block" onClick={handleProfileUpload}>
                {image ? (
                  <img src={URL.createObjectURL(image)} alt="profile_photo"/>
                ) : (
                  <img
                    src={userDetails?.profilePicture || "./profile-placeholder.jpg"}
                    alt="profile_photo"
                  />
                )}
                <input
                  type="file"
                  ref={inputRef}
                  onChange={handleImageChange}
                  // {...register("profilePicture")}
                />
              </div>
            </div>
            <div className="up-user-input-main">
              <div>
                <div className="up-user-input-field">
                  <label htmlFor="username">User Name</label>
                  <input
                    {...register("username")}
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter User Name"
                  />
                  <p className="up-user-input-error">
                    {errors.username?.message}
                  </p>
                </div>

                <div className="up-user-input-field">
                  <label htmlFor="name">Name</label>
                  <input
                    {...register("name")}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Name"
                  />
                  <p className="up-user-input-error">{errors.name?.message}</p>
                </div>
              </div>

              <div>
                <div className="up-user-input-field">
                  <label htmlFor="email">Email</label>
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter Email"
                  />
                  <p className="up-user-input-error">{errors.email?.message}</p>
                </div>

                <div className="up-user-input-field">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    {...register("bio")}
                    id="bio"
                    name="bio"
                    placeholder="Enter Bio"
                  />
                </div>
              </div>
            </div>
            <div className="up-user-action-container">
              <button type="submit" className="up-user-submitBtn">
                UPDATE
              </button>
              <button
                type="button"
                className="up-user-closeBtn"
                onClick={handleClosePopUp}
              >
                CLOSE
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default UpdateUser;
