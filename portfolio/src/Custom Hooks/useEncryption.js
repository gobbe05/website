import React from "react"
import CryptoJS from 'crypto-js' 

export default function useEncryption(value) {
    var data = value
    var encryptedValue = CryptoJS.AES.encrypt(data, '123').toString()

    React.useEffect(() => {
        encryptedValue = CryptoJS.AES.encrypt(data, '123').toString()
    }, [value])

    return encryptedValue
}