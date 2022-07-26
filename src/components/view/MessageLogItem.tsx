import { useEffect, useState } from 'react'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import TextToSpeech from '../../util/textToSpeech'
import { useConversation } from '../ConversationContext'
import axios from 'axios'

interface MessageLogItemProps extends React.HTMLAttributes<HTMLElement> {
    messageLogItem: MessageLogItem
}

const MessageLogItem: React.FC<MessageLogItemProps> = ({ messageLogItem, ...props }) => {
    const { translateText, prosodyAttributes } = useConversation()
    const [translation, setTranslation] = useState('')

    useEffect(() => {
        const fetchTranslation = async () => {
            const translationsResponse = await axios.post('/api/translate', {
                message: messageLogItem.message.text,
            })
            setTranslation(translationsResponse?.data?.translation[0]?.translations[0]?.text)
        }

        fetchTranslation()
    }, [])

    return (
        <div
            className={`${
                messageLogItem.userSent ? 'self-end bg-light-blue' : 'self-start bg-white'
            } p-6 md:p-8 rounded-[19px] max-w-[400px] relative m-2`}
            {...props}
        >
            <p className={`font-dosis text-lg md:text-4xl ${messageLogItem.userSent ? 'text-shell' : 'text-blue'} `}>
                {messageLogItem.message.text}
            </p>

            <p
                className={`font-dosis text-xs md:text-xl ${translateText ? 'visible' : 'invisible'} ${
                    messageLogItem.userSent ? 'text-shell' : 'text-blue'
                } `}
            >
                {translation}
            </p>

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
