import * as React from 'react'
import MessageLogItem from './view/MessageLogItem'
import { useConversation } from './ConversationContext'

export const MessageLog: React.FC = ({ ...props }) => {
    const { messageLog } = useConversation()

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
        <div className="flex flex-col w-full z-0 max-w-[800px] mb-auto overflow-auto" {...props} ref={listRef}>
            {messageLog.map((logItem, index) => {
                return <MessageLogItem messageLogItem={logItem} key={index} />
            })}
        </div>
    )
}
