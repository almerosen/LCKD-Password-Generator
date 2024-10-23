import CryptoJS from 'crypto-js';

export const comparePassword = (user, password) => {
    const decryptedPasswordBytes = CryptoJS.AES.decrypt(user.encryptedPassword, process.env.JWT_SECRET_KEY)
    const decryptedPassword = decryptedPasswordBytes.toString(CryptoJS.enc.Utf8)

    return decryptedPassword === password
}