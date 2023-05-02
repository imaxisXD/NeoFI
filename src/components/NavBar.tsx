import Image from 'next/image'
import { useState } from 'react'
import NavLink from './NavLink'

export default function NavBar() {

    const [toggleHamburger, setToggleHamburger] = useState(false);
    function handleClick() {
        setToggleHamburger(prev => !prev);
    }

    return (
        <>
            <nav className='nav-bar'>
                <Image className='logo' src="logoneo.svg" alt='neofi-logo' width={140} height={44} />
                <div className='nav-link'>
                    <NavLink />
                </div>
                <button className='btn-connect'>Connect Wallet</button>
                <div className="hamburger" onClick={handleClick}>
                    <div className={"line"}></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </nav>
            {toggleHamburger && (<div className="dropdown">
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><button className='btn-dropdown'>Connect Wallet</button></li>
                </ul>
            </div>)}
        </>
    )
}