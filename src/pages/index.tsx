import type { NextPage } from 'next'
import SpeechToText from '../components/SpeechToText'
import { ConversationProvider } from '../components/ConversationContext'
import Settings from '../components/Settings'
import Nav from '../components/view/Nav'

const Home: NextPage = () => {
    return (
        <div className="bg-shell w-full min-h-screen flex flex-col">
            <Nav />
            <ConversationProvider>
                <div className="flex max-h-[89vh] w-full grow">
                    <Settings />
                    <SpeechToText />
                </div>
            </ConversationProvider>
        </div>
    )
}

export default Home
