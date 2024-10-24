
export const sendResponse = (code, message) => {
    return {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Origin": "http://lckd-password-generator-bucket-prod.s3-website.eu-north-1.amazonaws.com",
            "Access-Control-Allow-Headers": "Content-Type",  
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", 
        },
        body: JSON.stringify(message)
    }
}

export const sendError = (code, message) => {
    return {
        statusCode: code,
        headers: {
            "Access-Control-Allow-Origin": "http://lckd-password-generator-bucket-prod.s3-website.eu-north-1.amazonaws.com",  
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        },
        body: JSON.stringify(message)
    }
}