// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOtngL7Tc9qcRPPhXpsS0uaC7O8IFv7DM",
    authDomain: "youchews-e12e5.firebaseapp.com",
    databaseURL: "https://youchews-e12e5-default-rtdb.firebaseio.com",
    projectId: "youchews-e12e5",
    storageBucket: "youchews-e12e5.appspot.com",
    messagingSenderId: "629252636983",
    appId: "1:629252636983:web:106d8df8a274e464341ab2",
    measurementId: "G-RCR2KKPX4R"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

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
