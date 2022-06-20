import type { NextPage } from 'next'
import SpeechToText from '../components/SpeechToText'

const Home: NextPage = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <SpeechToText />
    </div>
  )
}

export default Home
