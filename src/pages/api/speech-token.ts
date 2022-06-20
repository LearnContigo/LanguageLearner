import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import 'dotenv/config'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Content-Type", "application/json");

    const speechKey = process.env.SPEECH_KEY;
    const speechRegion = process.env.SPEECH_REGION;

    if (!speechKey || ! speechRegion)
        return res.status(400).send('Speech Key or Region Not Provided')

    const headers = {
      headers: {
        "Ocp-Apim-Subscription-Key": speechKey,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    try {
        const tokenResponse = await axios.post(
          `https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
          null,
          headers
        );
        res.send({ token: tokenResponse.data, region: speechRegion });
    } catch (err) {
        res.status(401).send("There was an error authorizing your speech key.");
    }

}