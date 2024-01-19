import React, {useState} from "react";

export const Creator = () => {

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


    //Initial States
    //------------------------------
    //Initial frequency.
    const [frequency, setFrequency] = useState(220);
    //Initial fade-out time.
    const [fadeOutTime, setFadeOutTime] = useState(0.5);
    //Initial repetition time
    const [repetitionTime, setRepetitionTime] = useState(2);
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

    
    return (
        <div>
            <form action="" className="flex w-full">
                <label className="w-full">
                    <input 
                        type="range"
                        min={minFrequency}
                        max={maxFrequency}
                        step="0.1"
                        value={frequency}
                        onChange={handleFrequencyChange}
                    />
                    <span>{frequency} Hz</span>
                </label>
                <label className="w-full">
                    <input
                        type="range"
                        min="0"
                        max="16"
                        step="0.01"
                        value={fadeOutTime}
                        onChange={handleFadeOutTimeChange} 
                    />
                    <span>{fadeOutTime} sec</span>
                </label>
                <label className="w-full">
                    <input
                        type="range"
                        min="0"
                        max="16"
                        step="0.01"
                        value={repetitionTime}
                        onChange={handleRepetitionTimeChange} 
                    />
                    <span>{repetitionTime} sec</span>
                </label>
                <label className="w-full">
                    <input type="submit" value="create"/>
                </label>
            </form>
            <div className="w-[100px] h-[100px] rounded-full" style={rotationStyle}>
            </div>
        </div>
    );
}