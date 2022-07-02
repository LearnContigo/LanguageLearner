export {};

declare global {
    
    interface Confidences {
        DisplayText: string
        NBest: {Confidence: number}[]
    }
    
    interface Message {
        message: string
        confidence: number
    }

}