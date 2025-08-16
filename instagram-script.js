
document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('reelUrl');
    const downloadBtn = document.getElementById('downloadBtn');
    const loading = document.getElementById('loading');
    const results = document.getElementById('results');
    const reelThumbnail = document.getElementById('reelThumbnail');
    const reelCaption = document.getElementById('reelCaption');
    const reelUsername = document.getElementById('reelUsername');
    const reelDuration = document.getElementById('reelDuration');
    
    let currentReelData = null;

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
            showError('Please enter an Instagram Reels URL');
            return;
        }

        if (!isValidInstagramUrl(url)) {
            showError('Please enter a valid Instagram Reels URL');
            return;
        }

        showLoading(true);
        hideResults();

        try {
            const response = await fetch('/api/instagram-download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to process reel');
            }

            currentReelData = data;
            displayResults(data);
            showSuccess('Reel processed successfully!');
        } catch (error) {
            console.error('Download error:', error);
            showError(error.message || 'Failed to process reel. Please try again.');
        } finally {
            showLoading(false);
        }
    }

    function handleOptionDownload(quality) {
        if (!currentReelData) {
            showError('No reel data available');
            return;
        }

        const downloadUrl = currentReelData.downloadLinks[quality];
        if (downloadUrl) {
            // Create a temporary download link
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = `instagram-reel-${quality}.${quality === 'mp3' ? 'mp3' : 'mp4'}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            showSuccess(`Download started for ${quality.toUpperCase()} format!`);
        } else {
            showError(`${quality.toUpperCase()} format not available`);
        }
    }

    function displayResults(data) {
        reelThumbnail.src = data.thumbnail;
        reelCaption.textContent = data.caption || 'Instagram Reel';
        reelUsername.textContent = `@${data.username || 'instagram_user'}`;
        reelDuration.textContent = `Duration: ${data.duration || 'Unknown'}`;
        
        showResults();
    }

    function isValidInstagramUrl(url) {
        const instagramPattern = /^https?:\/\/(www\.)?(instagram\.com|instagr\.am)\/(p|reel|tv)\/[A-Za-z0-9_-]+/;
        return instagramPattern.test(url);
    }

    function showLoading(show) {
        if (show) {
            loading.classList.remove('hidden');
        } else {
            loading.classList.add('hidden');
        }
    }

    function showResults() {
        results.classList.remove('hidden');
    }

    function hideResults() {
        results.classList.add('hidden');
    }

    function showError(message) {
        showNotification(message, 'error');
    }

    function showSuccess(message) {
        showNotification(message, 'success');
    }

    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(n => n.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add to body
        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease forwards;
            max-width: 400px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        .notification.success {
            background: linear-gradient(45deg, #4CAF50, #45a049);
        }
        
        .notification.error {
            background: linear-gradient(45deg, #f44336, #da190b);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification i {
            font-size: 1.2rem;
        }
        
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

        @media (max-width: 480px) {
            .notification {
                top: 10px;
                right: 10px;
                left: 10px;
                max-width: none;
            }
        }
    `;
    document.head.appendChild(style);
});
