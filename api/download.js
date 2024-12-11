const ytdl = require('ytdl-core');

export default async function handler(req, res) {
  const { url, format } = req.query;

  if (!ytdl.validateURL(url)) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title.replace(/[^a-zA-Z0-9]/g, '_'); // sanitize title

    res.setHeader('Content-Disposition', `attachment; filename="${title}.${format}"`);
    res.setHeader('Content-Type', `video/${format === 'mp4' ? 'mp4' : 'mpeg'}`);

    ytdl(url, { format: format === 'mp4' ? 'mp4' : 'mp3' }).pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process the video' });
  }
}