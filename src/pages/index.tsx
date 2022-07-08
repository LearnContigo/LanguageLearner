import type { NextPage } from 'next'
import SpeechToText from '../components/SpeechToText'
import { ConversationProvider } from '../components/ConversationContext'
import Nav from '../components/view/Nav'

const Home: NextPage = () => {
    return (
        <div className="bg-shell w-full min-h-screen flex flex-col items-center">
            <Nav />
            <ConversationProvider>
                <SpeechToText />
            </ConversationProvider>
        </div>
    )
}

export default Home
