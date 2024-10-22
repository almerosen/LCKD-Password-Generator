import { db } from "../services/db.js"

const getUser = async (username) => {
    const {Items} = await db.query({
        TableName: "LCKD_Pwd_Gen_UsersTable",
        IndexName: "usernameIndex",
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