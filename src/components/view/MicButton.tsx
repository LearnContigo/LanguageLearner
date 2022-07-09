import MicIcon from '@mui/icons-material/Mic'
import CancelIcon from '@mui/icons-material/Cancel'

interface MicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    listening: boolean
}

const MicButton: React.FC<MicButtonProps> = ({ listening, ...props }) => {
    return (
        <button className="bg-blue rounded-full w-24 h-24" {...props}>
            {listening ? (
                <CancelIcon className="text-shell" sx={{ fontSize: '65px' }} />
            ) : (
                <MicIcon className="text-shell" sx={{ fontSize: '65px' }} />
            )}
        </button>
    )
}

export default MicButton
