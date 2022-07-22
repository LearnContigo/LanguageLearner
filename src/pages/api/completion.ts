import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import 'dotenv/config'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const aiKey = process.env.OPEN_AI_KEY

    const headers = {
        headers: {
            Authorization: `Bearer ${aiKey}`,
        },
    }

    const context: MessageLogItem[] = req.body.context
    let previousMessages = ''

    for (const messageLogItem of context) {
        previousMessages += `${messageLogItem.userSent ? 'Human' : 'Bot'}: ${messageLogItem.message.text
            .replace(/[\r\n]/gm, '')
            .trim()}\n`
    }

    let prompt = `A conversation in spanish with a chatty friend named Contigo who is teaching a human spanish, and likes to ask lots of questions about food:
Human: Hola como estas?
Bot: Soy bueno. ¿Cómo te llamas?
Human: Me llamo Alicia.
Bot: Me llamo Contigo.
${previousMessages}
Human:${req.body.text}
Bot:`

    let { data } = await axios.post(
        'https://api.openai.com/v1/completions',
        {
            model: 'text-curie-001',
            prompt,
            max_tokens: 100,
            temperature: 0.9,
            presence_penalty: 0.6,
            top_p: 1,
            n: 1,
            stream: false,
            logprobs: null,
            stop: 'Human:',
        },
        headers
    )
    res.status(200).send(data)
}

/* 

A conversation with a Spanish speaking bot named Contigo that corrects the human's grammar:

Human: Hola como estas?
Correction: None
Bot Response: Soy bueno. ¿Cómo te llamas?
Human: Me llamo Alicia.
Correction: None
Bot Response: Me llamo Contigo.
Human: Yo estas viva
Correction: Yo estoy viva
Response: Yo también
Human: Yo es rapida
Correction: Yo soy rápida
Response: Bueno, me alegra conocerte.

*/
