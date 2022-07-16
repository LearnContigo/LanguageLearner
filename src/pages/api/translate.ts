import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import 'dotenv/config'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const translationKey = process.env.TEXT_TRANSLATION_KEY;
    const speechRegion = process.env.SPEECH_REGION;

    if (!translationKey || !speechRegion)
        return res.status(400).send('Speech Key or Region Not Provided')

    const config = {
        headers: {
            "Ocp-Apim-Subscription-Key": translationKey,
            "Ocp-Apim-Subscription-Region": speechRegion,
            "Content-Type": "application/json; charset=UTF-8",
        },
        params: {
            "api-version": "3.0",
            "from": "es",
            "to": ["en"]
        },
        data: [
            { 'text': req.body.userMessage },
            { 'text': req.body.response }
        ]
    };

    try {
        const response = await axios.post(
            `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0`, config.data,
            {
                headers: config.headers,
                params: config.params
            }
        );
        res.send({ translation: response.data });
    } catch (err) {
        res.status(401).send(err);
    }

}