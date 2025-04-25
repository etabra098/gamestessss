// ========== GAME CONFIG ========== //
const levels = [
    { name: "Shapes", items: ["circle", "square", "triangle", "star"] },
    { name: "Animals", items: ["dog", "cat", "bird", "fish"] },
    { name: "Vehicles", items: ["car", "bus", "bike", "truck"] },
    { name: "Fruits", items: ["apple", "banana", "orange", "grape"] },
    { name: "Emojis", items: ["😀", "😎", "🤩", "🥳"] },
    // Add more levels here...
];

let currentLevel = 0;
let matchedPairs = 0;
let draggableItems = [];
let dropZones = [];

// ========== DOM ELEMENTS ========== //
const gameBoard = document.getElementById("game-board");
const levelDisplay = document.getElementById("level");
const congratsPopup = document.getElementById("congrats-popup");
const nextLevelBtn = document.getElementById("next-level-btn");

// ========== INITIALIZE GAME ========== //
function initGame() {
    matchedPairs = 0;
    gameBoard.innerHTML = '';
    const levelData = levels[currentLevel];
    levelDisplay.textContent = `Level ${currentLevel + 1}: ${levelData.name}`;

    // Create draggable cards (front: colored, back: gray)
    levelData.items.forEach((item, index) => {
        // Draggable Card (Front)
        const card = document.createElement("div");
        card.className = "card";
        card.draggable = true;
        card.dataset.item = item;
        card.dataset.index = index;
        card.innerHTML = `<div class="item ${item}"></div>`;
        card.addEventListener("dragstart", dragStart);
        gameBoard.appendChild(card);
        draggableItems.push(card);

        // Drop Zone (Back - Gray)
        const dropZone = document.createElement("div");
        dropZone.className = "drop-zone";
        dropZone.dataset.item = item;
        dropZone.dataset.index = index;
        dropZone.innerHTML = `<div class="item gray ${item}"></div>`;
        dropZone.addEventListener("dragover", dragOver);
        dropZone.addEventListener("drop", drop);
        gameBoard.appendChild(dropZone);
        dropZones.push(dropZone);
    });
}

// ========== DRAG & DROP FUNCTIONS ========== //
function dragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.dataset.item);
    setTimeout(() => e.target.classList.add("dragging"), 0);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData("text/plain");
    const dropZone = e.target.closest(".drop-zone");
    
    if (dropZone.dataset.item === draggedItem) {
        const draggedElement = document.querySelector(`.card[draggedItem="${draggedItem}"]`);
        dropZone.appendChild(draggedElement);
        draggedElement.classList.remove("dragging");
        matchedPairs++;

        if (matchedPairs === levels[currentLevel].items.length) {
            setTimeout(() => showCongrats(), 1000);
        }
    }
}

// ========== LEVEL COMPLETION ========== //
function showCongrats() {
    congratsPopup.style.display = "flex";
}

function nextLevel() {
    currentLevel++;
    if (currentLevel >= levels.length) {
        alert("🎉 You completed all levels! 🎉");
        currentLevel = 0;
    }
    congratsPopup.style.display = "none";
    initGame();
}

// ========== EVENT LISTENERS ========== //
nextLevelBtn.addEventListener("click", nextLevel);

// Start Game
initGame();