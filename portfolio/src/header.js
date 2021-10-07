import React from 'react'
import './CSS/header.css'

function Header() {

    return (
        <div id="header-container">
            <div className={"header-navigation"}>
                <ul>
                    <li><a href="./home">Home</a></li>
                    <li><a href="./portfolio">Portfolio</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Header