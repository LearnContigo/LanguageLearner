import React, { useState } from 'react'
import { useConversation } from './ConversationContext'
import Message from './Message'
import TextToSpeech from '../util/textToSpeech'
import { MessageLog } from './MessageLog'
import MessageBox from '../components/view/MessageBox'
import MicButton from './view/MicButton'
import HelpButton from './view/HelpButton'
import SendButton from './view/SendButton'

const SpeechToText: React.FC = () => {
    const {
        messageLog,
        AppendToMessageLog,
        translator,
        listening,
        StartTranscription,
        StopTranscription,
        SendMessage,
    } = useConversation()
    const [message, setMessage] = useState({
        message: '',
        confidence: 1,
    } as Message)
    const [isTranslating, setIsTranslating] = useState(false)

    const OnHelpPressed = () => {
        setIsTranslating(true)
        translator?.recognizeOnceAsync(result => {
            TextToSpeech(result.translations.get('es'), () => {
                setIsTranslating(false)
            })
        })
    }

    const OnTranscribePressed = () => {
        if (listening) {
            StopTranscription()
            return
        }

        setMessage({ message: '', confidence: 1 })

        StartTranscription(res => {
            if (!res.DisplayText || res.DisplayText == '') return
            console.log(res.NBest[0]?.Confidence)
            setMessage(prev => {
                return {
                    confidence: res.NBest[0]?.Confidence,
                    message: res.DisplayText === undefined ? prev.message : prev.message + res.DisplayText,
                }
            })
        })
    }

    const OnSendPressed = async () => {
        if (listening) StopTranscription()

        if (!message.message) {
            alert('Record a message!')
            return
        }
        AppendToMessageLog({ message: message.message, userSent: true })
        const output = await SendMessage(message.message)
        AppendToMessageLog({ message: output.response, userSent: false })
        setMessage({ message: '', confidence: 1 })
    }

    return (
        <div className="flex flex-col max-h-[89vh] w-1/2 items-center grow">
            <MessageLog messageLog={messageLog} />

            <MessageBox message={message} />

            <div className="flex mb-4 justify-center items-center gap-4">
                <HelpButton disabled={isTranslating} onClick={OnHelpPressed} />
                <MicButton onClick={OnTranscribePressed} listening={listening} />
                <SendButton onClick={OnSendPressed} />
            </div>
        </div>
    )
}

export default SpeechToText
