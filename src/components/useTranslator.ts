import { useEffect, useState } from "react"
import { getTokenOrRefresh } from '../util/tokenUtil'
import {SpeechTranslationConfig, TranslationRecognizer} from 'microsoft-cognitiveservices-speech-sdk';

const speechsdk = require('microsoft-cognitiveservices-speech-sdk')

const useTranslator = () => {

    const [translator, setTranslator] = useState<TranslationRecognizer | undefined>();

    useEffect(() => {

        const createRecognizer = async () => {
            const tokenObj = await getTokenOrRefresh();

            if(!tokenObj.authToken)
                throw Error("Error Fetching Token");

            const speechConfig : SpeechTranslationConfig = speechsdk.SpeechTranslationConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
            speechConfig.speechRecognitionLanguage = "en-US";
            speechConfig.addTargetLanguage("es");

            const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
            const translator = new TranslationRecognizer(speechConfig, audioConfig);
            
            setTranslator(translator);
        }

        createRecognizer();
    }, [])

    return translator;
}

export default useTranslator