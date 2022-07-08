import HelpIcon from '@mui/icons-material/Help'
import { PropsWithChildren } from 'react'

const HelpButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...props }) => {
    return (
        <button className="bg-blue rounded-full w-20 h-20" {...props}>
            <HelpIcon className="text-[#F0F0F0] text-[55px]" />
        </button>
    )
}

export default HelpButton
