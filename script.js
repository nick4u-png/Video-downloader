
document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('videoUrl');
    const downloadBtn = document.getElementById('downloadBtn');
    const loading = document.getElementById('loading');
    const results = document.getElementById('results');
    const videoThumbnail = document.getElementById('videoThumbnail');
    const videoTitle = document.getElementById('videoTitle');
    const videoDuration = document.getElementById('videoDuration');
    
    let currentVideoData = null;

    // Download button click handler
    downloadBtn.addEventListener('click', handleDownload);
    
    // Enter key handler for input
    urlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleDownload();
        }
    });

    // Download option button handlers
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const quality = this.dataset.quality;
            handleOptionDownload(quality);
        });
    });

    async function handleDownload() {
        const url = urlInput.value.trim();
        
        if (!url) {
            showError('Please enter a Facebook video URL');
            return;
        }

        if (!isValidFacebookUrl(url)) {
            showError('Please enter a valid Facebook video URL');
            return;
        }

        showLoading(true);
        hideResults();
        
        try {
            const response = await fetch('/api/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to process video');
            }

            currentVideoData = data;
            displayResults(data);
            
        } catch (error) {
            console.error('Download error:', error);
            showError(error.message || 'Failed to process video. Please try again.');
        } finally {
            showLoading(false);
        }
    }

    function handleOptionDownload(quality) {
        if (!currentVideoData || !currentVideoData.downloadLinks) {
            showError('No download data available');
            return;
        }

        const downloadUrl = currentVideoData.downloadLinks[quality];
        
        if (!downloadUrl) {
            showError('Download link not available for this quality');
            return;
        }

        // Animate button
        const btn = document.querySelector(`[data-quality="${quality}"]`);
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);

        // In a real implementation, you would handle the actual download here
        // For demo purposes, we'll show an alert
        showSuccess(`Download started for ${quality.toUpperCase()} quality`);
        
        // Simulate download (in production, this would be a real download)
        // window.open(downloadUrl, '_blank');
    }

    function displayResults(data) {
        videoThumbnail.src = data.thumbnail;
        videoThumbnail.alt = data.title;
        videoTitle.textContent = data.title;
        videoDuration.textContent = `Duration: ${data.duration}`;
        
        showResults();
    }

    function showLoading(show) {
        if (show) {
            loading.classList.remove('hidden');
            downloadBtn.disabled = true;
            downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        } else {
            loading.classList.add('hidden');
            downloadBtn.disabled = false;
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download';
        }
    }

    function showResults() {
        results.classList.remove('hidden');
        results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function hideResults() {
        results.classList.add('hidden');
    }

    function isValidFacebookUrl(url) {
        const facebookPatterns = [
            /facebook\.com/,
            /fb\.com/,
            /m\.facebook\.com/,
            /www\.facebook\.com/
        ];
        
        return facebookPatterns.some(pattern => pattern.test(url));
    }

    function showError(message) {
        // Create and show error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        
        // Add error styles
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4757;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(errorDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            errorDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(errorDiv);
            }, 300);
        }, 3000);
    }

    function showSuccess(message) {
        // Create and show success notification
        const successDiv = document.createElement('div');
        successDiv.className = 'success-notification';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        // Add success styles
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2ed573;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(successDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            successDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(successDiv);
            }, 300);
        }, 3000);
    }

    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
