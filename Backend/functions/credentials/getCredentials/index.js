import { verifyToken } from "../../../middleware/verifyToken.js";
import { db } from "../../../services/db.js";
import { sendError, sendResponse } from "../../../utils/responses.js";
import CryptoJS from 'crypto-js';
import middy from '@middy/core'


const getCredentials = async (event) => {
    console.log(event)

    const decrypt = (text) => {
        const bytes = CryptoJS.AES.decrypt(text, process.env.ENCRYPT_SECRET_KEY)
        return bytes.toString(CryptoJS.enc.Utf8)
    }

    try {
        const { userId } = event.user

        const { Items } = await db.query({
            TableName: "LCKD_Pwd_Gen__PasswordsTable",
            KeyConditionExpression:  "userId = :userId" ,
            ExpressionAttributeValues: {
                ":userId": userId
            }
        })

        if (Items.length === 0) {
            return sendError(200, { message: "User does not have any credentials stored" })
        }

        const decryptedItems = Items.map(item => ({
            ...item,
            securePassword: decrypt(item.securePassword)
        }))

        return sendResponse(200, decryptedItems)
    } catch (error) {
        console.error("Error", error)
        return sendError(500, { message: "Failed to get credentials"})
    }
}

export const handler = middy()
    .use(verifyToken)
    .handler(getCredentials)