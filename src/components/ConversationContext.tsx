import React, { createContext, useContext, useState } from "react";
import useRecognizer from "./useRecognizer";
import useTranslator from './useTranslator';
import {SpeechRecognizer, SpeechRecognitionEventArgs, Recognizer, PropertyId, TranslationRecognizer}  from 'microsoft-cognitiveservices-speech-sdk'
import TextToSpeech from '../util/textToSpeech';
import axios from "axios";

interface ConversationContext {
    translator ?: TranslationRecognizer
    recognizer ?: SpeechRecognizer
    listening : boolean
    StartTranscription : (onRecognized: (result: Confidences) => void) => void
    StopTranscription: () => void
    SendMessage: (message: string) => void 
}

const ConversationContext = createContext({} as ConversationContext);

export const useConversation = () => {
    return useContext(ConversationContext);
}

export const ConversationProvider : React.FC<React.PropsWithChildren> = ({children}) => {

    const recognizer = useRecognizer('es-es');
    const [listening, setListening] = useState(false);
    const translator = useTranslator();

    const StartTranscription = (onRecognized: (result: Confidences) => void) => {

        if (!recognizer) return;

        recognizer.recognized = (sender: Recognizer, event: SpeechRecognitionEventArgs) => {
            
            let confidences : Confidences = JSON.parse(event.result.properties.getProperty(PropertyId.SpeechServiceResponse_JsonResult));
            onRecognized(confidences)
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
    }

    const obj = { translator, recognizer, listening, StartTranscription, StopTranscription, SendMessage}

    return <ConversationContext.Provider value={obj}>{children}</ConversationContext.Provider>
}
