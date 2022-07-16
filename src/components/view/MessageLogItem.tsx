import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import TextToSpeech from '../../util/textToSpeech'
import { useConversation } from '../ConversationContext'

interface MessageLogItemProps extends React.HTMLAttributes<HTMLElement> {
    messageLogItem: MessageLogItem
}

const MessageLogItem: React.FC<MessageLogItemProps> = ({ messageLogItem, ...props }) => {
    const {
        translateText,
        prosodyAttributes
    } = useConversation()

    return (
        <div
            className={`${messageLogItem.userSent ? 'self-end bg-light-blue' : 'self-start bg-white'
                } p-6 md:p-8 rounded-[19px] max-w-[400px] relative m-2`}
            {...props}
        >
            <p className={`font-dosis text-lg md:text-4xl ${messageLogItem.userSent ? 'text-shell' : 'text-blue'} `}>
                {messageLogItem.message.text}
            </p>
            {translateText &&
                <p className={`font-dosis text-xs md:text-xl ${messageLogItem.userSent ? 'text-shell' : 'text-blue'} `}>
                    {messageLogItem.message.translation}
                </p>
            }
            <button
                className={`absolute bottom-0 ${messageLogItem.userSent ? 'left-0' : 'right-0'} m-2`}
                onClick={() => {
                    TextToSpeech(messageLogItem.message.text, prosodyAttributes.rate, prosodyAttributes.pitch)
                }}
            >
                <VolumeUpIcon
                    className={`${messageLogItem.userSent ? 'text-shell' : 'text-blue'} text-sm md:text-2xl`}
                />
            </button>
        </div>
    )
}

export default MessageLogItem
