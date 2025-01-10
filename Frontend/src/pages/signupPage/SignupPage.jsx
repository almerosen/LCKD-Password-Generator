import "./SignupPage.css";
import logo from "../../assets/logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";

export const SignupPage = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(`${baseUrl}/signup`, {
        username: data.username,
        password: data.password,
      });

      console.log("Response data:", response.data);

      if (response.data) {
        alert("User created");
        navigate("/passwords");
      }
    } catch (error) {
      console.error("Error register", error.response.data);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  const registerOptions = {
    name: {
      required: "Username is required",
      minLength: {
        value: 2,
        message: "Username must have at least 2 characters",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must have at least 6 characters",
      },
    },
  };

  return (
    <div className="signupPage-container">
      <div className="login-container">
        <Link to={"/login"} className="login-link">
          Login
        </Link>
      </div>

      <section className="logo-container">
        <div className="img-container">
          <img src={logo} alt="logo" className="img" />
        </div>
        <h1 className="title">LCKD</h1>
        <p className="text">KEEPING YOUR PASSWORDS SAFE</p>
      </section>

      {errorMessage && (
        <div className="text-danger errormessage">{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit(handleRegistration)}>
        <div className="form-group">
          <label>Username</label>
          <input
            {...register("username", registerOptions.name)}
            className="input-field"
          />
          <small className="text-danger">
            {errors?.username && errors.username.message}
          </small>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            {...register("password", registerOptions.password)}
            className="input-field"
          />
          <small className="text-danger">
            {errors?.password && errors.password.message}
          </small>
        </div>
        <Button buttonText={"SIGN UP"} />
      </form>
    </div>
  );
};
