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
try {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully");
} catch (error) {
    console.error("Error initializing Firebase:", error);
}

// Initialize Firebase Authentication
let auth;
try {
    auth = firebase.auth();
    console.log("Firebase Auth initialized successfully");
} catch (error) {
    console.error("Error initializing Firebase Auth:", error);
}

// Initialize Firebase Storage
let storage;
try {
    storage = firebase.storage();
    console.log("Firebase Storage initialized successfully");
} catch (error) {
    console.error("Error initializing Firebase Storage:", error);
}

// Function to sign in anonymously
function signInAnonymously() {
    if (auth) {
        auth.signInAnonymously()
            .then(() => {
                console.log("Signed in anonymously");
            })
            .catch((error) => {
                console.error("Error signing in anonymously:", error);
            });
    } else {
        console.error("Firebase Auth is not available");
    }
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', (event) => {
    signInAnonymously();
});

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
    if (storage) {
        const storageRef = storage.ref('menu_photos/' + file.name);
        
        storageRef.put(file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            // You can add more code here to handle successful uploads
        }).catch((error) => {
            console.error('Upload failed:', error);
        });
    } else {
        console.error("Firebase Storage is not available");
    }
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
