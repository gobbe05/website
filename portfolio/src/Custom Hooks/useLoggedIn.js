import React from "react";

/* GetUsers checks if there is a value stored in {key}
if it is RETURN localStorage value

If not RETURN the initial value
*/

function GetUsers(key, initialValue) {
    const savedValue = JSON.parse(localStorage.getItem(key)) 

    if(savedValue) return savedValue

    if(initialValue instanceof Function) return initialValue()
     return initialValue
}

/* useActiveUser updates a state and syncs it to the localStorage.
This makes its state usable from everywhere. By accessing this custom hook.

RETURNS [activeUser, setActiveUser]
 */

export default function useLoggedIn(key, initialValue) {
   
    const [usernameList, setUsernameList] = React.useState(() => {
        return GetUsers(key, initialValue)
    })

    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(usernameList))
    }, [usernameList])

    return [usernameList, setUsernameList]
}