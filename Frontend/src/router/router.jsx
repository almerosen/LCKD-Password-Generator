import { createBrowserRouter } from "react-router-dom"
import { SignupPage } from "../../src/pages/signupPage/SignupPage"
import { LoginPage } from "../pages/loginPage/loginPage"
import { NewLCKDPage } from "../pages/NewLCKDPage/NewLCKDPage"

export const router = createBrowserRouter([
    {
        path: "/signup",
        element: <SignupPage />
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/newLCKD",
        element: <NewLCKDPage />
    }
])

