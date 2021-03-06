import { useEffect, useState } from 'react'
import { getTokenOrRefresh } from '../util/tokenUtil'
import {
    SpeechRecognizer,
    SpeechConfig,
    ServicePropertyChannel,
    PhraseListGrammar,
} from 'microsoft-cognitiveservices-speech-sdk'

const speechsdk = require('microsoft-cognitiveservices-speech-sdk')

const useRecognizer = (language: string) => {
    const [recognizer, setRecognizer] = useState<SpeechRecognizer | undefined>()

    useEffect(() => {
        const createRecognizer = async () => {
            const tokenObj = await getTokenOrRefresh()

            if (!tokenObj.authToken) throw Error('Error Fetching Token')

            const speechConfig: SpeechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
                tokenObj.authToken,
                tokenObj.region
            )
            speechConfig.speechRecognitionLanguage = language

            //Enable detailed results from a transcription, including word by word confidence
            speechConfig.setServiceProperty('wordLevelConfidence', 'true', ServicePropertyChannel.UriQueryParameter)
            speechConfig.setServiceProperty('format', 'detailed', ServicePropertyChannel.UriQueryParameter)

            const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput()
            const recognizer: SpeechRecognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig)

            //Add words or phrases the recognizer can not recognize here
            PhraseListGrammar.fromRecognizer(recognizer).addPhrases(['quesadilla'])

            setRecognizer(recognizer)
        }

        createRecognizer()
    }, [])

    return recognizer
}

export default useRecognizer
