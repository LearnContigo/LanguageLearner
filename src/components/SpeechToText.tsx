import React, { useState } from 'react'
import { useConversation } from './ConversationContext'
import TextToSpeech from '../util/textToSpeech'
import { MessageLog } from './MessageLog'
import MessageBox from '../components/view/MessageBox'
import MicButton from './view/MicButton'
import HelpButton from './view/HelpButton'
import SendButton from './view/SendButton'
import RangeSliders from './view/RangeSliders'

const SpeechToText: React.FC = () => {
    const {
        messageLog,
        AppendToMessageLog,
        translator,
        listening,
        StartTranscription,
        StopTranscription,
        SendMessage,
        translateText,
        prosodyAttributes,
    } = useConversation()
    const [currentMessage, setCurrentMessage] = useState({
        text: '',
        confidence: 1,
        translation: '',
    } as Message)
    const [isTranslating, setIsTranslating] = useState(false)
    const [translatedHelpMessage, setTranslatedHelpMessage] = useState({
        text: '',
        translation: '',
    })

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

    const OnTranscribePressed = () => {
        if (listening) {
            StopTranscription()
            return
        }
        setCurrentMessage({ text: '', confidence: 1, translation: '' })

        StartTranscription(res => {
            if (!res.DisplayText || res.DisplayText == '') return
            setCurrentMessage(prev => {
                return {
                    confidence: res.NBest[0]?.Confidence,
                    text: res.DisplayText === undefined ? prev.text : prev.text + res.DisplayText,
                    translation: prev.translation, // should be empty anyway
                }
            })
        })
    }

    const OnSendPressed = async () => {
        console.log('current message: ', currentMessage)
        if (listening) StopTranscription()

        if (!currentMessage.text) {
            alert('Record a message!')
            return
        }
        setTranslatedHelpMessage({ text: '', translation: '' })
        setCurrentMessage({ text: '', confidence: 1, translation: '' })
        const { message, response } = await SendMessage(currentMessage)
        AppendToMessageLog({ message: message, userSent: true })
        AppendToMessageLog({ message: response, userSent: false })
    }

    return (
        <div className="flex flex-col items-center grow">
            <MessageLog messageLog={messageLog} />
            <MessageBox message={currentMessage} />

            <div className="flex mb-4 justify-center items-center gap-4">
                <HelpButton disabled={isTranslating} onClick={OnHelpPressed} />
                {translatedHelpMessage.translation}
                {translatedHelpMessage.text}
                <MicButton onClick={OnTranscribePressed} listening={listening} />
                <SendButton onClick={OnSendPressed} />
            </div>
        </div>
    )
}

export default SpeechToText
