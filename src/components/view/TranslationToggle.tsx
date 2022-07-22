import { useConversation } from '../ConversationContext'
import CheckIcon from '@mui/icons-material/Check'

const TranslationToggle: React.FC = () => {
    const { translateText, toggleTranslate } = useConversation()

    return (
        <div className="mt-3">
            <label className=" font-dosis text-2xl text-blue">Show Translations</label>
            <br />

            <div className="relative mt-2">
                <button
                    className={`absolute top-0 left-0 cursor-pointer border border-blue ${
                        translateText ? 'bg-blue' : 'bg-shell'
                    }  h-8 w-8 rounded-md`}
                    onClick={toggleTranslate}
                >
                    <CheckIcon className="text-shell" />
                </button>
            </div>
        </div>
    )
}

export default TranslationToggle
