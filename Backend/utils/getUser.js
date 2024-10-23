import { db } from "../services/db.js"

export const getUser = async (username) => {
    const {Items} = await db.query({
        TableName: "LCKD_Pwd_Gen_UsersTable",
        IndexName: "UsernameIndex",
        KeyConditionExpression: "username = :username",
        ExpressionAttributeValues: {
            ":username": username.toLowerCase()
        }
    })

    if (Items && Items.length > 0) {
        return Items[0]
    }

    return null
}