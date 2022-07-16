import React, { useState } from 'react'
import { useConversation } from './ConversationContext'
import Message from './Message'
import TextToSpeech from '../util/textToSpeech'
import { MessageLog } from './MessageLog'
import MessageBox from '../components/view/MessageBox'
import MicButton from './view/MicButton'
import HelpButton from './view/HelpButton'
import SendButton from './view/SendButton'

import axios from "axios";

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
        toggleTranslate
    } = useConversation()
    const [currentMessage, setCurrentMessage] = useState({
        text: '',
        confidence: 1,
        translation: ''
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

        setCurrentMessage({ text: '', confidence: 1, translation: '' })

        StartTranscription(res => {
            if (!res.DisplayText || res.DisplayText == '') return
            console.log(res.NBest[0]?.Confidence)
            setCurrentMessage(prev => {
                return {
                    confidence: res.NBest[0]?.Confidence,
                    text: res.DisplayText === undefined ? prev.text : prev.text + res.DisplayText,
                    translation: prev.translation // should be empty anyway
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
        setCurrentMessage({ text: '', confidence: 1, translation: '' })
        const {message, response} = await SendMessage(currentMessage)
        AppendToMessageLog({ message: message, userSent: true })
        AppendToMessageLog({ message: response, userSent: false })
    }

    return (
        <div className="flex flex-col max-h-[89vh] w-full md:w-1/2 items-center grow">
            <MessageLog messageLog={messageLog} />

            <MessageBox message={currentMessage} />

            <div className="flex mb-4 justify-center items-center gap-4">
                <HelpButton disabled={isTranslating} onClick={OnHelpPressed} />
                <MicButton onClick={OnTranscribePressed} listening={listening} />
                <SendButton onClick={OnSendPressed} />
                <button className="bg-blue rounded-full w-20 h-20 text-white" onClick={toggleTranslate}>
                    {translateText ? "Turn translation off" : "Turn translation on"}
                </button>
            </div>
        </div>
    )
}

export default SpeechToText
