window.addEventListener('load', function () {
    var overlay = document.getElementById('overlay');
    var overlayButton = document.getElementById('overlay-button');

    overlayButton.addEventListener('click', function () {
        overlay.style.display = 'none';
    });
});  

// Function to upload file to Google Drive
function uploadFileToDrive(media) {
    var fileMetadata = {
        'name': 'ID_name.jpg'
    };
    var driveApiClient = gapi.client.drive.files;
    var request = driveApiClient.create({
        resource: fileMetadata,
        media: {
            mimeType: 'image/jpeg',
            body: media
        }
    });
    request.execute(function (file) {
        console.log('File ID: ' + file.id);
        var fileUrl = 'https://drive.google.com/uc?id=' + file.id;
        var linkElement = document.createElement('a');
        linkElement.href = fileUrl;
        linkElement.target = '_blank';
        linkElement.innerHTML = 'Google Drive Link';
        document.body.appendChild(linkElement);
    });
}
  
// Function to take screenshot of the entered URL and upload to Google Drive
function takeScreenshot() {
    var linkInputElement = document.getElementById('link-input');
    var url = linkInputElement.value;
    if (url.trim() === '') {
        alert('Please enter a valid URL.');
        return;
    }
    var apiUrl = 'https://api.screenshotmachine.com?';
    apiUrl += 'key=7e4650';
    apiUrl += '&url=' + encodeURIComponent(url);
    apiUrl += '&dimension=1920x1080';
    apiUrl += '&format=JPG';

    console.log('apiUrl: ' + apiUrl);

    var apiRequest = new XMLHttpRequest();
    apiRequest.open('GET', apiUrl, true);
    apiRequest.responseType = 'blob';
    apiRequest.onload = function () {
        if (this.status === 200) {
            uploadFileToDrive(this.response);
        } else {
            console.error('Error taking screenshot:', this.statusText);
            alert('Error taking screenshot. Please try again later.');
        }
    };
    apiRequest.onerror = function () {
        console.error('Error taking screenshot:', this.statusText);
        alert('Error taking screenshot. Please try again later.');
    };
    apiRequest.send();
}
  