import { PropsWithChildren } from "react"

interface MessageProps {
    message: {message: string, confidence: number}
}

const Message : React.FC<PropsWithChildren<MessageProps>> = ({message}) => {

    return (
        <p className={`${message.confidence < 0.66 ? "underline decoration-wavy decoration-[#09d639]" : ""}`}>{message.message}</p>
    );

}

export default Message