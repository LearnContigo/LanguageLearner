import { useConversation } from '../ConversationContext'

const MessageBox: React.FC = () => {
    const { currentMessage: message } = useConversation()

    return (
        <div className="bg-white w-full max-w-[586px] h-[139px] m-4 p-8 rounded-[19px] shadow-[0_4px_4px_1px_rgba(0,0,0,0.25)] overflow-auto ">
            <p
                className={`font-dosis text-4xl text-blue text-center ${
                    message.confidence < 0.66 ? 'underline decoration-wavy decoration-[#09d639]' : ''
                }`}
            >
                {message.text}
            </p>
        </div>
    )
}

export default MessageBox
