import React, { createContext, useContext, useState } from "react";
import './App.css'
import { Osc } from './assets/components/Osc.jsx'
import { Footer } from './assets/components/Footer.jsx'
import { Creator } from "./assets/components/Creator.jsx";


function App() {
  const [count, setCount] = useState(0)
  const [oscillatorsComponent, setOscillatorsComponent] = useState([]);

  // Function to add a new Osc component
  const addOscillatorComponent = (freq, fo, rt) => {    
    setOscillatorsComponent((prevOscillators) => [
    ...prevOscillators,
    <Osc 
      key={count}
      id={count}
      freq={freq}
      fo={fo}
      rt={rt}
      deleteOscillatorComponent={deleteOscillatorComponent}
      oscillatorsComponent={oscillatorsComponent}
    />
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

  const deleteOscillatorComponent = (id) => {
    // Remove the oscillator at the specified index
    setOscillatorsComponent((prevOscillators) => {
        const updatedOscillators = [...prevOscillators];
        updatedOscillators.splice(id, 1);
        return updatedOscillators;
    });
  }




  return (
    <>
      <main className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 '>
        <Creator addOscillatorComponent={addOscillatorComponent}/>
        {oscillatorsComponent} 
      </main>
      <div className="h-[50px]"></div>
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
