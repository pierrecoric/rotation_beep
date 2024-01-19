import React, {useState} from "react";

//Initialize minimal and maximal frequency for the oscillators.
const minFrequency = 55;
const maxFrequency = 880;

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

export const Creator = () => {
    //Initial States
    //------------------------------
    //Initial frequency.
    const [frequency, setFrequency] = useState(220);
    //Initial fade-out time.
    const [fadeOutTime, setFadeOutTime] = useState(0.5);
    //Initial repetition time
    const [repetitionTime, setRepetitionTime] = useState(2);
    //Initialize the background gradient.
    const [backgroundInfo] = useState(() => generateBackgroundGradient());
    //Style for the background of the creator
    const backgroundPreview = {
        background: `linear-gradient(${backgroundInfo.degBackgroundPreview}deg, ${colorValues[backgroundInfo.pick1]}, ${colorValues[backgroundInfo.pick2]})`
    }
    //------------------------------


    //Functions for to handle changes from the sliders.
    //------------------------------
    //When using the frequency slider.
    const handleFrequencyChange = (event) => {
        setFrequency(event.target.value)
    }
    //When using the fade-out slider.
    const handleFadeOutTimeChange = (event) => {
        setFadeOutTime(event.target.value);
    }
    //When using the repetition time slider.
    const handleRepetitionTimeChange = (event) => {
        setRepetitionTime(event.target.value);
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
    const rotationStyle = {
        animation: `rotateGradient ${repetitionTime}s linear infinite`,
        background: `conic-gradient(from 180deg, ${computeColor(frequency)} 0%, white ${gradProcent}% 100%)`,
    };

    //Styles for the sliders
    const sliderStyleLabel = "w-full mt-4 flex flex-col";
    const sliderStyleInput = "range accent-black";
    const sliderStyleInfo = "flex justify-between align-middle mt-1";

    return (
        <div className="" style={backgroundPreview}>
            <div className="flex align-middle justify-center p-8">
                <div className="w-[150px] h-[150px] rounded-full" style={rotationStyle}></div>
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
                    <label className="w-full flex align-middle justify-center mt-8 mb-8">
                        <input type="submit" value="create"/>
                    </label>
                </form>
            </div>
        </div>
    );
}