import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import TextToSpeech from '../../util/textToSpeech'

interface MessageLogItemProps extends React.HTMLAttributes<HTMLElement> {
    messageLogItem: MessageLogItem
}

const MessageLogItem: React.FC<MessageLogItemProps> = ({ messageLogItem, ...props }) => {
    return (
        <div
            className={`${
                messageLogItem.userSent ? 'self-end bg-light-blue' : 'self-start bg-white'
            } p-8 rounded-[19px] max-w-[400px] relative`}
            {...props}
        >
            <p className={`font-dosis text-4xl ${messageLogItem.userSent ? 'text-shell' : 'text-blue'}`}>
                {messageLogItem.message}
            </p>
            <button
                className={`absolute bottom-0 ${messageLogItem.userSent ? 'left-0' : 'right-0'} m-2`}
                onClick={() => {
                    TextToSpeech(messageLogItem.message)
                }}
            >
                <VolumeUpIcon className={`${messageLogItem.userSent ? 'text-shell' : 'text-blue'}`} />
            </button>
        </div>
    )
}

export default MessageLogItem