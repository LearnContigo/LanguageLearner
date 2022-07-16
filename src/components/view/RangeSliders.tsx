import React from 'react';
import { useConversation } from '../ConversationContext'

const RangeSliders: React.FC = () => {
    const { prosodyAttributes, setProsodyAttributes } = useConversation()
    
    const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProsodyAttributes(prev => {
            return {pitch: prev.pitch, rate: parseFloat(e.target.value)}
        })
    }

    const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProsodyAttributes(prev => {
            return {pitch: parseFloat(e.target.value), rate: prev.rate}
        })
    }
    return (
        <>
            <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Speaking Rate</label>
            <input id="default-range" type="range" value={prosodyAttributes.rate} min={0.4} max={1.6} step={0.1} onChange={handleRateChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"></input>


            <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pitch</label>
            <input id="default-range" type="range" value={prosodyAttributes.pitch} min={-20} max={20} step={2} onChange={handlePitchChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"></input>
        </>
    );
};

export default RangeSliders;






