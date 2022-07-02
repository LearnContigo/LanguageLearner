import React, { useState } from 'react'
import { useConversation } from './ConversationContext';

import Message from './Message';
import TextToSpeech from '../util/textToSpeech';

const SpeechToText: React.FC = () => {

    const { translator, listening, StartTranscription, StopTranscription, SendMessage } = useConversation();
    const [message, setMessage] = useState({ message: "", confidence: 1 } as Message)

    // TODO: conversation assumes human<->AI message is 1:1 back and forth 
    const [conversation, setConversation] = useState<string[]>([]);

    const OnHelpPressed = () => {
        translator?.recognizeOnceAsync(result => {
            TextToSpeech(result.translations.get("es"));
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
        const output = await SendMessage(message.message);
        setConversation(oldArray => [...oldArray, output.message, output.response])
        setMessage({ message: "", confidence: 1 });
    }

    const OnRedoPressed = () => {
        setMessage({ message: "", confidence: 1 });
    }
    return (
        <div className='space-x-2.5'>
            {conversation.map((message, index) => {
                if (index % 2 == 0) return (<div key={index}>You: <div className='border border-purple-400 border-4'>{message}</div></div>)
                return <div key={index}>Contigo: <div className='border border-red-400 border-4' >{message}</div></div>
            })}
            <br />
            <button className='border border-black p-3' onClick={OnRedoPressed}>Redo Message</button>
            <button className='border border-black p-3' onClick={OnTranscribePressed}>{!listening ? "Record your message" : "Stop recording"}</button>
            <button className='border border-black p-3' onClick={OnSendPressed}>Send Message</button>
            <Message message={message} />
            <button className='border border-black p-3' onClick={OnHelpPressed}>Need a translation?</button>
        </div>
    )
}

export default SpeechToText
