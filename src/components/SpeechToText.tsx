import React, { useState} from 'react'
import { getTokenOrRefresh } from '../util/tokenUtil'
import { Recognizer, SpeechRecognitionEventArgs } from 'microsoft-cognitiveservices-speech-sdk'

const speechsdk = require('microsoft-cognitiveservices-speech-sdk')


const SpeechToText: React.FC = () => {

    const [displayText, setDisplayText] = useState("");

    const TranscribeMic = async () => {
        const tokenObj = await getTokenOrRefresh();

        if(!tokenObj.authToken)
            return setDisplayText("Error Fetching Token");

        const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
        speechConfig.speechRecognitionLanguage = 'en-US';
            
        const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognized = (sender: Recognizer, event: SpeechRecognitionEventArgs) => {
            setDisplayText(event.result.text);
        }

        recognizer.startContinuousRecognitionAsync();
    }

  return (
    <div>
        <button onClick={TranscribeMic}>Transcribe Mic</button>
        <p>{displayText}</p>
    </div>
  )
}

export default SpeechToText
