import { useState } from 'react'
import RangeSliders from './view/RangeSliders'
import TranslationToggle from './view/TranslationToggle'
import SettingsIcon from '@mui/icons-material/Settings'

const Settings: React.FC = () => {
    return (
        <>
            <DesktopSettings /> <MobileSettings />
        </>
    )
}

const MobileSettings: React.FC = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className="xl:hidden block overflow-none z-50">
            <button className="z-50 absolute right-0 top-0 m-6" onClick={() => setOpen(o => !o)}>
                <SettingsIcon className="text-blue" sx={{ fontSize: '65px' }} />
            </button>

            <div
                className={`w-screen h-screen bg-shell top-0 absolute flex flex-col p-8 justify-center right-0 top-0 ${
                    open ? 'visible' : 'invisible'
                }`}
            >
                <RangeSliders />
                <TranslationToggle />
            </div>
        </div>
    )
}

const DesktopSettings: React.FC = () => {
    return (
        <div className="hidden xl:block xl:absolute top-1/4 ml-16 w-[250px]">
            <RangeSliders />
            <TranslationToggle />
        </div>
    )
}

export default Settings
