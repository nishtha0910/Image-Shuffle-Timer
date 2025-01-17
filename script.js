// SA0001: I Nishtha Chaudhari, 000930353 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

// Array of image filenames for random display
const imageSources = [
    "dog1.webp", "dog2.jpeg", "dog3.webp",
    "food1.webp", "food2.jpeg", "food3.webp",
    "forest1.jpeg", "forest2.jpeg", "forest3.jpeg"
];

let totalImageChanges = 0; // To count how many times images are shuffled
let countdownTime = 5000; // Default time interval for countdown (in milliseconds)
let countdownInterval = null; // Variable to hold the countdown interval reference
let timeLeft = countdownTime; // Tracks remaining countdown time

// Initialize the script when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", init);

function init() {
    displayRandomImages(); // Display random images initially
    document.getElementById("hit-me-button").addEventListener("click", shuffleImages); // Shuffle images on button click
    document.getElementById("reset-time").addEventListener("input", validateTimeout); // Validate user input for timeout
    activateImageClicking(); // Enable individual image clicking to shuffle each one
}

// Function to display random images in the image slots
function displayRandomImages() {
    const images = document.querySelectorAll(".image"); // Select all image elements
    const shuffledImages = shuffleArray([...imageSources]); // Shuffle the image sources array
    images.forEach((img, index) => {
        img.src = `images/${shuffledImages[index]}`; // Set each image src attribute
    });
}

// Function to shuffle all images and reset the countdown
function shuffleImages() {
    displayRandomImages(); // Update all images with new random images
    totalImageChanges += 3; // Increment the change counter by 3 (for 3 images)
    document.getElementById("image-change-count").textContent = `Image changes: ${totalImageChanges}`; // Update counter display
    resetCountdown(); // Reset and restart the countdown timer
}

// Validates the timeout input value from the user
function validateTimeout() {
    const userTimeout = document.getElementById("reset-time").value;
    // Ensure the input value is between the allowed range (500ms - 10,000ms)
    if (userTimeout >= 500 && userTimeout <= 10000) {
        countdownTime = userTimeout; // Update the countdown time if valid
        resetCountdown(); // Reset the countdown timer with the new value
    } else {
        alert("Please enter a valid time between 500 and 10,000 milliseconds.");
    }
}

// Function to reset the countdown when the timer is changed or images are shuffled
function resetCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval); // Clear any active countdown
    }
    timeLeft = countdownTime; // Reset time left to the selected countdown time
    startCountdown(); // Start a new countdown
}

// Function to initiate the countdown and update the UI
function startCountdown() {
    const countdownDisplay = document.getElementById("time-remaining");
    countdownDisplay.textContent = `Countdown: ${timeLeft / 1000} seconds`; // Display time in seconds
    countdownDisplay.classList.remove("yellow", "red"); // Remove warning/danger styles
    countdownDisplay.classList.add("green"); // Add normal state

    countdownInterval = setInterval(updateCountdown, 10); // Set interval to update countdown every 10ms
}

// Function to update the countdown timer and trigger shuffle on timeout
function updateCountdown() {
    timeLeft -= 10; // Decrease the time left by 10 milliseconds
    const countdownDisplay = document.getElementById("time-remaining");
    countdownDisplay.textContent = `Countdown: ${timeLeft / 1000} seconds`; // Update display

    if (timeLeft <= 0) {
        clearInterval(countdownInterval); // Stop the countdown
        shuffleImages(); // Shuffle images automatically when countdown reaches 0
        resetCountdown(); // Restart the countdown after shuffle
    } else {
        updateCountdownStyle(countdownDisplay); // Adjust the countdown style based on remaining time
    }
}

// Function to adjust the countdown timer's color and style
function updateCountdownStyle(display) {
    if (timeLeft <= 2000) {
        display.style.color = "white";
        display.style.backgroundColor = "red"; // Set danger style if time is less than 2 seconds
    } else if (timeLeft <= 4000) {
        display.style.color = "black";
        display.style.backgroundColor = "yellow"; // Set warning style for less than 4 seconds
    } else {
        display.style.color = "white";
        display.style.backgroundColor = "green"; // Set normal style for more than 4 seconds
    }
}

// Function to enable image click events for individual shuffling
function activateImageClicking() {
    const images = document.querySelectorAll(".image"); // Get all image elements
    images.forEach(image => {
        image.addEventListener("click", (event) => {
            applyAnimation(event.target); // Apply spin animation on click
            replaceImage(event.target); // Replace the clicked image with a new one
            resetCountdown(); // Reset the countdown timer after image click
            totalImageChanges++; // Increment image change count
            document.getElementById("image-change-count").textContent = `Image changes: ${totalImageChanges}`; // Update display
        });
    });
}

// Function to apply spin animation to an image on click
function applyAnimation(image) {
    image.classList.add('spin'); // Add 'spin' class for rotation
    setTimeout(() => image.classList.remove('spin'), 5000); // Remove class after 5 seconds
}

// Function to replace a single clicked image with a new one
function replaceImage(image) {
    const newImage = shuffleArray([...imageSources])[0]; // Get a random new image
    image.src = `images/${newImage}`; // Update the clicked image's src attribute
}

// Utility function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]]; // Swap elements
    }
    return array; // Return shuffled array
}
