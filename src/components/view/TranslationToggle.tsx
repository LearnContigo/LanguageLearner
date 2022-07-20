import { useState } from 'react'
import { useConversation } from '../ConversationContext'

const TranslationToggle: React.FC = () => {
    const { translateText, toggleTranslate } = useConversation()

    //TODO: Make this match figma

    return (
        <div className="mt-3">
            <label className=" font-dosis text-2xl text-blue">Show Translations</label>
            <br />
            <input type="checkbox" checked={translateText} onClick={toggleTranslate} />
            <span className=""></span>
        </div>
    )
}

export default TranslationToggle
