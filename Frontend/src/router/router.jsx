import { createBrowserRouter } from "react-router-dom"
import { SignupPage } from "../../src/pages/signupPage/SignupPage"

export const router = createBrowserRouter([
    {
        path: "/signup",
        element: <SignupPage />
    }
])

