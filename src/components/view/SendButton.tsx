import SendIcon from '@mui/icons-material/Send'
import { PropsWithChildren } from 'react'

const SendButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...props }) => {
    return (
        <button className="bg-blue rounded-full w-20 h-20" {...props}>
            <SendIcon className="text-shell" sx={{ fontSize: '43px' }} />
        </button>
    )
}

export default SendButton
