import { db } from "../../../services/db.js";
import middy from "@middy/core";
import CryptoJS from 'crypto-js';
import { sendError, sendResponse } from "../../../utils/responses.js";
import { verifyToken } from "../../../middleware/verifyToken.js";

const encrypt = (password) => {
    return CryptoJS.AES.encrypt(password, process.env.ENCRYPT_SECRET_KEY).toString();
}

const updateCredential = async (event) => {
    console.log(event) 

    try {

        const { userId } = event.user
        const { website } = event.pathParameters

        const { username, password } = JSON.parse(event.body)

        let updateExpression = []
        const ExpressionAttributeValues = {}

        if (username) {
            updateExpression.push("username = :username")
            ExpressionAttributeValues[":username"] = username
        }

        if (password) {
            const encryptedPassword = encrypt(password)
            updateExpression.push("securePassword = :securePassword")
            ExpressionAttributeValues[":securePassword"] = encryptedPassword
        }

        if (updateExpression.length === 0) {
            return sendError(400, { success: false, message: "No fields to update"})
        }

        // Update usernamre and/or password:
        const updateItem = await db.update({
            TableName: "LCKD_Pwd_Gen__PasswordsTable",
            Key: { userId, website },
            UpdateExpression: `SET ${updateExpression.join(", ")}`,
            ExpressionAttributeValues: ExpressionAttributeValues,
            ReturnValues: "ALL_NEW"
        })

        const updatedItem = updateItem.Attributes

        return sendResponse(200, { success: true, updatedItem })



    } catch (error) {
        console.error("Error:", error)
        return sendError(500, { message: "Failed to update credential" })
    }
}

export const handler = middy()
    .use(verifyToken)
    .handler(updateCredential)