interface MessageLogItemProps extends React.HTMLAttributes<HTMLElement> {
    messageLogItem: MessageLogItem
}

const MessageLogItem: React.FC<MessageLogItemProps> = ({ messageLogItem, ...props }) => {
    return (
        <div
            className={`${
                messageLogItem.userSent ? 'self-end bg-light-blue' : 'self-start bg-white'
            } p-8 rounded-[19px] max-w-[400px]`}
            {...props}
        >
            <p className={`font-dosis text-4xl ${messageLogItem.userSent ? 'text-shell' : 'text-blue'}`}>
                {messageLogItem.message}
            </p>
        </div>
    )
}

export default MessageLogItem
