import React, { useState } from 'react'
import { useConversation } from './ConversationContext';
import TextToSpeech from '../util/textToSpeech';
import Message from './Message';

const SpeechToText: React.FC = () => {

    const { translator, listening, StartTranscription, StopTranscription, SendMessage} = useConversation();
    const [message, setMessage] = useState({} as Message)

    const OnButtonPressed = () => {

        if(listening){
            StopTranscription();
            SendMessage(message.message);
            setMessage({message: "", confidence: 1});
            return;
        }

        StartTranscription((res) => {
            if(!res.DisplayText || res.DisplayText == "") return;
            setMessage({message: res.DisplayText, confidence: res.NBest[0].Confidence})
        });
    }


    const OnHelpPressed = () => {
        translator?.recognizeOnceAsync(result => {
            TextToSpeech(result.translations.get("es"));
        });
    }

  return (
    <div>
        <button onClick={OnHelpPressed}>Help</button>
        <button onClick={OnButtonPressed}>{!listening ? "Transcribe" : "Send Transcription"}</button>
        <Message message={message} />
    </div>
  )
}

export default SpeechToText
