import "./Signup.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";

const schema = yup
  .object({
    username: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    bio: yup.string(),
  })
  .required();

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const getUser = localStorage.getItem("IBR-token");
    if (getUser) navigate("/home");
  });

  const onSubmit = async (data) => {
    const response = await axios.post(
      "http://localhost:8080/api/auth/register",
      data
    );
    if (response.data.status === 201) {
      toast(response.data.message);
      redirectLogin();
    }
    toast(response.data.message);
  };

  const redirectLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="signup-container-body">
        <div className="signup-container">
          <div className="signup-heading">
            <p>Sign Up</p>
          </div>
          <form className="signup-input-fields" onSubmit={handleSubmit(onSubmit)}>
            <div className="signup-input-field">
              <label htmlFor="username">User Name</label>
              <input
                {...register("username")}
                type="text"
                id="username"
                name="username"
                placeholder="Enter User Name"
              />
              <p className="signup-input-error">{errors.username?.message}</p>
            </div>

            <div className="signup-input-field">
              <label htmlFor="name">Name</label>
              <input
                {...register("name")}
                type="text"
                id="name"
                name="name"
                placeholder="Enter Name"
              />
              <p className="signup-input-error">{errors.name?.message}</p>
            </div>

            <div className="signup-input-field">
              <label htmlFor="email">Email</label>
              <input
                {...register("email")}
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
              />
              <p className="signup-input-error">{errors.email?.message}</p>
            </div>

            <div className="signup-input-field">
              <label htmlFor="password">Password</label>
              <input
                {...register("password")}
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
              />
              <p className="signup-input-error">{errors.password?.message}</p>
            </div>

            <div className="signup-input-field">
              <label htmlFor="bio">Bio</label>
              <textarea
                {...register("bio")}
                id="bio"
                name="bio"
                placeholder="Enter Bio"
              />
            </div>

            <div className="signup-action-container">
              <button type="submit" className="signup-submitBtn">
                SIGN UP
              </button>
              <button
                type="button"
                onClick={redirectLogin}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
