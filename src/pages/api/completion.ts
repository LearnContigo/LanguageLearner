import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import 'dotenv/config'

export default async (req: NextApiRequest, res: NextApiResponse) => {

    const aiKey = process.env.OPEN_AI_KEY;

    const headers = {
        headers: {
          "Authorization": `Bearer ${aiKey}`,
        },
      };


    const context = req.body.context;
    let previousMessages = "";

    for (const message of context) {
      previousMessages += `${message.userSent ? "Human" : "Bot"}: ${message.message.replace(/[\r\n]/gm, '').trim()}\n`
    }

    let prompt = `A conversation in spanish with a bot who is teaching a human spanish:
Human: Hola como estas?
Bot: Soy bueno. ¿Cómo te llamas?
Human: Me llamo Alicia.
Bot: Me llamo Luis.
${previousMessages}
Human:${req.body.message}
Bot:`
    
    console.log(prompt);

    let {data} = await axios.post('https://api.openai.com/v1/completions', {
        model: "text-curie-001",
        prompt,
        max_tokens: 60,
        temperature: 0.7,
        top_p: 1,
        n: 1,
        stream: false,
        logprobs: null,
        stop: 'Human:'
    }, headers);

    res.status(200).send(data);
}