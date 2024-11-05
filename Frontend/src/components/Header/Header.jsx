import "./Header.css"
import logo from "../../assets/logo.svg"


export const Header = () => {
    return (
        <header>
            <img src={logo} alt="logo" className="header-logo"/>
            <p>LCKD</p>
        </header>
    )
}