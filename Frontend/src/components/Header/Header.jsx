import "./Header.css"
import logo from "../../assets/logo.svg"
import { useNavigate } from "react-router-dom"


export const Header = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        if (localStorage.getItem("token")) {
            localStorage.removeItem("token")
            navigate("/login")
        } else {
            navigate("/login")
        }
    }

    return (
        <header>
            <div className="left-side">
                <img src={logo} alt="logo" className="header-logo"/>
                <p>LCKD</p>
            </div>
            <div className="right-side">
                <p className="logout-text" onClick={handleClick}>{localStorage.getItem("token") ? "Logout" : "Login"}</p>
            </div>
        </header>
    )
}