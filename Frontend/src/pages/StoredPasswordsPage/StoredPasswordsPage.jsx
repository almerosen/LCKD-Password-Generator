import "./StoredPasswordsPage.css"
import logo from "../../assets/logo.svg"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { CredentialsComponent } from "../../components/credentialsComponent/credentialsComponent"


export const StoredPasswordsPage = () => {
    const token = localStorage.getItem("token")
    const baseUrl = import.meta.env.VITE_BASE_URL
    const navigate = useNavigate()
    const [loading, setIsLoading] = useState(true)
    const [activeIndex, setActiveIndex] = useState(null)
    const [credentials, setCredentials] = useState([])
    const [selectedPassword, setSelectedPassword] = useState(null)

    const getCredentials = async() => {
        try {
            const response = await fetch(`${baseUrl}/credentials`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })

            if (!response.ok) {
                throw new Error(`Response status:, ${response.status}`)
            }

            const data = await response.json()
            console.log("Recieved data:", data)
            setCredentials(data)
        } catch (error) {
            console.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getCredentials()
    }, [])

    const handleShowPassword = (password, index) => {
        setSelectedPassword(password)
        setActiveIndex(index)
    }

    return (
        <div className="storedPasswordsPage-container">
             <header>
                <img src={logo} alt="logo" style={{height: "32px"}}/>
                <p>LCKD</p>
            </header>

            <main>
                <div className="storedPasswords">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul>
                            {credentials.map((cred, index) => (
                                <li key={index}>
                                    <CredentialsComponent 
                                        item={cred} 
                                        onShowPassword={() => handleShowPassword(cred.securePassword, index)}
                                        isActive={activeIndex === index}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>

            <section style={{padding: "30px"}}>
                {selectedPassword && (
                    <div className="showPassword-container"
                        style={{padding: "20px", border: "1px solid white", marginTop: "10px", borderRadius: "5px" }}>
                        <p>{selectedPassword}</p>
                    </div>
                )}
            </section>

            <footer>
                <button className="new-button" onClick={() => navigate("/newLCKD")}>new lckd</button>
            </footer>

        </div>
    )
}