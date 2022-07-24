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

    let prompt = `Correct this to standard Spanish:
    ${req.body.text}
    `

    let { data } = await axios.post(
        'https://api.openai.com/v1/completions',
        {
            model: 'text-davinci-002',
            prompt,
            temperature: 0,
            max_tokens: 60,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        },
        headers
    )
    res.status(200).send(data)
}
