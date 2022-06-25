import React, { useState, useEffect } from 'react'
import { getTokenOrRefresh } from '../util/tokenUtil'
import TextToSpeech from '../util/textToSpeech';
import { Recognizer, SpeechRecognitionEventArgs, SpeechRecognizer } from 'microsoft-cognitiveservices-speech-sdk'
import axios from "axios";

const speechsdk = require('microsoft-cognitiveservices-speech-sdk')


const SpeechToText: React.FC = () => {

    const [displayText, setDisplayText] = useState("");
    const [recognizer, setRecognizer] = useState<SpeechRecognizer | undefined>();
    const [recognizing, setRecognizing] = useState(false);
    const [speaking, setSpeaking] = useState(false);

    useEffect(() => {

        const createRecognizer = async () => {
            const tokenObj = await getTokenOrRefresh();

            if(!tokenObj.authToken)
                throw Error("Error Fetching Token");

            const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
            speechConfig.speechRecognitionLanguage = 'en-US';
            
            const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
            const recognizer: SpeechRecognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

            setRecognizer(recognizer);
        }

        createRecognizer();
    }, [])

    const StartTranscription = () => {

        if (!recognizer)
            return;

        recognizer.recognized = (sender: Recognizer, event: SpeechRecognitionEventArgs) => {
            setDisplayText(event.result.text);
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
