import * as React from 'react'

interface MessageLogProps extends React.HTMLAttributes<HTMLElement> {
    messageLog: MessageLogItem[]
}

export const MessageLog: React.FC<MessageLogProps> = ({ messageLog, ...props }) => {
    return (
        <div {...props}>
            {messageLog.map((logItem, index) => {
                return (
                    <div key={index}>
                        {logItem.userSent ? 'You: ' : 'Contigo: '}
                        <div className={`border ${logItem.userSent ? 'border-red-400' : 'border-purple-400'} border-4`}>
                            {logItem.message}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
