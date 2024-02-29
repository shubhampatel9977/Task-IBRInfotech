import "./Login.css";
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
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const Login = () => {
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
    const response = await axios.post("http://localhost:8080/api/auth/login", data);

    if (response.data.status === 200) {
      localStorage.setItem("IBR-token", JSON.stringify(response.data.token));
      navigate("/home");
    } else {
      toast(response.data.message);
    }
  };

  const redirectSignUp = () => {
    navigate("/");
  };
  return (
    <>
      <div className="login-container-body">
        <div className="login-container">
          <div className="login-heading">
            <p>Log In</p>
          </div>
          <form className="login-input-fields" onSubmit={handleSubmit(onSubmit)}>
            <div className="login-input-field">
              <label htmlFor="email">Email</label>
              <input
                {...register("email")}
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
              />
              <p className="login-input-error">{errors.email?.message}</p>
            </div>

            <div className="login-input-field">
              <label htmlFor="password">Password</label>
              <input
                {...register("password")}
                type="password"
                id="password"
                name="password"
                placeholder="********"
              />
              <p className="login-input-error">{errors.password?.message}</p>
            </div>

            <div className="login-action-container">
              <button type="submit" className="login-submitBtn">
                LOG IN
              </button>
              <button type="button" onClick={redirectSignUp}>
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
