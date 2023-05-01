import Card from '../components/Card'
import NavBar from '../components/NavBar'
import Head from 'next/head'


export default function Home() {
  return (
    <>
      <Head>
        <title>Abhishek Assignment</title>
        <meta name="description" content="Abhishek assignment neofi" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;600&display=swap" rel="stylesheet"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main >
        <div className="center-container">
          <Card />
        </div>
      </main>
    </>
  )
}
