import * as React from 'react'
import MessageLogItem from './view/MessageLogItem'

interface MessageLogProps extends React.HTMLAttributes<HTMLElement> {
    messageLog: MessageLogItem[]
}

export const MessageLog: React.FC<MessageLogProps> = ({ messageLog, ...props }) => {
    const listRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        const scrollToLastMessage = () => {
            if (!listRef.current) return
            let lastMessage = listRef.current.lastElementChild
            lastMessage?.scrollIntoView({
                block: 'end',
                inline: 'nearest',
                behavior: 'smooth',
            })
        }

        scrollToLastMessage()
    }, [listRef, messageLog])

    return (
        <div className="flex flex-col w-full mb-auto overflow-auto" {...props} ref={listRef}>
            {messageLog.map((logItem, index) => {
                return <MessageLogItem messageLogItem={logItem} key={index} />
            })}
        </div>
    )
}
