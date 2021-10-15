import React from 'react'
import CryptoJS from 'crypto-js' 
import useLoggedIn from '../Custom Hooks/useLoggedIn'

// Creates the user class

class User {
    constructor(username, password, todolist) {
        this.username = username
        this.password = password
        this.todolist = todolist
    }
}


/* 
This component handles all of the sign up behavior. It validates the password and username. After that 
it stores the values to an array in the login component. Everytime the array changes the setup
function encrypts and saves all of the usernames/passwords in to the localStorage.

PROPERTIES the 

RETURNS JSX code for the <Signup /> component
*/
export default function SignUp(props) {
    const [email, setEmail] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [buttonClass, setButtonClass] = React.useState(false)    
    const [usernameList, setUsernameList] = useLoggedIn('test', '')

    React.useEffect(() => {
        let encryptedData = CryptoJS.AES.encrypt(JSON.stringify(props.username), '123')
        localStorage.setItem('loginData', encryptedData)
    }, [props.username])

    //Handles sign up. Validates password length etc

    function handleSignUp(form) {
        form.preventDefault()
        let temp = new User(username, password, [])


        //Function checks if password includes a number and an uppercase letter
        //Returns an object including booleans
        function checkUpperCase() {
                let tempArr = temp.password.split('')
                let upperCaseLetter, number
                tempArr.map((e) => {
                    //Check for uppercase or number
                    if(e == e.toUpperCase()) {
                        //Check for number else it is a big letter and sets upperCaseLetter to true
                        if(e == e.toLowerCase()) number = true  
                        else upperCaseLetter = true
                    }
                })
            let obj = [upperCaseLetter, number]
            return obj
        }

        /*Checks if the username exists in the database
        
        ACCEPTS username
        RETURNS true or false
        */
        function usernameNotExist(username) {
            let bool = true
            usernameList.map((item) => {
                if(item.username == username) {
                    bool = false
                    console.log('true')
                }
            })
            return bool
        }

        /* This is the validation process using simple if nesting
        Validates username length 
        
        ///WORK NEEDED ///
        Need to find a soloution to prevent the large amount of nesting
        */
        if(temp.username.length > 4) {
            if(temp.password.length > 8) {
                if(checkUpperCase()[0]) {
                    if(usernameNotExist(temp.username)) {
                        if(checkUpperCase()[1]) passWordValid()
                        else alert('Password must include atleast on number and capital letter')
                    }
                    else alert('f!ck')
                }
                else alert('Password must include atleast on number and capital letter')
            }
            else alert('Your password must be atleast 8 characters long')
        }
        else alert('your username must consist of atleast 6 letters')

        
        /*Function checks if the password is valid.
        If the password is balid 
        */
        function passWordValid() {
            props.setUsername(prev => prev.concat(temp)) //Updates array with passwords/usernames
                setUsernameList(prev => prev.concat(temp)) //Updates the Users database
                setButtonClass(true)
                setTimeout(() => {
                props.setActive(true) //Activates login window
                props.setSignUpActive(false) //Removes signup window 
                window.location.reload() //Reloads page
                }, 600) 
        }
    }

//RETURNS jsx code to handle the SignUp sections render

return(
    <div className={'login-container'}>
    <div id="container">
                <form>
                    <legend>E-Mail</legend>
                    <input onChange={(e) => setEmail(e.target.value)} name="email"></input>
                    <legend>Username</legend>
                    <input onChange={(e) => setUsername(e.target.value)} name="username"></input>
                    <legend>Password</legend>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password"></input>
                    <button className={(buttonClass ? "sign-up-confirmed": "")} onClick={(e) => handleSignUp(e)}>Submit</button>
                </form>

                <a href="#" className="change" onClick={() => {
                    props.setActive(true)
                    props.setSignUpActive(false)
                }}>Login!</a>
            </div>
        </div>
            
)
}