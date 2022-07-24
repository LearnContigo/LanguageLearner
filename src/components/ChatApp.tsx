import React from 'react'
import { MessageLog } from './MessageLog'
import MessageBox from './view/MessageBox'
import MicButton from './view/MicButton'
import HelpButton from './view/HelpButton'
import SendButton from './view/SendButton'

const ChatApp: React.FC = () => {
    return (
        <div className="flex flex-col items-center grow">
            <MessageLog />
            <MessageBox />

            <div className="flex mb-4 justify-center items-center gap-4">
                <HelpButton />
                <MicButton />
                <SendButton />
            </div>
        </div>
    )
}

export default ChatApp
