import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const targetUrl = process.env.TARGET_URL;

        if (!targetUrl) {
            return res.status(500).json({ error: 'Backend not configured' });
        }

        try {
            const headers = { ...req.headers };

            delete headers['host'];
            delete headers['content-length'];

            await axios.post(targetUrl, req.body, { headers });

            res.status(200).json({ message: 'Ok' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
