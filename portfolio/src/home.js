import React from 'react'
import './CSS/home.css'
import Header from './header'
import Content from './home-content'
import Login from './Forms/login'
import Todolist from './ToDoList/list/todo-list'


function Home() {

    return (
        <>
        <Header />
        <div id="page-content">
            <div class="start-content">
            <Content />
            </div>
            <div class="login-content">
            <Login />
            </div>
            <div class="todo-list">
            <Todolist />
            </div>
        </div>
        </>
    )
    
}

export default Home