import React, { createContext, useContext } from "react";
import useRecognizer from "./useRecognizer";
import {SpeechRecognizer}  from 'microsoft-cognitiveservices-speech-sdk'

interface ConversationContext {
    recognizer ?: SpeechRecognizer
}

const ConversationContext = createContext({} as ConversationContext);

export const useConversation = () => {
    return useContext(ConversationContext);
}

export const ConversationProvider : React.FC<React.PropsWithChildren> = ({children}) => {

    const recognizer = useRecognizer();
    const obj = {recognizer}

    return <ConversationContext.Provider value={obj}>{children}</ConversationContext.Provider>
}
