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
            
            // Process the response (e.g., extract text)
            const extractedText = visionAPIResponse.responses[0].textAnnotations[0].description;
            console.log('Extracted text:', extractedText);
            
            // Split the extracted text into items
            const textItems = extractedText.split('\n').filter(item => item.trim() !== '');
            
            // Create draggable boxes for each text item
            createDraggableBoxes(textItems);
        } catch (err) {
            console.error('Error uploading to Vision API:', err);
        }
    }
}

// Update the createDraggableBoxes function
function createDraggableBoxes(textItems) {
    const container = document.getElementById('text-items-container');
    container.innerHTML = ''; // Clear existing items

    let currentCategory = null;
    let currentItem = null;

    textItems.forEach((line, index) => {
        if (line.match(/^\$\d+(\.\d{2})?$/)) { // If the line is a price
            if (currentItem) {
                currentItem.price = line;
                finalizeCategoryItem();
            }
        } else if (line.match(/^[A-Z][a-z]+(\s+[A-Z][a-z]+)*$/)) { // If the line is a category
            if (currentCategory) {
                finalizeCategory();
            }
            currentCategory = { name: line, items: [] };
        } else {
            if (currentItem) {
                currentItem.description += ' ' + line;
            } else {
                currentItem = { name: line, description: '', price: '' };
            }
        }
    });

    if (currentCategory) {
        finalizeCategory();
    }

    function finalizeCategoryItem() {
        if (currentCategory && currentItem) {
            currentCategory.items.push(currentItem);
            currentItem = null;
        }
    }

    function finalizeCategory() {
        if (currentCategory) {
            finalizeCategoryItem();
            const categoryBox = createCategoryBox(currentCategory);
            container.appendChild(categoryBox);
            currentCategory = null;
        }
    }
}

function createCategoryBox(category) {
    const box = document.createElement('div');
    box.className = 'category-box';
    box.draggable = true;

    const header = document.createElement('h2');
    header.textContent = category.name;
    box.appendChild(header);

    category.items.forEach(item => {
        const itemElement = createItemElement(item);
        box.appendChild(itemElement);
    });

    box.addEventListener('dragstart', dragStart);
    box.addEventListener('dragover', dragOver);
    box.addEventListener('drop', drop);

    return box;
}

function createItemElement(item) {
    const itemElement = document.createElement('div');
    itemElement.className = 'menu-item';
    itemElement.draggable = true;

    const nameElement = document.createElement('h3');
    nameElement.textContent = item.name;
    itemElement.appendChild(nameElement);

    if (item.price) {
        const priceElement = document.createElement('p');
        priceElement.className = 'price';
        priceElement.textContent = item.price;
        itemElement.appendChild(priceElement);
    }

    if (item.description) {
        const descriptionElement = document.createElement('p');
        descriptionElement.className = 'description';
        descriptionElement.textContent = item.description;
        itemElement.appendChild(descriptionElement);
    }

    itemElement.addEventListener('dragstart', dragStart);
    itemElement.addEventListener('dragover', dragOver);
    itemElement.addEventListener('drop', drop);

    return itemElement;
}

// Update drag and drop functions
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.outerHTML);
    e.dataTransfer.effectAllowed = 'move';
}

function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    const draggedElement = document.createElement('div');
    draggedElement.innerHTML = data;
    
    const dropTarget = e.target.closest('.category-box, .menu-item') || e.target;
    
    if (draggedElement.firstChild.className === 'category-box') {
        if (dropTarget.className === 'category-box') {
            dropTarget.parentNode.insertBefore(draggedElement.firstChild, dropTarget.nextSibling);
        } else {
            e.target.closest('#text-items-container').appendChild(draggedElement.firstChild);
        }
    } else if (draggedElement.firstChild.className === 'menu-item') {
        if (dropTarget.className === 'menu-item') {
            dropTarget.parentNode.insertBefore(draggedElement.firstChild, dropTarget.nextSibling);
        } else if (dropTarget.className === 'category-box') {
            dropTarget.appendChild(draggedElement.firstChild);
        }
    }
}

// Update the sendToVisionAPI function
async function sendToVisionAPI(imageBlob) {
    const apiKey = 'AIzaSyBOPWwpBAtI3lhAy8KbHRPhWefEPZyXrto'; // Replace with your actual API key
    const apiEndpoint = 'https://vision.googleapis.com/v1/images:annotate?key=' + apiKey;

    // Convert blob to base64
    const base64Image = await blobToBase64(imageBlob);

    const requestBody = JSON.stringify({
        requests: [
            {
                image: {
                    content: base64Image
                },
                features: [
                    {
                        type: 'TEXT_DETECTION'
                    }
                ]
            }
        ]
    });

    const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: requestBody
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
}

// Helper function to convert Blob to base64
function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}