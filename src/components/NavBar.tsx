import Image from 'next/image'
import NavLink from './NavLink'

export default function NavBar() {
    return (
        <nav className='nav-bar'>
            <Image className='logo' src="logoneo.svg" alt='neofi-logo' width={140} height={44} />
            <div>
                <NavLink />
            </div>
            <button className='btn-connect'>Connect Wallet</button>
        </nav>
    )
}