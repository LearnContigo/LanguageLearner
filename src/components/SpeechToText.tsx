import React, { useState } from 'react'
import { useConversation } from './ConversationContext';
const SpeechToText: React.FC = () => {

    const { listening, StartTranscription, StopTranscription, SendMessage } = useConversation();
    const [userSpeech, setUserSpeech] = useState("");

    // TODO: conversation assumes human<->AI message is 1:1 back and forth 
    const [conversation, setConversation] = useState<string[]>([]);

    const OnTranscribePressed = () => {

        if (listening) {
            StopTranscription();
            return;
        }

        StartTranscription((res) => {
            setUserSpeech((prev) => {
                return (res.result.text === undefined) ? prev : prev + res.result.text;
            });
        });
    }


    const OnSendPressed = async () => {
        if (!userSpeech) {
            alert("Record a message!")
            return;
        }
        const output = await SendMessage(userSpeech);
        setConversation(oldArray => [...oldArray, output.message, output.response])
        setUserSpeech("");
    }

    const OnRedoPressed = () => {
        setUserSpeech("");
    }
    return (
        <div className='space-x-2.5'>
            {conversation.map((message, index) => {
                if (index % 2 == 0) return <div>You: <div className='border border-purple-400 border-4' key={message}>{message}</div></div>
                return <div>Contigo: <div className='border border-red-400 border-4' key={message}>{message}</div></div>
            })}
            <br />
            <button className='border border-black p-3' onClick={OnRedoPressed}>Redo Message</button>
            <button className='border border-black p-3' onClick={OnTranscribePressed}>{!listening ? "Record your message" : "Stop recording"}</button>
            <button className='border border-black p-3' onClick={OnSendPressed}>Send Message</button>
            <p><span className='text-red-400'>Your message</span>: {userSpeech}</p>
            <button className='border border-black p-3' onClick={() => alert('to be impl by Justin')}>Need a translation?</button>
        </div>
    )
}

export default SpeechToText
