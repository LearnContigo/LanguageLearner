import { PropsWithChildren } from "react"
import TextToSpeech from "../util/textToSpeech";
import {Confidences} from './ConversationContext'

interface Message {
    confidences: Confidences
}

const Message : React.FC<PropsWithChildren<Message>> = ({children, confidences}) => {

    const words = confidences.NBest && confidences?.NBest[0]?.Words;

    return (
        <>
        {words && 
        (<div>
            {words.map((word, idx) => <span key={idx} className={`${word.Confidence < 0.8 ? "underline decoration-sky-500 decoration-wavy" : ""}`}>{word.Word} </span>)}
        </div>)}

        </>
    );


}

export default Message