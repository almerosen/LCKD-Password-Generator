import { createBrowserRouter } from "react-router-dom"
import { SignupPage } from "../../src/pages/signupPage/SignupPage"
import { NewLCKDPage } from "../pages/NewLCKDPage/NewLCKDPage"
import { LoginPage } from "../pages/LoginView/LoginView"
import { StoredPasswordsPage } from "../pages/StoredPasswordsPage/StoredPasswordsPage"
import { EditPage } from "../pages/EditPage/EditPage"

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
    },
    {
        path: "/passwords",
        element: < StoredPasswordsPage />
    },
    {
        path: "/:website/update",
        element: < EditPage />
    }
])

