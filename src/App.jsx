import React, { createContext, useContext, useState } from "react";
import './App.css'
import { Osc } from './assets/components/Osc.jsx'
import { Footer } from './assets/components/Footer.jsx'


function App() {
  const [count, setCount] = useState(0)
  const [oscillatorsComponent, setOscillatorsComponent] = useState([]);

  // Function to add a new Osc component
  const addOscillatorComponent = () => {    
    setOscillatorsComponent((prevOscillators) => [
    ...prevOscillators,
    <Osc key={count}/>
  ]);
  setCount((prevCount) => prevCount + 1);
  };

  // Function to remove the last Oscillator component
  const removeComponent = () => {
    setOscillatorsComponent((prevOscillators) => {
      // Make sure there's at least one component before removing
      if (prevOscillators.length > 0) {
        const updatedOscillators = [...prevOscillators];
        // Remove the last element
        updatedOscillators.pop(); 
        return updatedOscillators;
      }
      return prevOscillators;
    });
  };


  return (
    <>
      <main className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 '>
        {oscillatorsComponent}
        <button onClick={addOscillatorComponent}>Add Oscillator</button>
      </main>
      
      <Footer />
    </>
  );
}

export default App;







// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create a context for the AudioContext
export const GeneralAudioContext = createContext(audioContext);

// Create a provider component that provides the AudioContext to its children
export const GeneralAudioProvider = ({ children }) => {
  return (
    <GeneralAudioContext.Provider value={audioContext}>
      {children}
    </GeneralAudioContext.Provider>
  );
};

// Custom hook to easily access the AudioContext in your components
export const useGeneralAudioContext = () => {
  const context = useContext(GeneralAudioContext);
  if (!context) {
    throw new Error("useGeneralAudioContext must be used within a GeneralAudioProvider");
  }
  return context;
};
