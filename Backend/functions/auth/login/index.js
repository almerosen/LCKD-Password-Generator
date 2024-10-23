import { getUser } from "../../../utils/getUser.js"
import { comparePassword } from "../../../utils/comparePassword.js"
import { sendError, sendResponse } from "../../../utils/responses.js"
import jwt from 'jsonwebtoken'

export const handler = async (event) => {
    console.log(event)

    try {
        const { username, password } = JSON.parse(event.body)

        if (!username || !password) {
            return sendError(400, { message: "Please provide both username and password" })
        }

        // Check if username exists
        const user = await getUser(username)

        if (!user) {
            return sendError(400, { message: "Username does not exist" })
        }

        // Compare passwords
        const passwordMatch = comparePassword(user, password)

        if (!passwordMatch) {
            return sendError(401, { message: "Password do not match" })
        }

        // Generate token
        const token = jwt.sign({ userId: user.userId, username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
        
        return sendResponse(200, { message: "Login successful", token })

    } catch (error) {
        console.error("Error:", error)
        return sendError(500, { message: "Failed to login" })
    }
}