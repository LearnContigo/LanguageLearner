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
    messageLog: MessageLogItem[]
    AppendToMessageLog: (logItem: MessageLogItem) => void
    StartTranscription : (onRecognized: (result: Confidences) => void) => void
    StopTranscription: () => void
    SendMessage: (message: string) => Promise<{message: string, response: string}> 
}

const ConversationContext = createContext({} as ConversationContext);

export const useConversation = () => {
    return useContext(ConversationContext);
}

export const ConversationProvider : React.FC<React.PropsWithChildren> = ({children}) => {

    const [messageLog, setMessageLog] = useState<MessageLogItem[]>([]);
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

    const AppendToMessageLog = (logItem: MessageLogItem) => {
        setMessageLog(prev => [...prev, logItem])
    }

    
    const GetPastMessages = (N: Number) => {
        if(N > messageLog.length) return messageLog;
        return messageLog.slice(-N, messageLog.length);
    }

    const SendMessage = async (message: string) => {

        const res = await axios.post("/api/completion", {
            message,
            context: GetPastMessages(4)
        });

        const response = res.data.choices[0].text;

        TextToSpeech(response);

        return {message, response}
    }

    const obj = { messageLog, AppendToMessageLog, translator, recognizer, listening, StartTranscription, StopTranscription, SendMessage}

    return <ConversationContext.Provider value={obj}>{children}</ConversationContext.Provider>
}
