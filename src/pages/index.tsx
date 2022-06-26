import type { NextPage } from 'next'
import SpeechToText from '../components/SpeechToText'
import { ConversationProvider } from '../components/ConversationContext'

const Home: NextPage = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <ConversationProvider><SpeechToText /></ConversationProvider>
    </div>
  )
}

export default Home
