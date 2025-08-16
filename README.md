# Multi-Platform Video Downloader Website

## Description
A modern, responsive website for downloading videos from Facebook, YouTube, and Instagram Reels.

## Features
- **Facebook Video Downloader** - Download Facebook videos in HD, SD, and MP3 formats
- **YouTube Video Downloader** - Download YouTube videos in multiple qualities (1080p, 720p, 360p) and MP3
- **Instagram Reels Downloader** - Download Instagram Reels in HD, SD, and MP3 formats
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Modern UI** - Clean, fast-loading interface with smooth animations
- **SEO Optimized** - Proper meta tags and structure for search engines

## File Structure
```
├── index.js                 # Main server file (Node.js/Express)
├── package.json            # Dependencies and project info
├── public/                 # Frontend files
│   ├── index.html          # Homepage (landing page)
│   ├── facebook.html       # Facebook downloader page
│   ├── youtube.html        # YouTube downloader page
│   ├── instagram.html      # Instagram downloader page
│   ├── styles.css          # Homepage styles
│   ├── facebook-styles.css # Facebook page styles
│   ├── youtube-styles.css  # YouTube page styles
│   ├── instagram-styles.css# Instagram page styles
│   ├── facebook-script.js  # Facebook page functionality
│   ├── youtube-script.js   # YouTube page functionality
│   └── instagram-script.js # Instagram page functionality
└── README.md              # This file
```

## Installation on Hostinger

### Step 1: Upload Files
1. Extract this zip file
2. Upload all files to your Hostinger hosting directory (usually public_html)

### Step 2: Install Dependencies
SSH into your Hostinger account and run:
```bash
npm install
```

### Step 3: Start the Application
```bash
node index.js
```

### Step 4: Configure Domain
- The application runs on port 5000 by default
- Configure your Hostinger settings to point to this port
- Or modify the PORT in index.js to match Hostinger's requirements

## Local Development

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation
1. Extract the zip file
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   node index.js
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## Usage
1. Visit the homepage to see all available downloaders
2. Click on the platform you want to download from
3. Paste the video URL into the input field
4. Click the "Download" button
5. Choose your preferred format and quality
6. Click the download button for your chosen format

## API Endpoints
- `GET /` - Homepage
- `GET /facebook` - Facebook downloader page
- `GET /youtube` - YouTube downloader page
- `GET /instagram` - Instagram downloader page
- `POST /api/download` - Facebook video processing
- `POST /api/youtube-download` - YouTube video processing
- `POST /api/instagram-download` - Instagram reel processing

## Tech Stack
- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Dependencies**: CORS, Axios for HTTP requests
- **UI**: Font Awesome icons, CSS Grid/Flexbox

## Important Notes

### For Production Use
- This is a demo application with mock data
- For real video downloading, you'll need to integrate with:
  - Facebook Graph API for Facebook videos
  - YouTube Data API v3 for YouTube videos
  - Instagram Basic Display API for Instagram content
- Implement proper video processing libraries like `ytdl-core`, `facebook-video-downloader`, etc.
- Add rate limiting and security measures
- Implement proper error handling and logging

### Legal Disclaimer
- This tool is for personal use only
- Respect platform terms of service
- Don't download copyrighted content without permission
- We do not host or store any videos

## Customization
- Modify CSS files to change the appearance
- Update API endpoints in JavaScript files
- Add new platforms by creating new HTML/CSS/JS files
- Customize meta tags for better SEO

## Support
This is a demo application. For production use, you'll need to implement actual video downloading functionality using appropriate APIs and libraries.

## License
This project is for educational purposes. Please ensure compliance with platform terms of service and copyright laws.
