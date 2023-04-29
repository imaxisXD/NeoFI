import Head from 'next/head'

import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import Image from 'next/image'
import NavLink from '@/Component/NavLink'


export default function Home() {
  return (
    <>
      <Head>
        <title>Abhishek Assignment</title>
        <meta name="description" content="Abhishek assignment neofi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className='nav-bar'>
        <Image src="NeoFI" alt='neofi-logo'></Image>
        <div>
          <NavLink />
        </div>
        <button>Connect Wallet</button>
      </nav>
      <main >
        <Image src='Union.svg' alt='div-box' />
      </main>
    </>
  )
}
