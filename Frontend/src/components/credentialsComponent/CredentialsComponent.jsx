import "./credentialsComponent.css"
import eye from "../../assets/eye.svg"

export const CredentialsComponent = ({item, onShowPassword}) => {
    return (
        <div className="container">
            <div className="website-container">
                <p>{item.website}</p>
            </div>
            <div className="eye-container">
                <img src={eye} onClick={() => onShowPassword(item.securePassword)}/>
            </div>
        </div>
    )
}