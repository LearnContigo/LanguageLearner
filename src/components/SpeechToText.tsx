import React, { useState } from 'react'
import { useConversation } from './ConversationContext';
import Message from './Message';

const SpeechToText: React.FC = () => {

    const {listening, StartTranscription, StopTranscription, SendMessage} = useConversation();
    const [displayText, setDisplayText] = useState("");
    const [confidences, setConfidences] = useState({})

    const OnButtonPressed = () => {

        if(listening){
            StopTranscription();
            SendMessage(displayText);
            setDisplayText("");
            return;
        }

        StartTranscription((res) => {

            if(!res.DisplayText || res.DisplayText == "") return;

            setDisplayText(res.DisplayText);
            setConfidences(res);
        });
    }

  return (
    <div>
        <button onClick={OnButtonPressed}>{!listening ? "Transcribe" : "Send Transcription"}</button>
        <Message confidences={confidences} />
    </div>
  )
}

export default SpeechToText
