import { useState } from 'react'
import { useConversation } from '../ConversationContext'
import HelpIcon from '@mui/icons-material/Help'
import TextToSpeech from '../../util/textToSpeech'
import CloseIcon from '@mui/icons-material/Close'
import MicIcon from '@mui/icons-material/Mic'

const HelpButton: React.FC = ({ ...props }) => {
    const [helpOpen, setHelpOpen] = useState(false)
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
            setHelpOpen(true)

            TextToSpeech(response, prosodyAttributes.rate, prosodyAttributes.pitch, () => {
                setIsTranslating(false)
            })
        })
    }

    return (
        <div className="relative">
            <button
                className="bg-blue rounded-full w-20 h-20"
                {...props}
                disabled={isTranslating}
                onClick={() => {
                    setHelpOpen(prev => !prev)
                }}
            >
                <HelpIcon className="text-shell" sx={{ fontSize: '55px' }} />
            </button>

            {helpOpen && (
                <div className="flex flex-col items-center justify-center absolute -top-2 -translate-x-1/4 -translate-y-full px-4 max-w-[600px] min-w-[200px] w-max h-[150px] bg-white border border-gray-400 shadow-2xl rounded-md">
                    <button
                        className="absolute top-0 right-0 m-2"
                        onClick={() => {
                            setHelpOpen(false)
                        }}
                    >
                        <CloseIcon className="text-gray-400" sx={{ fontSize: '15px' }} />
                    </button>
                    <p className="text-center text-blue font-dosis text-xl">English: {translatedHelpMessage.text}</p>
                    <p className="text-center text-blue font-dosis text-xl">
                        Spanish: {translatedHelpMessage.translation}
                    </p>
                    <button className="absolute bottom-0" onClick={OnHelpPressed}>
                        <MicIcon className="text-blue m-2" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default HelpButton
