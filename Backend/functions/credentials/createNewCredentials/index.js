import { verifyToken } from "../../../middleware/verifyToken.js"
import { db } from "../../../services/db.js"
import { sendError, sendResponse } from "../../../utils/responses.js"
import CryptoJS from 'crypto-js';
import middy from '@middy/core'

 const createNewCredentials = async (event) => {
    console.log(event)

    const encrypt = (text) => {
        return CryptoJS.AES.encrypt(text, process.env.ENCRYPT_SECRET_KEY).toString()
    }

    try {
        const { address, username, securePassword } = JSON.parse(event.body)

        if (!address || !username || !securePassword) {
            return sendError(400, { success: false, message: "All fields required" })
        }

        const { userId } = event.user

        const encryptedPassword = encrypt(securePassword)

        await db.put({
            TableName: "LCKD_Pwd_Gen__PasswordsTable",
            Item: {
                userId,
                website: address,
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