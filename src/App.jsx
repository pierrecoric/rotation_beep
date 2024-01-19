import { useState } from 'react'
import './App.css'
import { Creator } from './assets/components/Creator.jsx'
import { Footer } from './assets/components/Footer.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 '>
      <Creator />
      <Creator />
      <Creator />
      <Creator />
      <Creator />
      <Creator />
      <Creator />
      <Creator />
      <Creator />
      <Creator />
      <Creator />
      <Creator />
      <Creator />
      <Creator />
      <Creator />
      <Creator />
      <Creator />
      <Creator />
      <Creator />
      <Creator />
      {/* container for the oscillators */}
      <div id="container-oscillators">

      </div>
    </main>
    <Footer />
    </>
  )
}

export default App
