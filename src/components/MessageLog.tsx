import * as React from 'react';

interface MessageLogProps {
    messageLog: MessageLogItem[]
}

export const MessageLog: React.FC<MessageLogProps> =  ({ messageLog }) => {

    return (
      <div>
        {messageLog.map((logItem, index) => {
          return (<div key={index}>{logItem.userSent ? "You: " : "Contigo: "}<div className={`border ${logItem.userSent ? "border-red-400" : "border-purple-400"} border-4`}>{logItem.message}</div></div>)
        })}
      </div>
    );
}