
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve Facebook page
app.get('/facebook', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'facebook.html'));
});

// Serve YouTube page
app.get('/youtube', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'youtube.html'));
});

// Serve Instagram page
app.get('/instagram', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'instagram.html'));
});

// Facebook video download endpoint
app.post('/api/download', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url || !url.includes('facebook.com')) {
      return res.status(400).json({ error: 'Please provide a valid Facebook video URL' });
    }

    // Extract video ID from Facebook URL
    const videoId = extractVideoId(url);
    if (!videoId) {
      return res.status(400).json({ error: 'Could not extract video ID from URL' });
    }

    // Mock video data (in production, you'd use Facebook Graph API or web scraping)
    const videoData = {
      title: 'Sample Facebook Video',
      thumbnail: 'https://via.placeholder.com/400x300/1877f2/ffffff?text=FB+Video',
      duration: '2:30',
      downloadLinks: {
        hd: `https://example.com/download/hd/${videoId}`,
        sd: `https://example.com/download/sd/${videoId}`,
        mp3: `https://example.com/download/mp3/${videoId}`
      }
    };

    res.json(videoData);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to process video. Please try again.' });
  }
});

// YouTube video download endpoint
app.post('/api/youtube-download', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be'))) {
      return res.status(400).json({ error: 'Please provide a valid YouTube video URL' });
    }

    // Extract video ID from YouTube URL
    const videoId = extractYouTubeId(url);
    if (!videoId) {
      return res.status(400).json({ error: 'Could not extract video ID from URL' });
    }

    // Mock video data (in production, you'd use YouTube Data API)
    const videoData = {
      title: 'Amazing YouTube Video',
      channel: 'YouTube Channel',
      thumbnail: 'https://via.placeholder.com/400x300/ff0000/ffffff?text=YouTube+Video',
      duration: '5:30',
      downloadLinks: {
        '1080p': `https://example.com/download/yt-1080p/${videoId}`,
        '720p': `https://example.com/download/yt-720p/${videoId}`,
        '360p': `https://example.com/download/yt-360p/${videoId}`,
        mp3: `https://example.com/download/yt-mp3/${videoId}`
      }
    };

    res.json(videoData);
  } catch (error) {
    console.error('YouTube download error:', error);
    res.status(500).json({ error: 'Failed to process video. Please try again.' });
  }
});

// Instagram reels download endpoint
app.post('/api/instagram-download', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url || (!url.includes('instagram.com') && !url.includes('instagr.am'))) {
      return res.status(400).json({ error: 'Please provide a valid Instagram Reels URL' });
    }

    // Extract reel ID from Instagram URL
    const reelId = extractInstagramId(url);
    if (!reelId) {
      return res.status(400).json({ error: 'Could not extract reel ID from URL' });
    }

    // Mock reel data (in production, you'd use Instagram API or web scraping)
    const reelData = {
      caption: 'Amazing Instagram Reel',
      username: 'instagram_user',
      thumbnail: 'https://via.placeholder.com/400x400/833ab4/ffffff?text=IG+Reel',
      duration: '0:15',
      downloadLinks: {
        hd: `https://example.com/download/ig-hd/${reelId}`,
        sd: `https://example.com/download/ig-sd/${reelId}`,
        mp3: `https://example.com/download/ig-mp3/${reelId}`
      }
    };

    res.json(reelData);
  } catch (error) {
    console.error('Instagram download error:', error);
    res.status(500).json({ error: 'Failed to process reel. Please try again.' });
  }
});

function extractVideoId(url) {
  // Simple video ID extraction (you'd need more robust parsing in production)
  const matches = url.match(/\/videos\/(\d+)/);
  return matches ? matches[1] : Date.now().toString();
}

function extractYouTubeId(url) {
  // Simple YouTube ID extraction (you'd need more robust parsing in production)
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/
  ];
  
  for (const pattern of patterns) {
    const matches = url.match(pattern);
    if (matches) return matches[1];
  }
  
  return Date.now().toString();
}

function extractInstagramId(url) {
  // Simple Instagram ID extraction (you'd need more robust parsing in production)
  const matches = url.match(/\/(p|reel|tv)\/([A-Za-z0-9_-]+)/);
  return matches ? matches[2] : Date.now().toString();
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
