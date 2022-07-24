import MicIcon from '@mui/icons-material/Mic'
import CancelIcon from '@mui/icons-material/Cancel'
import ReplayIcon from '@mui/icons-material/Replay'

interface MicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    listening: boolean
    message?: string
}

const MicButton: React.FC<MicButtonProps> = ({ listening, message, ...props }) => {
    return (
        <button className="bg-blue rounded-full w-24 h-24" {...props}>
            {listening ? (
                <CancelIcon className="text-shell" sx={{ fontSize: '65px' }} />
            ) : message ? (
                <ReplayIcon className="text-shell" sx={{ fontSize: '65px' }} />
            ) : (
                <MicIcon className="text-shell" sx={{ fontSize: '65px' }} />
            )}
        </button>
    )
}

export default MicButton
