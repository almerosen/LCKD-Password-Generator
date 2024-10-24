import { db } from "../../../services/db.js"
import { sendError, sendResponse } from "../../../utils/responses"

export const handler = async (event) => {
    console.log(event)

    try {
        const { address, username, password } = JSON.parse(event.body)

        if (!address || !username || !password) {
            return sendError(400, { success: false, message: "All fields required" })
        }

        await db.put({
            TableName: "LCKD_Pwd_Gen__PasswordsTable",
            Item: {
                address,
                username,
                password
            }
        }) 
        
        return sendResponse(200, { success: true })

    } catch (error) {
        console.error("Error:", error)
        sendError(500, { message: "Error", error: error.response.data.message })
    }
}