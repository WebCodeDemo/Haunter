// Game state
let currentDay = 1;
let people = [];
let availableHauntings = [];
let assignedHauntings = 0;
let selectedHauntingIndex = null;

// Character traits
const characterTraits = {
    Alice: 'Skeptic',
    Bob: 'Easily Frightened',
    Charlie: 'Protective',
    David: 'Curious',
    Eve: 'Superstitious'
};

// Character dialogues
const characterDialogues = {
    Alice: {
        notScared: "This is clearly just a series of coincidences. I'm not leaving until I figure out the logical explanation.",
        scared: "I can't explain this rationally anymore. I'm out of here!"
    },
    Bob: {
        notScared: "Oh my goodness! What was that? No, no, it's probably nothing... right?",
        scared: "I can't take it anymore! This place is too spooky for me!"
    },
    Charlie: {
        notScared: "Don't worry, everyone. I'll make sure we're all safe here.",
        scared: "I can't protect anyone if I can't even protect myself. We need to leave!"
    },
    David: {
        notScared: "Fascinating! I wonder what other paranormal phenomena we might observe here.",
        scared: "I've seen enough to write a book! Time to continue this research from a safer location."
    },
    Eve: {
        notScared: "The spirits are restless tonight. We should perform a cleansing ritual.",
        scared: "The negative energy is too strong! We must flee before it's too late!"
    }
};

// Hauntings
const allHauntings = [
    { name: 'Flickering Lights', effectiveness: { Skeptic: false, 'Easily Frightened': true, Protective: false, Curious: true, Superstitious: true } },
    { name: 'Moving Objects', effectiveness: { Skeptic: true, 'Easily Frightened': true, Protective: false, Curious: true, Superstitious: true } },
    { name: 'Ghostly Whispers', effectiveness: { Skeptic: false, 'Easily Frightened': true, Protective: false, Curious: true, Superstitious: true } },
    { name: 'Cold Spots', effectiveness: { Skeptic: false, 'Easily Frightened': true, Protective: false, Curious: true, Superstitious: true } },
    { name: 'Ectoplasm Traces', effectiveness: { Skeptic: true, 'Easily Frightened': true, Protective: false, Curious: true, Superstitious: false } },
    { name: 'Phantom Footsteps', effectiveness: { Skeptic: false, 'Easily Frightened': true, Protective: true, Curious: true, Superstitious: true } },
    { name: 'Eerie Reflections', effectiveness: { Skeptic: true, 'Easily Frightened': true, Protective: false, Curious: true, Superstitious: true } },
    { name: 'Ghostly Apparition', effectiveness: { Skeptic: true, 'Easily Frightened': true, Protective: true, Curious: true, Superstitious: true } },
    { name: 'Levitating Objects', effectiveness: { Skeptic: true, 'Easily Frightened': true, Protective: false, Curious: true, Superstitious: true } },
    { name: 'Unexplained Noises', effectiveness: { Skeptic: false, 'Easily Frightened': true, Protective: true, Curious: true, Superstitious: true } },
    { name: 'Whispering Shadows', effectiveness: { Skeptic: false, 'Easily Frightened': true, Protective: false, Curious: true, Superstitious: true } },
    { name: 'Possession of Personal Objects', effectiveness: { Skeptic: true, 'Easily Frightened': true, Protective: false, Curious: true, Superstitious: true } },
    { name: 'Time Loop Illusions', effectiveness: { Skeptic: true, 'Easily Frightened': false, Protective: false, Curious: true, Superstitious: true } },
    { name: 'Ectoplasmic Barriers', effectiveness: { Skeptic: true, 'Easily Frightened': true, Protective: true, Curious: false, Superstitious: false } },
    { name: 'Phantom Limb Sensations', effectiveness: { Skeptic: true, 'Easily Frightened': true, Protective: false, Curious: true, Superstitious: false } },
    { name: 'Memory Alteration', effectiveness: { Skeptic: true, 'Easily Frightened': false, Protective: true, Curious: true, Superstitious: false } },
    { name: 'Spectral Doppelgangers', effectiveness: { Skeptic: false, 'Easily Frightened': true, Protective: true, Curious: false, Superstitious: true } },
    { name: 'Reality-Bending Rooms', effectiveness: { Skeptic: true, 'Easily Frightened': true, Protective: false, Curious: true, Superstitious: false } },
    { name: 'Empathic Haunting', effectiveness: { Skeptic: false, 'Easily Frightened': true, Protective: true, Curious: false, Superstitious: true } },
    { name: 'Temporal Echoes', effectiveness: { Skeptic: true, 'Easily Frightened': false, Protective: false, Curious: true, Superstitious: true } },
    { name: 'Gravity Manipulation', effectiveness: { Skeptic: true, 'Easily Frightened': true, Protective: true, Curious: true, Superstitious: false } },
    { name: 'Auditory Hallucinations', effectiveness: { Skeptic: false, 'Easily Frightened': true, Protective: true, Curious: false, Superstitious: true } },
    { name: 'Spectral Gateways', effectiveness: { Skeptic: true, 'Easily Frightened': true, Protective: false, Curious: true, Superstitious: false } },
    { name: 'Possession of Living Plants', effectiveness: { Skeptic: true, 'Easily Frightened': false, Protective: false, Curious: true, Superstitious: true } },
    { name: 'Electromagnetic Personality Swaps', effectiveness: { Skeptic: true, 'Easily Frightened': true, Protective: true, Curious: true, Superstitious: false } },
    { name: 'Phantom Scent Manipulation', effectiveness: { Skeptic: false, 'Easily Frightened': true, Protective: true, Curious: true, Superstitious: false } },
    { name: 'Spectral Time Dilation', effectiveness: { Skeptic: true, 'Easily Frightened': false, Protective: false, Curious: true, Superstitious: true } },
    { name: 'Emotional Resonance Fields', effectiveness: { Skeptic: true, 'Easily Frightened': true, Protective: true, Curious: false, Superstitious: false } },
    { name: 'Phantasmal Mirror Worlds', effectiveness: { Skeptic: true, 'Easily Frightened': true, Protective: false, Curious: true, Superstitious: false } },
    { name: 'Psychic Echo Chambers', effectiveness: { Skeptic: false, 'Easily Frightened': true, Protective: true, Curious: false, Superstitious: true } },
    { name: 'Spectral Puppetry', effectiveness: { Skeptic: true, 'Easily Frightened': true, Protective: false, Curious: true, Superstitious: false } },
    { name: 'Memory Leech Entities', effectiveness: { Skeptic: true, 'Easily Frightened': false, Protective: true, Curious: true, Superstitious: false } },
    { name: 'Reality Glitch Zones', effectiveness: { Skeptic: true, 'Easily Frightened': true, Protective: false, Curious: true, Superstitious: false } },
    { name: 'Spectral Soundscapes', effectiveness: { Skeptic: false, 'Easily Frightened': true, Protective: false, Curious: true, Superstitious: true } },
    { name: 'Paranormal Symbiosis', effectiveness: { Skeptic: true, 'Easily Frightened': false, Protective: true, Curious: true, Superstitious: false } },
    { name: 'Ethereal Art Manipulation', effectiveness: { Skeptic: false, 'Easily Frightened': true, Protective: false, Curious: true, Superstitious: true } },
    { name: 'Quantum Entanglement Hauntings', effectiveness: { Skeptic: true, 'Easily Frightened': false, Protective: true, Curious: true, Superstitious: false } },
    { name: 'Chronological Displacement', effectiveness: { Skeptic: true, 'Easily Frightened': true, Protective: false, Curious: true, Superstitious: false } },
    { name: 'Spectral Weather Phenomena', effectiveness: { Skeptic: true, 'Easily Frightened': true, Protective: true, Curious: false, Superstitious: false } },
    { name: 'Paranormal Frequency Interference', effectiveness: { Skeptic: true, 'Easily Frightened': false, Protective: false, Curious: true, Superstitious: true } },
];

// Initialize game
function initGame() {
    createPeople();
    updateUI();
    newDay();
}

// Create people
function createPeople() {
    people = Object.keys(characterTraits).map(name => ({
        name,
        trait: characterTraits[name],
        ps: 2,
        dialogue: ''
    }));
}

// Start a new day
function newDay() {
    if (currentDay > 5) {
        endGame(false);
        return;
    }
    assignedHauntings = 0;
    availableHauntings = getRandomHauntings(3);
    selectedHauntingIndex = null;
    document.getElementById('next-day-button').disabled = true;
    // Reset dialogues at the start of each day
    people.forEach(person => person.dialogue = '');
    updateUI();
}

// Get random hauntings
function getRandomHauntings(count) {
    const shuffled = allHauntings.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Select haunting
function selectHaunting(index) {
    selectedHauntingIndex = index;
    
    // Remove active class from all haunting buttons
    document.querySelectorAll('.haunting-button').forEach(btn => btn.classList.remove('active'));
    
    // Add active class to selected haunting
    document.getElementById(`haunting-${index}`).classList.add('active');

    // Make selectable people pulse
    document.querySelectorAll('.person').forEach((personElement, personIndex) => {
        if (people[personIndex].ps > 0) {
            personElement.classList.add('selectable');
            personElement.onclick = () => assignHaunting(index, personIndex);
        }
    });
}

// Assign haunting
function assignHaunting(hauntingIndex, personIndex) {
    const haunting = availableHauntings[hauntingIndex];
    const person = people[personIndex];
    
    const isEffective = haunting.effectiveness[person.trait];
    if (isEffective) {
        person.ps--;
    }

    // Update dialogue based on effectiveness
    updatePersonDialogue(person, isEffective);

    assignedHauntings++;
    
    // Mark haunting as used and remove it from available hauntings
    document.getElementById(`haunting-${hauntingIndex}`).classList.add('used');
    document.getElementById(`haunting-${hauntingIndex}`).classList.remove('active');
    availableHauntings[hauntingIndex] = null;

    // Remove selectable class from all people
    document.querySelectorAll('.person').forEach(p => {
        p.classList.remove('selectable');
        p.onclick = null;
    });

    // Reactivate remaining hauntings
    document.querySelectorAll('.haunting-button:not(.used)').forEach(btn => btn.classList.add('active'));

    selectedHauntingIndex = null;

    if (assignedHauntings === 3) {
        document.getElementById('next-day-button').disabled = false;
    }

    updateUI();
    checkGameEnd();
}

// Update person's dialogue
function updatePersonDialogue(person, isEffective) {
    if (isEffective) {
        person.dialogue = person.ps > 0 ? characterDialogues[person.name].notScared : characterDialogues[person.name].scared;
    } else {
        person.dialogue = "That was strange, but I'm fine.";
    }
}

// Check if game should end
function checkGameEnd() {
    if (people.every(person => person.ps === 0)) {
        endGame(true);
    }
}

// End game
function endGame(win) {
    const message = win ? "Congratulations! You've scared everyone out of the house!" : "Sorry, try again.";
    document.getElementById('game-message').textContent = message;
    document.getElementById('next-day-button').disabled = true;
}

// Update UI
function updateUI() {
    // Update people
    const peopleContainer = document.getElementById('people-container');
    peopleContainer.innerHTML = '';
    people.forEach((person, index) => {
        const personElement = document.createElement('div');
        personElement.className = 'person';
        personElement.innerHTML = `
            <h3>${person.name}</h3>
            <p>Trait: ${person.trait}</p>
            <p>PS: ${person.ps}</p>
            <p class="dialogue">${person.dialogue}</p>
        `;
        peopleContainer.appendChild(personElement);
    });

    // Update hauntings
    const hauntingButtons = document.getElementById('haunting-buttons');
    hauntingButtons.innerHTML = '';
    availableHauntings.forEach((haunting, index) => {
        if (haunting) {
            const button = document.createElement('button');
            button.id = `haunting-${index}`;
            button.className = 'haunting-button active';
            button.textContent = haunting.name;
            button.onclick = () => selectHaunting(index);
            hauntingButtons.appendChild(button);
        }
    });

    // Update day
    document.getElementById('current-day').textContent = currentDay;
}

// Next day
document.getElementById('next-day-button').onclick = () => {
    currentDay++;
    newDay();
};

// Initialize game
initGame();