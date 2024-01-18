import React, {useState} from "react";

export const Creator = () => {

    //Initial frequency.
    const [frequency, setFrequency] = useState(220);
    //Initial fade-out time.
    const [fadeOutTime, setFadeOutTime] = useState(0.5);
    //Initial repetition time
    const [repetitionTime, setRepetitionTime] = useState(1);

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



    return (
        <div>
            <h1>Creation of Oscillator</h1>
            <form action="" className="flex w-full">
                <label className="w-full">
                    <input 
                        type="range"
                        min="55"
                        max="880"
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
        </div>
    );
}