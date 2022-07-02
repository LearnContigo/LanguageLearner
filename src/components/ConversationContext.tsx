import React, { createContext, useContext, useState } from "react";
import useRecognizer from "./useRecognizer";
import {SpeechRecognizer, SpeechRecognitionEventArgs, Recognizer, PropertyId}  from 'microsoft-cognitiveservices-speech-sdk'
import TextToSpeech from '../util/textToSpeech';
import axios from "axios";


interface ConversationContext {
    recognizer ?: SpeechRecognizer
    listening : boolean
    StartTranscription : (onRecognized: (result: SpeechRecognitionEventArgs) => void) => void
    StopTranscription: () => void
    SendMessage: (message: string) => Promise<{message: string, response: string}> 
}

const ConversationContext = createContext({} as ConversationContext);

export const useConversation = () => {
    return useContext(ConversationContext);
}

export const ConversationProvider : React.FC<React.PropsWithChildren> = ({children}) => {

    const recognizer = useRecognizer();
    const [listening, setListening] = useState(false);

    const StartTranscription = (onRecognized: (result: SpeechRecognitionEventArgs) => void) => {

        if (!recognizer) return;

        recognizer.recognized = (sender: Recognizer, event: SpeechRecognitionEventArgs) => {
            
            let confidences = JSON.parse(event.result.properties.getProperty(PropertyId.SpeechServiceResponse_JsonResult));
            
            //Call some hook with confidences, and results
            onRecognized(event)
        }
    
        recognizer.startContinuousRecognitionAsync();
        setListening(true);
    }

    const StopTranscription = () => {
        recognizer?.stopContinuousRecognitionAsync();
        setListening(false);
    }


    const SendMessage = async (message: string) => {

        const res = await axios.post("/api/completion", {
            message
        });

        const response = res.data.choices[0].text;

        TextToSpeech(response);

        return {message, response}
    }

    const obj = {recognizer, listening, StartTranscription, StopTranscription, SendMessage}

    return <ConversationContext.Provider value={obj}>{children}</ConversationContext.Provider>
}
