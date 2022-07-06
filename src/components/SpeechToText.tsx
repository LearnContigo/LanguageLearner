import React, { useState } from 'react'
import { useConversation } from './ConversationContext';
import Message from './Message';
import TextToSpeech from '../util/textToSpeech';
import {MessageLog} from './MessageLog';

const SpeechToText: React.FC = () => {

    const { translator, listening, StartTranscription, StopTranscription, SendMessage } = useConversation();
    const [message, setMessage] = useState({ message: "", confidence: 1 } as Message)
    const [isTranslating, setIsTranslating] = useState(false);
    const [messageLog, setMessageLog] = useState<MessageLogItem[]>([]);

    const AppendToMessageLog = (logItem: MessageLogItem) => {
        setMessageLog(prev => [...prev, logItem])
    }

    const OnHelpPressed = () => {
        setIsTranslating(true);
        translator?.recognizeOnceAsync(result => {
            TextToSpeech(result.translations.get("es"));
            setIsTranslating(false);
        });
    }

    const OnTranscribePressed = () => {

        if (listening) {
            StopTranscription();
            return;
        }

        StartTranscription((res) => {
            if (!res.DisplayText || res.DisplayText == "") return;
            console.log(res.NBest[0]?.Confidence);
            setMessage(prev => {
                return {
                    confidence: res.NBest[0]?.Confidence,
                    message: (res.DisplayText === undefined) ? prev.message : prev.message + res.DisplayText
                };
            });
        });
    }


    const OnSendPressed = async () => {
        if (!message.message) {
            alert("Record a message!")
            return;
        }
        AppendToMessageLog({message: message.message, userSent: true})
        const output = await SendMessage(message.message);
        AppendToMessageLog({message: output.response, userSent: false})
        setMessage({ message: "", confidence: 1 });
    }

    const OnRedoPressed = () => {
        setMessage({ message: "", confidence: 1 });
    }
    return (
        <div className='space-x-2.5'>
            <MessageLog messageLog={messageLog}/>
            <br />
            <button className='border border-black p-3' onClick={OnRedoPressed}>Redo Message</button>
            <button className='border border-black p-3' onClick={OnTranscribePressed}>{!listening ? "Record your message" : "Stop recording"}</button>
            <button className='border border-black p-3' onClick={OnSendPressed}>Send Message</button>
            <Message message={message} />
            <button disabled={isTranslating} className='border border-black p-3' onClick={OnHelpPressed}>Need a translation?</button>
        </div>
    )
}

export default SpeechToText
