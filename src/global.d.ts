export {};

declare global {
    
    interface Confidences {
        DisplayText: string
        NBest: {Confidence: number}[]
    }
    
    interface Message {
        text: string
        confidence: number
        translation: string
    }

    interface MessageLogItem {
        message: Message
        userSent: boolean
    }
    

}