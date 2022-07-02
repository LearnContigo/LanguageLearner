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

    let {data} = await axios.post('https://api.openai.com/v1/completions', {
        model: "text-curie-001",
        prompt: `A conversation in english:
        You: Yo man.
        Friend: Hey, how you doing?
        You: Im alex.
        Friend: Im josh.
        You:${req.body.message}
        Friend:`,
        max_tokens: 60,
        temperature: 0.7,
        top_p: 1,
        n: 1,
        stream: false,
        logprobs: null,
        stop: 'You:'
    }, headers);

    res.status(200).send(data);
}