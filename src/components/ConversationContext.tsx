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
    translateText: boolean
    messageLog: MessageLogItem[]
    AppendToMessageLog: (logItem: MessageLogItem) => void
    StartTranscription : (onRecognized: (result: Confidences) => void) => void
    StopTranscription: () => void
    SendMessage: (message: Message) => Promise<{message: Message, response: Message}> 
    toggleTranslate: () => void,
    prosodyAttributes: { rate: string, pitch: string },
    setProsodyAttributes: React.Dispatch<React.SetStateAction<{
        rate: string;
        pitch: string;
    }>>
}

const ConversationContext = createContext({} as ConversationContext);

export const useConversation = () => {
    return useContext(ConversationContext);
}

export const ConversationProvider : React.FC<React.PropsWithChildren> = ({children}) => {

    const [messageLog, setMessageLog] = useState<MessageLogItem[]>([]);
    const recognizer = useRecognizer('es-es');
    const [listening, setListening] = useState(false);
    const [translateText, setTranslateText] = useState(true);
    const [prosodyAttributes, setProsodyAttributes] = useState({
        rate: '1',
        pitch: '+0Hz'
    })
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

    const SendMessage = async (message: Message) => {
        const text = message.text
        const res = await axios.post("/api/completion", {
            text,
            context: GetPastMessages(4)
        });

        const responseText = res.data.choices[0].text;

        TextToSpeech(responseText, prosodyAttributes.rate, prosodyAttributes.pitch);

        // translate message and response
        const translationsResponse = await axios.post("/api/translate", {
            userMessage: message.text,
            response: responseText
        });
        message.translation = translationsResponse.data.translation[0].translations[0].text
        let response: Message = {
            text: responseText, 
            confidence: -1, 
            translation: translationsResponse.data.translation[1].translations[0].text
        }
        return {message, response}
    }

    const toggleTranslate = () => {
        setTranslateText(!translateText);
    }
    const obj = { messageLog, AppendToMessageLog, translator, recognizer, listening, StartTranscription, StopTranscription, SendMessage, translateText, toggleTranslate, prosodyAttributes, setProsodyAttributes}

    return <ConversationContext.Provider value={obj}>{children}</ConversationContext.Provider>
}
