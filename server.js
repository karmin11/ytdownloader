const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/download', async (req, res) => {
    const url = req.body.url;
    if (!ytdl.validateURL(url)) {
        return res.status(400).json({ error: 'Invalid URL' });
    }
    try {
        const info = await ytdl.getInfo(url);
        const format = ytdl.chooseFormat(info.formats, { quality: 'highest' });
        res.json({ downloadUrl: format.url });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch video info' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
