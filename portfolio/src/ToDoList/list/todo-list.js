import React from 'react'
import '../../CSS/todo-list.css'
import AddTodoItem from '../add-todo/add-todo-item'
import useLoggedIn from '../../Custom Hooks/useLoggedIn'
import useActiveUser from '../../Custom Hooks/useActiveUser'

/* 
The todolist handles all the logic and rendering for the todolist.

RETURNS JSX code for the todolist
*/

export default function Todolist(props) {
    const [ulItems, setUlItems] = React.useState([])
    const [todolist, setTodolist] = React.useState([])
    const [addItem, setAddItem] = React.useState(false)
    const [usernameList, setUsernameList] = useLoggedIn('test', '')
    const [activerUser, setActiveUser] = useActiveUser('activeUser', 0) /*Activeuser access an indexed item in an array 
    on your localStorage */ 
    const [prevUser, setPrevUser] = useLoggedIn('prevUser', 0) //Keeps the user logged in

    /*Loads in the users todo list itemss 
    
    ///WORK NEEDED/// - Needs to be updated when activeUser changes
    */
    React.useEffect(() => {
        if(localStorage.getItem('test')[activerUser]) {
            let temp = (JSON.parse(localStorage.getItem('test')))
            setUlItems(temp[activerUser].todolist)
            
        }
    }, [])

    /*
    
    Modifies users todo list by creating a temporary variable containing the user list
    modifies the temp variable and then puts back the temp variable.
    
    */

    React.useEffect(() => {
        saveTodoList()
        console.log('triggered')
    }, [ulItems])

    function saveTodoList() {
        let tempUsernameArray = usernameList
        tempUsernameArray[activerUser].todolist = ulItems
        setUsernameList(tempUsernameArray)
        localStorage.setItem('test', JSON.stringify(usernameList))
    }

    function removeItem(index) {
        let todolist
                                    
        todolist = ulItems
        delete todolist[index]
        
        setUlItems([...todolist])
        saveTodoList()
    }

    //NEEDS TO FIX ACTIVE USER
    //1. take active user and modify. 2. Create temp variable 3. modify temp. 4. modify usernameList array

    return (
        <>
        <AddTodoItem setAddItem={setAddItem} addItem={addItem} setUlItems={setUlItems} ulItems={ulItems}/>

        <div id="todolist-container" className={"todolist-container"}>
            <div className={"inner-container"}>
                <div className={"todo-header"}>
                    <h3 onClick={() => {
                        //This part loggs the user out and activates the guest account.  
                        //Needs a log out button.
                        setPrevUser(0)
                        setActiveUser(0)
                        window.location.reload()
                        
                    }}>{usernameList[activerUser].username}</h3> <h1>To-Do List</h1> <div className={"plus-container"}><h2 onClick={() => setAddItem(true)}>+</h2></div>
                </div>

                <ul>
                    {
                        ulItems.map((value, index) => {
                            
                            if(value == null) {
                                return null
                            }
                            else {
                                return (
                                    <><li key={value}>{value} {index}</li><button onClick={() => removeItem(index)}></button></>
                                )
                            }
                        })
                    }
                </ul>
            </div>
        </div>
        </>
    )
}