import { verifyToken } from "../../../middleware/verifyToken.js";
import { db } from "../../../services/db.js";
import { sendError, sendResponse } from "../../../utils/responses.js";
import middy from "@middy/core";


const getCredentialByUserIdAndWebsite = async (event) => {
    console.log(event)

    try {
        const { userId } = event.user
        const { website } = event.pathParameters

        const { Item } = await db.get({
            TableName: "LCKD_Pwd_Gen__PasswordsTable",
            Key: { userId, website }
        })

        if (!Item) {
            return sendError(400, { message: "No credential found" })
        }

        return sendResponse(200, { success: true, credential: Item })
    } catch (error) {
        console.error("Error:", error)
        return sendError(500, { message: "Failed to get credentials" })
    }
}

export const handler = middy()
    .use(verifyToken)
    .handler(getCredentialByUserIdAndWebsite)