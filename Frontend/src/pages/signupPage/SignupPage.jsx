import "./SignupPage.css"
import logo from "../../assets/logo.svg"
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useState } from "react";


export const SignupPage = () => {
    const [errorMessage, setErrorMessage] = useState("")

    const { register, handleSubmit, formState: { errors }} = useForm()

    const handleRegistration = async (data) => {
        console.log(data)
        try {
            const response = await axios.post("https://rcyguaq7ui.execute-api.eu-north-1.amazonaws.com/signup", {
                username: data.username,
                password: data.password
            })

            console.log("Response data:", response.data)
        } catch (error) {
            console.error("Error register", error.response.data)
            if (error.response) {
                setErrorMessage(error.response.data.message)
            }
        } 
    }

    const registerOptions = {
        name: { 
            required: "Username is required",
            minLength: {
                value: 2,
                message: "Username must have at least 2 characters"
            }
        },
        password: {
            required: "Password is required",
            minLength: {
                value: 6,
                message: "Password must have at least 6 characters"
            }
        }
    }

    return (
        <div className="signupPage-container">
            <div className="login-container">Login</div>

            <section className="logo-container">
                <div className="img-container">
                     <img src={logo} alt="logo" className="img"/>
                </div>
                <h1 className="title">LCKD</h1>
                <p className="text">KEEPING YOUR PASSWORDS SAFE</p>
            </section>

            {errorMessage && <div className="text-danger errormessage" >{errorMessage}</div>}

            <form onSubmit={handleSubmit(handleRegistration)}>
                <div className="form-group">
                    <label>Username</label>
                    <input {...register("username", registerOptions.name )} className="input-field" />  
                    <small className="text-danger">
                        {errors?.username && errors.username.message}
                    </small>
                </div> 
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        {...register("password", registerOptions.password )} 
                        className="input-field"
                    />
                    <small className="text-danger">
                        {errors?.password && errors.password.message}
                    </small>
                </div>
                <button className="submit-button">SIGN UP</button>   
            </form>            
        </div>
    )
}