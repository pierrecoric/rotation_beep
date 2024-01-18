import { useState } from 'react'
import './App.css'
import { Creator } from './assets/components/Creator.jsx'
import { Footer } from './assets/components/Footer.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main>
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
