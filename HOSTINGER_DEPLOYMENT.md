# Hostinger Deployment Guide

## Quick Setup for Hostinger

### 1. Upload Files
- Extract the website.zip file
- Upload all contents to your Hostinger File Manager in the public_html directory

### 2. Install Node.js (if not already installed)
- In Hostinger control panel, go to Advanced > Node.js
- Enable Node.js for your domain
- Select the latest stable version

### 3. Install Dependencies
Open Terminal in Hostinger and run:
```bash
cd public_html
npm install
```

### 4. Configure the Application
- Open index.js and ensure the port is set correctly for Hostinger
- Most Hostinger plans use specific ports - check your hosting plan
- You might need to change: `const PORT = process.env.PORT || 3000;`

### 5. Start the Application
```bash
node index.js
```

### 6. Set up Process Manager (Recommended)
For production, use PM2 to keep your app running:
```bash
npm install -g pm2
pm2 start index.js --name "video-downloader"
pm2 save
pm2 startup
```

### 7. Domain Configuration
- In Hostinger control panel, configure your domain to point to the Node.js application
- Set the startup file to index.js
- Set the application root to public_html

## Troubleshooting

### Common Issues:
1. **Port conflicts**: Change the port in index.js if needed
2. **Module not found**: Run `npm install` again
3. **Permission errors**: Check file permissions in File Manager
4. **App not starting**: Check Hostinger's Node.js logs in control panel

### Production Optimizations:
- Enable gzip compression
- Set up SSL certificate
- Configure caching headers
- Optimize images and assets
- Set up monitoring and logging

## Need Help?
- Check Hostinger's Node.js documentation
- Contact Hostinger support for hosting-specific issues
- Review the main README.md for application details
