import React from 'react'
import './CSS/header.css'

/* The header function is just JSX code of the Header component. It handles the header
and its items.
 */

function Header() {

    return (
        <div id="header-container">
            <div className={"header-navigation"}>
                <ul>
                    <li><a href="./home">Home</a></li>
                    <li><a href="./portfolio">Portfolio</a></li>
                    <li><a href="./login">Login</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Header