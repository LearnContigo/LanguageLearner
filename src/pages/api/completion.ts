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

      console.log(req.body.message);

    let {data} = await axios.post('https://api.openai.com/v1/completions', {
        model: "text-davinci-002",
        prompt: `An Engaging Discussion about sports: 
        ${req.body.message}`,
        max_tokens: 30,
        temperature: 0,
        top_p: 1,
        n: 1,
        stream: false,
        logprobs: null,
    }, headers);

    res.status(200).send(data);
}