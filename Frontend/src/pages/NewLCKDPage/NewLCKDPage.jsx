import "./NewLCKDPage.css"
import logo from "../../assets/logo.svg"

export const NewLCKDPage = () => {
    return (
        <div className="newLCKDPage-container">
            <header>
                <img src={logo} alt="logo" style={{height: "32px"}}/>
                <p>LCKD</p>
            </header>

            <h1 className="title-text">NEW SECURE CREDENTIALS</h1>
        </div>

    )
}