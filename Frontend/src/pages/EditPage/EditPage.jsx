import "./EditPage.css"
import { Header } from "../../components/Header/Header"
import { useEffect, useState } from "react"
import { sendError } from "../../../../Backend/utils/responses"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const EditPage = () => {
    const navigate = useNavigate()
    const { website } = useParams()
    const token = localStorage.getItem("token")
    const baseUrl = import.meta.env.VITE_BASE_URL
    const [credential, setCredential] = useState({})

    const [websiteAddress, setWebsiteAddress] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const getCredential = async () => {
        try {
            const response = await fetch(`${baseUrl}/credentials/${website}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            console.log("Response:", response)

            if (!response.ok) {
                const errorText = await response.text()
                console.error("Error response:", errorText)
                throw new Error(`Response status:, ${response.status}`)
            }

            const data = await response.json()
            console.log("Received data:", data)
            setCredential(data.credential)
            setWebsiteAddress(data.credential.website)
            setUsername(data.credential.username)
            setPassword(data.credential.securePassword)

        } catch(error) {
            console.error("Error:", error)
        }
    }
    
    useEffect(() => {
        getCredential()
    }, [website])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("website:", websiteAddress)
        console.log("username:", username)
        console.log("password:", password)

        try {
            const response = await fetch(`${baseUrl}/credentials/${websiteAddress}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })

            if (!response.ok) {
                throw new Error (`Response status: ${response.status}`)
            }

            const data = await response.json()
            console.log("response data:", data)

            navigate("/passwords")
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <div className="editPage-wrapper">
            < Header />

            <section style={{padding: "30px"}}>
                <h1 className="title-text">edit your credentials</h1>
            </section>
            
        
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="label-text">www</label>
                    <input
                        type="text"
                        className="input-field"
                        value={websiteAddress}
                        onChange={(e) => setWebsiteAddress(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="label-text">username</label>
                    <input 
                        type="text"
                        className="input-field"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="label-text">secure password</label>
                    <input   
                        type="text"
                        className="input-field"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-button">Update Credential</button>
            </form>
        </div>
    )
}