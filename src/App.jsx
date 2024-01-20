import { useState } from 'react'
import './App.css'
import { Creator } from './assets/components/Creator.jsx'
import { Osc } from './assets/components/Osc.jsx'
import { Footer } from './assets/components/Footer.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [oscillators, setOscillators] = useState([])

  // Function to add a new Osc component
  const addOscillator = () => {
    setOscillators((prevOscillators) => [
      ...prevOscillators,
      <Osc key={count} freq="440" fo="2" re="5" />,
    ]);
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <main className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 '>
        {oscillators.map((oscillator) => oscillator)}
      </main>
      <button onClick={addOscillator}>Add Oscillator</button>
      <Footer />
    </>
  );
}

export default App;
