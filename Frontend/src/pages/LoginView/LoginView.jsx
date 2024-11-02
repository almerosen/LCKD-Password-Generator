import "./LoginPage.css"
import axios from 'axios';
import { useForm } from "react-hook-form";
import logo from "../../assets/logo.svg"
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const LoginPage = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL
    console.log(import.meta.env)
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors }} = useForm()

    const handleLogin = async (data) => {
        console.log(data)

        try {
            const response = await axios.post(`${baseUrl}/login`, {
                username: data.username,
                password: data.password
            })

            console.log("Response data:", response.data)

            if (response.data && response.data.token) {
                localStorage.setItem("token", response.data.token)

                navigate("/newLCKD")
            }

        } catch (error) {
            console.error("Error:", error.response.data)
            setErrorMessage(error.response.data.message)
        }
    }

    return (
        <div className="loginPage-container">
            <div className="signUp-container">
                <Link to={"/"} className="signup-link">Sign up</Link>
            </div>

            <section className="logo-container">
                <div className="img-container">
                     <img src={logo} alt="logo" className="img"/>
                </div>
                <h1 className="title">LCKD</h1>
                <p className="text">KEEPING YOUR PASSWORDS SAFE</p>
            </section>

            {errorMessage && <div className="text-danger errormessage" >{errorMessage}</div>}

            <form onSubmit={handleSubmit(handleLogin)}>
                <div className="form-group">
                    <label>Username</label>
                    <input {...register("username", {required: "Username is required"} )} className="input-field" />  
                    <small className="text-danger">
                        {errors?.username && errors.username.message}
                    </small>
                </div> 
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        {...register("password", {required: "Password is required"} )} 
                        className="input-field"
                    />
                    <small className="text-danger">
                        {errors?.password && errors.password.message}
                    </small>
                </div>
                <button className="submit-button">LET ME IN</button>   
            </form>            
        </div>
    )
}