import { verifyToken } from "../../../middleware/verifyToken.js"
import { db } from "../../../services/db.js"
import { sendError, sendResponse } from "../../../utils/responses.js"
import CryptoJS from 'crypto-js';
import middy from '@middy/core'
import { v4 as uuidv4 } from 'uuid';
import { encryptPassword } from "../../../utils/encryptPassword.js";


 const createNewCredentials = async (event) => {
    console.log(event)

    try {
        const { website, username, securePassword } = JSON.parse(event.body)

        if (!website || !username || !securePassword) {
            return sendError(400, { success: false, message: "All fields required" })
        }

        const { userId } = event.user

        const encryptedPassword = encryptPassword(securePassword)

        await db.put({
            TableName: "LCKD_Pwd_Gen__PasswordsTable",
            Item: {
                userId,
                website,
                username,
                securePassword: encryptedPassword
            }
        }) 
        
        return sendResponse(200, { success: true })

    } catch (error) {
        console.error("Error:", error)
        const errorMessage = error.response?.data?.message || "An unexpected server error occurred."

        return sendError(500, { message: "Error", error: errorMessage })
    }
}

export const handler = middy()
    .use(verifyToken)
    .handler(createNewCredentials)