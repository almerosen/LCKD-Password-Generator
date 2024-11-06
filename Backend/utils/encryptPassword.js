import CryptoJS from 'crypto-js';

export const encryptPassword = (password) => {
    return CryptoJS.AES.encrypt(password, process.env.ENCRYPT_SECRET_KEY).toString()
}