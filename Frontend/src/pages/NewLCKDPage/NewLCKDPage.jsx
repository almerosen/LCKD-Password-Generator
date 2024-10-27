import "./NewLCKDPage.css"
import axios from 'axios';
import { useForm } from "react-hook-form";
import generator from 'generate-password'; 
import { GeneratePassword } from "js-generate-password";
import genPasImg from "../../assets/genPasImg.svg"



import logo from "../../assets/logo.svg"

export const NewLCKDPage = () => {
    const { register, handleSubmit, setValue, formState: { errors }} = useForm()

    const generatePassword = () => {
        const newPassword = GeneratePassword({
            length: 10,
            symbols:true
        })
        setValue("securePassword", newPassword)
    }
    // const password = GeneratePassword({
    //     length: 10,
    //     symbols: true
    // })
    // console.log("Password", password)

    const handleSubmitCredentials = (data) => {
        console.log(data)
    }

    return (
        <div className="newLCKDPage-container">
            <header>
                <img src={logo} alt="logo" style={{height: "32px"}}/>
                <p>LCKD</p>
            </header>

            <h1 className="title-text">NEW SECURE CREDENTIALS</h1>

            <form onSubmit={handleSubmit(handleSubmitCredentials)}>
                <div className="form-group">
                    <label className="label-text">www</label>
                    <input 
                        {...register("www", {required: "Adress is required"})}
                        className="input-field"
                    />
                    <small className="text-danger">
                        {errors.www && errors.www.message}
                    </small>
                </div>

                <div className="form-group">
                    <label className="label-text">username</label>
                    <input
                        {...register("username", {required: "Username is required"})}
                        className="input-field"
                    />
                    <small className="text-danger">
                        {errors?.username && errors.username.message}
                    </small>
                </div>

                <div className="form-group" style={{ position: "relative" }}>
                    <label className="label-text">secure password</label>
                    <input 
                        {...register("securePassword", {required: "Passoword is required"})}
                        className="input-field genPassword"
                        defaultValue="" 
                    />
                    <img 
                        src={genPasImg}
                        alt="Generate password"
                        onClick={generatePassword}
                        className="generatePassword-image"
                    />
            

                    <small>
                        {errors?.securepassword && errors.securepassword.message}
                    </small>
                </div>

                <button className="submit-button">CREATE LCKD</button>
            </form>
    


        </div>

    )
}