import { db } from "../../../services/db.js"
import { v4 as uuidv4 } from 'uuid';
import { getUser } from "../../../utils/getUser.js"
import { sendResponse, sendError } from "../../../utils/responses.js"
import CryptoJS from 'crypto-js';


export const handler = async (event) => {
    console.log(event)

    try {
        const { username, password } = JSON.parse(event.body)

        if (!username || !password) {
            return sendError(400, { message: "Please provide both username and password"})
        }

        const checkIfUserExists = await getUser(username)

        if (checkIfUserExists) {
            return sendError(400, { message: "Username already exists" })
        }

        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.JWT_SECRET_KEY).toString()

        const user = {
            userId: uuidv4(),
            username,
            encryptedPassword,
        }

        await db.put({
            TableName: "LCKD_Pwd_Gen_UsersTable",
            Item: user
        })

        return sendResponse(200, { message: "User created" })

    } catch (error) {
        console.error("Error:", error)
        return sendError(500, { message: "Failed to create user", error: error.message })
    }
}