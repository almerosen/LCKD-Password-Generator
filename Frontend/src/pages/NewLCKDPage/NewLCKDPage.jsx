import "./NewLCKDPage.css"
import axios from 'axios';
import { useForm } from "react-hook-form";
import generator from 'generate-password'; 
import { GeneratePassword } from "js-generate-password";
import genPasImg from "../../assets/genPasImg.svg"
import { useNavigate } from "react-router-dom";



import logo from "../../assets/logo.svg"

export const NewLCKDPage = () => {
    const baseUrl = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate()

    const token = localStorage.getItem("token")
    const { register, handleSubmit, setValue, formState: { errors }} = useForm()

    const generatePassword = () => {
        const newPassword = GeneratePassword({
            length: 10,
            symbols:true
        })
        setValue("securePassword", newPassword)
    }

    const handleSubmitCredentials = async (data) => {
        console.log(data)

        try {
            const response = await axios.post(`${baseUrl}/credentials`, {
                address: data.address,
                username: data.username,
                securePassword: data.securePassword
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            )
            console.log("Response data:", response.data)

            navigate("/passwords")

        } catch (error) {
            console.error("error:", error)
        }



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
                        {...register("address", {required: "Adress is required"})}
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
                        {errors?.securePassword && errors.securepassword.message}
                    </small>
                </div>

                <button className="submit-button">CREATE LCKD</button>
            </form>
    


        </div>

    )
}