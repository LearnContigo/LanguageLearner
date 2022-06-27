import { getTokenOrRefresh } from './tokenUtil'
import { SpeechSynthesisEventArgs, SpeechSynthesisResult, SpeechSynthesizer } from 'microsoft-cognitiveservices-speech-sdk'
const speechsdk = require('microsoft-cognitiveservices-speech-sdk')

const TextToSpeech = async (text: string, onComplete ?: () => void) => {
    const tokenObj = await getTokenOrRefresh();

    if(!tokenObj.authToken)
        return;

    const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
    const audioConfig = speechsdk.AudioConfig.fromDefaultSpeakerOutput();
    speechConfig.speechSynthesisVoiceName = "es-MX-DaliaNeural";
    const synthesizer : SpeechSynthesizer = new speechsdk.SpeechSynthesizer(speechConfig, audioConfig);

    synthesizer.synthesisCompleted = (sender: SpeechSynthesizer, event: SpeechSynthesisEventArgs) => {
        synthesizer.close();
        onComplete && onComplete();
    }

    synthesizer.speakTextAsync(text);
}

export default TextToSpeech;