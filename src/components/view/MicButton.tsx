import { useConversation } from '../ConversationContext'
import MicIcon from '@mui/icons-material/Mic'
import CancelIcon from '@mui/icons-material/Cancel'
import ReplayIcon from '@mui/icons-material/Replay'

const MicButton: React.FC = ({ ...props }) => {
    const { listening, StartTranscription, StopTranscription, currentMessage, setCurrentMessage } = useConversation()

    const OnTranscribePressed = () => {
        if (listening) {
            StopTranscription()
            return
        }
        setCurrentMessage({ text: '', confidence: 1, translation: '' })

        StartTranscription(res => {
            if (!res.DisplayText || res.DisplayText == '') return
            setCurrentMessage(prev => {
                return {
                    confidence: res.NBest[0]?.Confidence,
                    text: res.DisplayText === undefined ? prev.text : prev.text + ' ' + res.DisplayText,
                    translation: prev.translation, // should be empty anyway
                }
            })
        })
    }

    return (
        <button className="bg-blue rounded-full w-24 h-24" {...props} onClick={OnTranscribePressed}>
            {listening ? (
                <CancelIcon className="text-shell" sx={{ fontSize: '65px' }} />
            ) : currentMessage.text ? (
                <ReplayIcon className="text-shell" sx={{ fontSize: '65px' }} />
            ) : (
                <MicIcon className="text-shell" sx={{ fontSize: '65px' }} />
            )}
        </button>
    )
}

export default MicButton
