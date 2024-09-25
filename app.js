// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOPWwpBAtI3lhAy8KbHRPhWefEPZyXrto",
    authDomain: "youchews.firebaseapp.com",
    databaseURL: "https://youchews-default-rtdb.firebaseio.com",
    projectId: "youchews",
    storageBucket: "youchews.appspot.com",
    messagingSenderId: "843273309086",
    appId: "1:843273309086:web:1147f44dfb8f4d96a9248f"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// Ensure Firebase Authentication is available
if (firebase.auth) {
    // Authenticate the user (example using anonymous authentication)
    firebase.auth().signInAnonymously().catch(function(error) {
        console.error('Authentication failed:', error);
    });
} else {
    console.error('Firebase Authentication is not available.');
}

// Drag and drop functionality
let dropArea = document.getElementById('drop-area');

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;
    handleFiles(files);
}

function handleFiles(files) {
    files = [...files];
    files.forEach(previewFile);
    files.forEach(uploadFile);
}

function previewFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
        let img = document.createElement('img');
        img.src = reader.result;
        document.getElementById('gallery').appendChild(img);
    }
}

function uploadFile(file) {
    let storageRef = storage.ref('menu_photos/' + file.name);
    let uploadTask = storageRef.put(file);

    uploadTask.on('state_changed',
        function progress(snapshot) {
            // You can add a progress bar here if you like
        },
        function error(err) {
            console.error('Upload failed:', err);
        },
        function complete() {
            console.log('Upload successful:', file.name);
        }
    );
}

// Add a new function to handle the upload to Vision API
async function uploadToVisionAPI() {
    const images = document.querySelectorAll('#gallery img');
    for (let img of images) {
        try {
            const response = await fetch(img.src);
            const blob = await response.blob();
            const visionAPIResponse = await sendToVisionAPI(blob);
            console.log('Vision API response:', visionAPIResponse);
        } catch (err) {
            console.error('Error uploading to Vision API:', err);
        }
    }
}

// Add a placeholder function to send the image to the Vision API
async function sendToVisionAPI(imageBlob) {
    const formData = new FormData();
    formData.append('image', imageBlob);

    const response = await fetch('https://your-vision-api-url', {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
}
