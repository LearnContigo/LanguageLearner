import { useState } from 'react'
import { useConversation } from '../ConversationContext'
import HelpIcon from '@mui/icons-material/Help'
import TextToSpeech from '../../util/textToSpeech'

const HelpButton: React.FC = ({ ...props }) => {
    const [isTranslating, setIsTranslating] = useState(false)
    const [translatedHelpMessage, setTranslatedHelpMessage] = useState({
        text: '',
        translation: '',
    })
    const { translator, prosodyAttributes } = useConversation()

    const OnHelpPressed = () => {
        setIsTranslating(true)
        translator?.recognizeOnceAsync(async result => {
            const message = result.text
            const response = result.translations.get('es')
            setTranslatedHelpMessage({ text: message, translation: response })

            TextToSpeech(response, prosodyAttributes.rate, prosodyAttributes.pitch, () => {
                setIsTranslating(false)
            })
        })
    }

    return (
        <>
            <button
                className="bg-blue rounded-full w-20 h-20"
                {...props}
                disabled={isTranslating}
                onClick={OnHelpPressed}
            >
                <HelpIcon className="text-shell" sx={{ fontSize: '55px' }} />
            </button>
            {translatedHelpMessage.translation}
            {translatedHelpMessage.text}
        </>
    )
}

export default HelpButton
