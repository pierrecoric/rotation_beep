import React, {useState, useEffect} from "react";

//Initialize minimal and maximal frequency for the oscillators.
const minFrequency = 55;
const maxFrequency = 880;
//HERE IS THE PROBLEM THIS CONTEXT HAS TO BE ISOLATED TO EACH OCCURENCE OF THE COMPONENT
let context;
//Create variables to store the oscillators and its parameters.
let oscillator;
let gainOsc;
let repetition;

//Utilitarian functions
//------------------------------
//Function to map a number two ranges.
function mapNumber(value, star1, stop1, start2, stop2) {
    return (value - star1) * (stop2 - start2) / (stop1 - star1) + start2;
}

//Function to compute procentages. In use to calculate the gradients.
function computeProcent (numerator, denominator) {
    let result = (numerator / denominator) * 100
    return result;
}
//------------------------------


//The different colors available to render the grid.
const colorValues = ['#D8DBE2', '#E3170A', '#FF9505'];
//Function to generate different parameters for a gradient.
const generateBackgroundGradient = () => {
    let pick1 = Math.floor(Math.random() * colorValues.length);
    let pick2 = Math.floor(Math.random() * colorValues.length);
    while (pick1 === pick2) {
        pick2 = Math.floor(Math.random() * colorValues.length);
    }
    const degBackgroundPreview = Math.random() * 360;
    return {degBackgroundPreview, pick1, pick2};
};

export const Osc = (props) => {
    
    //Initial States
    //------------------------------
    //Initial frequency.
    const [frequency, setFrequency] = useState(props.freq);
    //Initial fade-out time.
    const [fadeOutTime, setFadeOutTime] = useState(props.fo);
    //Initial repetition time
    const [repetitionTime, setRepetitionTime] = useState(props.re);
    //Initialize the background gradient.
    const [backgroundInfo] = useState(() => generateBackgroundGradient());
    //Style for the background of the creator
    const backgroundPreview = {
        background: `linear-gradient(${backgroundInfo.degBackgroundPreview}deg, ${colorValues[backgroundInfo.pick1]}, ${colorValues[backgroundInfo.pick2]})`
    }
    const [audioContext, setAudioContext] = useState(null);
    const [remountKey, setRemountKey] = useState(0);
    //------------------------------

    //Function to reset the animation of the rotating div.
    const resetAnimation = () => {
        setRemountKey((prevKey) => prevKey + 1);
    };


    //Function to start the sound of an oscillator.
    function start(frequency, fadeOutTime) {
        context = new AudioContext;
        oscillator = context.createOscillator();
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        gainOsc = context.createGain();
        gainOsc.gain.value = 0.2;
        oscillator.connect(gainOsc);
        gainOsc.connect(context.destination);
        oscillator.start();
    }
    //Function to stop the sound of an oscillator.
    function stop(fadeOutTime) {
        gainOsc.gain.setValueAtTime(gainOsc.gain.value, context.currentTime);
        gainOsc.gain.linearRampToValueAtTime(0.00001, context.currentTime + fadeOutTime);
        oscillator.stop(context.currentTime + fadeOutTime);
    }
    //Function to generate one beep.
    function beep(frequency, fadeOutTime) {
        start(frequency, fadeOutTime);
        stop(fadeOutTime);
    }
    //Function to repeat the sound over time.
    function beepTime(frequency, fadeOutTime, repetitionTime) {
        if (repetition) {
            clearInterval(repetition);
        }
        let interval = repetitionTime * 1000;
        repetition = setInterval(() => beep(frequency, fadeOutTime), interval);
    }

    
    
    
    //stop the current context if there is one.
    useEffect(() => {
        // Cleanup function
        return () => {
            if (context) {
                //stop();
                context.close().catch((error) => console.error('Error closing AudioContext:', error));
            }
        };
    }, []);

    //Play the new context.
    

    beepTime(frequency, fadeOutTime, repetitionTime);
    

    //Functions for to handle changes from the sliders.
    //------------------------------
    //When using the frequency slider.
    const handleFrequencyChange = (event) => {
        setFrequency(event.target.value);
        resetAnimation();
    }
    //When using the fade-out slider.
    const handleFadeOutTimeChange = (event) => {
        setFadeOutTime(event.target.value);
        resetAnimation();
    }
    //When using the repetition time slider.
    const handleRepetitionTimeChange = (event) => {
        setRepetitionTime(event.target.value);
        resetAnimation();
    }
    //------------------------------


    //Function to render the color of the oscillator.
    const computeColor = (freq) => {
        const r = [0, 255];
        const g = [0, 240];
        const b = [122, 0];
        let rVal = 0, gVal = 0, bVal = 0;
        rVal = mapNumber(freq, minFrequency, maxFrequency, r[0], r[1]);
        gVal = mapNumber(freq, minFrequency, maxFrequency, g[0], g[1]);
        bVal = mapNumber(freq, minFrequency, maxFrequency, b[0], b[1]);
        return `rgb(${rVal}, ${gVal}, ${bVal})`;
    }
    
    //Compute the procent value for the gradient.
    const gradProcent = computeProcent(fadeOutTime, repetitionTime)
    //Generate the styles for the preview of the oscillator.
    let rotationStyle = {
        animation: `rotateGradient ${repetitionTime}s linear infinite`,
        background: `conic-gradient(from 180deg, ${computeColor(frequency)} 0%, white ${gradProcent}% 100%)`,
    };

    //Styles for the sliders
    const sliderStyleLabel = "w-full mt-4 flex flex-col";
    const sliderStyleInput = "range accent-black";
    const sliderStyleInfo = "flex justify-between align-middle mt-1";

    return (
        <div className="" style={backgroundPreview}>
            <div>
                <div className="flex justify-center mt-8">
                    <div className="w-[150px] h-[150px] rounded-full" key={remountKey} style={rotationStyle}></div>
                </div>
                <div className="w-full h-[20px] flex align-middle justify-center">
                    <div className="w-[5px] h-[20px] bg-white"></div>
                </div>
            </div>
            <div className="flex align-middle justify-center w-full">
                <form action="" className="flex flex-col p-8 w-full">
                    <label className={`${sliderStyleLabel}`}>
                        <input 
                            type="range"
                            min={minFrequency}
                            max={maxFrequency}
                            step="0.1"
                            value={frequency}
                            onChange={handleFrequencyChange}
                            className={`${sliderStyleInput}`}
                        />
                        <div className={`${sliderStyleInfo}`}>
                            <span>Frequency: </span>
                            <span>{frequency} Hz</span>
                        </div>
                    </label>
                    <label className={`${sliderStyleLabel}`}>
                        <input
                            type="range"
                            min="0"
                            max="16"
                            step="0.01"
                            value={fadeOutTime}
                            onChange={handleFadeOutTimeChange} 
                            className={`${sliderStyleInput}`}
                        />
                        <div className={`${sliderStyleInfo}`}>
                            <span>Fade-out time: </span>
                            <span>{fadeOutTime} sec</span>
                        </div>
                    </label>
                    <label className={`${sliderStyleLabel}`}>
                        <input
                            type="range"
                            min="0"
                            max="16"
                            step="0.01"
                            value={repetitionTime}
                            onChange={handleRepetitionTimeChange}
                            className={`${sliderStyleInput}`} 
                        />
                        <div className={`${sliderStyleInfo}`}>
                            <span>Repeat every: </span>
                            <span>{repetitionTime} sec</span>
                        </div>
                    </label>
                </form>
            </div>
        </div>
    );
}