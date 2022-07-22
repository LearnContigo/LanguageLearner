import React from 'react'
import { useConversation } from '../ConversationContext'

const RangeSliders: React.FC = () => {
    const { prosodyAttributes, setProsodyAttributes } = useConversation()

    const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProsodyAttributes(prev => {
            return { pitch: prev.pitch, rate: parseFloat(e.target.value) }
        })
    }

    const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProsodyAttributes(prev => {
            return { pitch: parseFloat(e.target.value), rate: prev.rate }
        })
    }
    return (
        <>
            <label htmlFor="default-range" className="font-dosis text-2xl text-blue">
                Speed
            </label>
            <input
                id="default-range"
                type="range"
                value={prosodyAttributes.rate}
                min={0.4}
                max={1.6}
                step={0.1}
                onChange={handleRateChange}
                className="slider mt-3 w-full h-4 shadow-[inset_0_4px_4px_1px_rgba(0,0,0,0.25)] rounded-lg appearance-none cursor-pointer"
            ></input>

            <div className="mt-3">
                <label htmlFor="default-range" className="font-dosis text-2xl text-blue">
                    Pitch
                </label>
                <input
                    id="default-range"
                    type="range"
                    value={prosodyAttributes.pitch}
                    min={-20}
                    max={20}
                    step={2}
                    onChange={handlePitchChange}
                    className="slider mt-3 w-full h-4 shadow-[inset_0_4px_4px_1px_rgba(0,0,0,0.25)] rounded-lg appearance-none cursor-pointer"
                ></input>
            </div>
        </>
    )
}

export default RangeSliders
