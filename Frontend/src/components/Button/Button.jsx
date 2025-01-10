import "./Button.css"

export const Button = (props) => {
    const { buttonText } = props
    return (
        <button className="button">{buttonText}</button>
    )
}