import React from 'react'
import './CSS/home.css'
import Header from './header'
import Content from './home-content'
import Login from './Forms/login'
import Todolist from './ToDoList/list/todo-list'

import useLoggedIn from './Custom Hooks/useLoggedIn'


class User {
    constructor(username, password, todolist) {
        this.username = username
        this.password = password
        this.todolist = todolist
    }
}

function Home() {

    const [usernameList, setUsernameList] = useLoggedIn('test', [new User('guest', '', ['test', 'test'])])

    return (
        <>
        <Header />
        <div id="page-content">
            <div class="start-content">
            <Content />
            </div>
            <div class="todo-list">
            <Todolist />
            </div>
        </div>
        </>
    )
    
}

export default Home