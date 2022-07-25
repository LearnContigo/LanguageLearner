import { useConversation } from '../ConversationContext'
import SendIcon from '@mui/icons-material/Send'

const SendButton: React.FC = ({ ...props }) => {
    const {
        AppendToMessageLog,
        listening,
        StopTranscription,
        SendMessage,
        GetCorrection,
        currentMessage,
        setCurrentMessage,
    } = useConversation()

    const OnSendPressed = async () => {
        console.log('current message: ', currentMessage)
        if (listening) StopTranscription()

        if (!currentMessage.text) {
            alert('Record a message!')
            return
        }

        setCurrentMessage({ text: '', confidence: 1, translation: '' })

        AppendToMessageLog({ message: currentMessage, userSent: true })

        const correction = await GetCorrection(currentMessage)

        if (
            correction.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¿?¡]/g, '').trim() !=
            currentMessage.text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¿?¡]/g, '').trim()
        ) {
            AppendToMessageLog({
                message: { text: `Correction: ${correction}`, confidence: 1, translation: '' },
                userSent: false,
            })
        }

        const response = await SendMessage(currentMessage)
        AppendToMessageLog({ message: response, userSent: false })
    }

    return (
        <button className="bg-blue rounded-full w-20 h-20" {...props} onClick={OnSendPressed}>
            <SendIcon className="text-shell" sx={{ fontSize: '43px' }} />
        </button>
    )
}

export default SendButton
