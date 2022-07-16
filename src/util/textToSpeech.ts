import { getTokenOrRefresh } from './tokenUtil'
import { SpeechSynthesisResult, SpeechSynthesizer } from 'microsoft-cognitiveservices-speech-sdk'
const speechsdk = require('microsoft-cognitiveservices-speech-sdk')

const TextToSpeech = async (text: string, rate: number, pitch: number, onComplete?: () => void) => {
    const tokenObj = await getTokenOrRefresh()

    if (!tokenObj.authToken) return

    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region)
    const audioConfig = speechsdk.AudioConfig.fromDefaultSpeakerOutput()
    speechConfig.speechSynthesisVoiceName = 'es-MX-DaliaNeural'
    const synthesizer: SpeechSynthesizer = new speechsdk.SpeechSynthesizer(speechConfig, audioConfig)

    const ssml =
        `
        <speak version="1.0" xmlns="https://www.w3.org/2001/10/synthesis" xml:lang="es-US">
            <voice name="es-MX-DaliaNeural">
                <prosody rate="${rate}" pitch="${pitch}Hz">
                    ${text}
                </prosody>
            </voice>
        </speak>
    `

    synthesizer.speakSsmlAsync(ssml, (e: SpeechSynthesisResult) => {
        synthesizer.close()

        //Ticks to miliseconds
        let ms = e.audioDuration * 0.0001

        setTimeout(() => {
            onComplete && onComplete()
        }, ms)
    })
}

export default TextToSpeech
