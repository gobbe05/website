import React from 'react'
import CryptoJS from 'crypto-js'
import useEncryption from './useEncryption'

function getSavedValue(key, initialValue) {
    const savedValue = JSON.parse(localStorage.getItem(key))
    
    if(savedValue) return CryptoJS.AES.decrypt(savedValue, '123').toString(CryptoJS.enc.Utf8)

    if(initialValue instanceof Function) return initialValue()
        return initialValue
}

export default function useLocalStorage(key, initialValue) {
    
    const [value, setValue] = React.useState(() => {
        return getSavedValue(key, initialValue)
    })

    let encryptedValue = useEncryption(value)
    
    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(encryptedValue))
    }, [value])

    return [value, setValue]
}