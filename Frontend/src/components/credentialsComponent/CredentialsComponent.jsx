import "./credentialsComponent.css"
import eye from "../../assets/eye.svg"
import edit from "../../assets/edit.svg"
import eyeActive from "../../assets/eye-outline.svg"

export const CredentialsComponent = ({item, onShowPassword, isActive}) => {
    return (
        <div className={`container ${isActive ? "active" : ""}`}>
            <div className="website-container">
                <p className={`password-text ${isActive ? "active" : ""}`}>{item.website}</p>
            </div>
           
         
            <div className={`eye-container ${isActive ? "active" : ""}`}>
                {isActive && <img src={edit} /> }
                
                {isActive ? (
                    <img src={eyeActive} onClick={() => onShowPassword(item.securePassword)} />
                ) : (
                    <img src={eye} onClick={() => onShowPassword(item.securePassword)}/>

                )}
            </div>
            
            
        </div>
    )
}