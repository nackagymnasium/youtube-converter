import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp3');
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!url) {
      alert('Please enter a valid URL');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/download?url=${encodeURIComponent(url)}&format=${format}`);
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `video.${format}`;
      link.click();
    } catch (error) {
      alert('Failed to download the video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>YouTube to MP3/MP4 Converter</title>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <div className="container">
        <img src="/logo.png" alt="Site Logo" style={{ width: '100px', marginBottom: '1rem' }} />
        <h1>YouTube to {format.toUpperCase()} Converter</h1>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: '80%' }}
        />
        <br />
        <div>
          <label className="radio-label">
            <input
              type="radio"
              value="mp3"
              checked={format === 'mp3'}
              onChange={() => setFormat('mp3')}
            />
            MP3
          </label>
          <label className="radio-label">
            <input
              type="radio"
              value="mp4"
              checked={format === 'mp4'}
              onChange={() => setFormat('mp4')}
            />
            MP4
          </label>
        </div>
        <br />
        <button onClick={handleDownload} disabled={loading}>
          {loading ? 'Processing...' : 'Download'}
        </button>
      </div>
    </>
  );
}
