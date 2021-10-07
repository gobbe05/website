import React, { useEffect } from 'react'
import './forms.css'
import SignUp from './signup'
import CryptoJS from 'crypto-js'

/*Component handles the login section. Works together with the <Signup />
component to handle storing passwords/usernames. 
Data gets encrypted when saved to localStorage in the <Signup /> component. When the data is loaded it gets
decrypted before usage.


RETURNS jsx code to the login section
PROPERTIES include loggedIn 

/// WORK IN PROGRESS ///
--DONE-- Component and sign up needs to get more safe using encryption. 
*/

export default function Login(props) {
    
    const [username, setUsername] = React.useState([]) //Username includes an array with all the stored passwords.
    const [inputfieldUsername, setinputfieldUsername] = React.useState('')
    const [inputfieldPassword, setinputfieldPassword] = React.useState('')
    const [loginpageActive, setLoginpageActive] = React.useState(true)
    const [signUpActive, setSignUpActive] = React.useState(false)
    const [credentialsValid, setCredentialsValid] = React.useState(false)
    

    React.useEffect(() => {
        let inData //Creates variable
        if(localStorage.getItem('loginData')) { 
            inData = localStorage.getItem("loginData") //Defines data
            var bytes = CryptoJS.AES.decrypt(inData, '123') //Decrypts data
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) //Parses JSON data and converts data to string
            setUsername(decryptedData)
        }
    }, [])

    /* 
    The function goes through all the loginData items and checks if the 
    submitted password matches any entries
    */
    function passwordValidation(form) {
        form.preventDefault()
        username.map(item => { //Loops through array of passwords/usernames 
            if(item.username == inputfieldUsername) {
                if(item.password == inputfieldPassword) {
                    setCredentialsValid(true)
                    setTimeout(() => setLoginpageActive(false), 600) //Wait 600 milliseconds
                }
            }
        })
    }

    /* The inputfieldUsername and inputfieldPassword variables is updated every time the 
    input value changes.
    
    RETURNS Login Page jsx code
    */
    if(loginpageActive) {
        return (
            <div className={'login-container'}>
                <div id="container">
                <form>
                    <legend>Name</legend>
                    <input onChange={(e) => setinputfieldUsername(e.target.value)} name="username"></input>
                    <legend>Password</legend>
                    <input type="password" onChange={(e) => setinputfieldPassword(e.target.value)} name="password"></input>
                    <button className={(credentialsValid ? "sign-up-confirmed": "")} onClick={(e) => {
                        passwordValidation(e)
                    }}>Submit</button>
                </form>

                <a href="#" className="change" onClick={() => {
                    setLoginpageActive(false)
                    setSignUpActive(true)
                }}>Don't have an account? Sign Up.</a>
            </div>
            </div>
        )
    }
    /*RETURNS SignUp component and passing username, setUsername, setActive and
    setSignUpActive 
    If log in succeeds return null instead to stop login from showing.
    */
    else if(signUpActive){
        return (<SignUp 
            username={username} 
            setUsername={setUsername} 
            setActive={setLoginpageActive} 
            setSignUpActive={setSignUpActive}/>)
    }
    else {
        props.loggedIn(true)
        return null
    }
}