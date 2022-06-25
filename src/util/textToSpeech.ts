import { getTokenOrRefresh } from './tokenUtil'
import { SpeechSynthesisResult } from 'microsoft-cognitiveservices-speech-sdk'
const speechsdk = require('microsoft-cognitiveservices-speech-sdk')

const TextToSpeech = async (text: string, onComplete: () => void) => {
    const tokenObj = await getTokenOrRefresh();

    if(!tokenObj.authToken)
        return;

    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
    const audioConfig = speechsdk.AudioConfig.fromDefaultSpeakerOutput();
    speechConfig.speechSynthesisVoiceName = "es-MX-DaliaNeural";
    const synthesizer = new speechsdk.SpeechSynthesizer(speechConfig, audioConfig);

    synthesizer.speakTextAsync(text, (e: SpeechSynthesisResult) => {
        synthesizer.close();
        onComplete();
    });
}

export default TextToSpeech;