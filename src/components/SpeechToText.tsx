import React, { useState } from 'react'
import { useConversation } from './ConversationContext';
import TextToSpeech from '../util/textToSpeech';
import { Recognizer, SpeechRecognitionEventArgs, PropertyId } from 'microsoft-cognitiveservices-speech-sdk'
import axios from "axios";

const SpeechToText: React.FC = () => {

    const {recognizer} = useConversation();
    const [displayText, setDisplayText] = useState("");
    const [recognizing, setRecognizing] = useState(false);
    const [speaking, setSpeaking] = useState(false);

    const StartTranscription = () => {
        
        if (!recognizer)
            return;

        recognizer.recognized = (sender: Recognizer, event: SpeechRecognitionEventArgs) => {
            
            let confidences = event.result.properties.getProperty(PropertyId.SpeechServiceResponse_JsonResult);
            console.log(JSON.parse(confidences));

            setDisplayText((prev) => {
                return prev + event.result.text;
            })
        }

        recognizer.startContinuousRecognitionAsync();
        setRecognizing(true);
    }

    const StopTranscription = async () => {
        const message = displayText;

        recognizer?.stopContinuousRecognitionAsync();
        setRecognizing(false);

        const res = await axios.post("/api/completion", {
            message
        });

        const response = res.data.choices[0].text;

        setSpeaking(true);
        TextToSpeech(response, () => {
            setSpeaking(false);
        });
    }

    const OnButtonPressed = () => {

        if(speaking) return;

        if(recognizing){
            return StopTranscription();
        }

        StartTranscription();
    }

  return (
    <div>
        <button onClick={OnButtonPressed}>{!recognizing ? "Transcribe" : "Send Transcription"}</button>
        <p>{displayText}</p>
    </div>
  )
}

export default SpeechToText
