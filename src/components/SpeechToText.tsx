import React, { useState } from 'react'
import { useConversation } from './ConversationContext';

const SpeechToText: React.FC = () => {

    const {listening, StartTranscription, StopTranscription, SendMessage} = useConversation();
    const [displayText, setDisplayText] = useState("");

    const OnButtonPressed = () => {

        if(listening){
            StopTranscription();
            SendMessage(displayText);
            setDisplayText("");
            return;
        }

        StartTranscription((res) => {
            setDisplayText(res.result.text);
        });
    }

  return (
    <div>
        <button onClick={OnButtonPressed}>{!listening ? "Transcribe" : "Send Transcription"}</button>
        <p>{displayText}</p>
    </div>
  )
}

export default SpeechToText
