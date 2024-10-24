import { createBrowserRouter } from "react-router-dom"
import { SignupPage } from "../../src/pages/signupPage/SignupPage"
import { NewLCKDPage } from "../pages/NewLCKDPage/NewLCKDPage"
import { LoginPage } from "../pages/LoginView/LoginView"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <SignupPage />
    },
    {
        path: "/login",
        element: <  LoginPage />
    },
    {
        path: "/newLCKD",
        element: < NewLCKDPage/>
    }
])

