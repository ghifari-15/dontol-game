// Refactored code for better algorithm and readability

const dontolHealth = document.getElementById('dontolHealthBar');
const playerEnergy = document.getElementById('playerEnergy');
const dontolClickArea = document.getElementById("dontolImage");
const textNote = document.getElementById("textNote");
const textMessage = document.getElementById("textMessage");
const specialSkills = [
    document.getElementById("specialSkills1"),
    document.getElementById("specialSkills2"),
    document.getElementById("specialSkills3")
];

// Initialization of Dontol's health and player energy
let dontolHealthValue = 500;
let playerEnergyValue = 0;

// Update UI elements
function updateUI() {
    dontolHealth.innerText = dontolHealthValue;
    playerEnergy.innerText = playerEnergyValue;
    specialSkills.forEach((button, index) => {
        button.disabled = playerEnergyValue < action[index + 1].energyCost;
    });
}

// Play sound function
function playDontolSoundWhileClicked() {
    const audio = new Audio('./assets/dontolSound.mp3');
    audio.play();
}

// Actions configuration
const action = [
    {
        message: 'You attacked Dontol and dealt 10 damage! (You gain 10 energy too)',
        energyGain: 10,
        damage: 10
    },
    {
        message: 'You used special skill 1 and dealt 50 damage!',
        energyCost: 30,
        damage: 50
    },
    {
        message: 'You used special skill 2 and dealt 90 damage!',
        energyCost: 50,
        damage: 90
    },
    {
        message: 'You used special skill 3 and dealt 200 damage!',
        energyCost: 100,
        damage: 200
    }
];

// Handle attack or skill usage
function performAction(index) {
    const act = action[index];
    if (index === 0 || playerEnergyValue >= act.energyCost) {
        playDontolSoundWhileClicked();
        dontolHealthValue -= act.damage;
        playerEnergyValue += index === 0 ? act.energyGain : -act.energyCost;
        textMessage.innerText = act.message;
        updateUI();

        if (dontolHealthValue <= 0) {
            defeatDontol();
        }
    } else {
        textMessage.innerText = `Not enough energy to use special skill ${index}!`;
    }
}

// Defeat Dontol
function defeatDontol() {
    if (dontolHealthValue < 0) {
        dontolHealthValue = 0;
        dontolHealth.innerText = dontolHealthValue;
    }
    textMessage.innerText = 'Dontol is already defeated!';
    dontolClickArea.src = '/assets/dontolDefeated.png';
    dontolClickArea.onclick = null;
    dontolClickArea.style.pointerEvents = 'none';
    dontolClickArea.style.cursor = 'not-allowed';
    textNote.innerText = 'You have defeated Dontol! Click any button below to restart the game.';

    // Convert all special skill buttons into restart buttons
    specialSkills.forEach(button => {
        button.innerText = 'Restart Game';
        button.disabled = false;
        button.onclick = game;
    });
}

// Restart game
function game() {
    dontolHealthValue = 500;
    playerEnergyValue = 0;
    dontolClickArea.src = 'assets/dontol.png';
    dontolClickArea.onclick = () => performAction(0);
    dontolClickArea.style.pointerEvents = 'auto';
    dontolClickArea.style.cursor = 'pointer';
    specialSkills[0].innerText = 'Special Skill 1 (consume 30 energy)';
    specialSkills[1].innerText = 'Special Skill 2 (consume 50 energy)'; 
    specialSkills[2].innerText = 'Special Skill 3 (consume 100 energy)';
    textNote.innerText = 'Click on Dontol to attack him!';
    textMessage.innerText = 'You can use special skills when you have enough energy!';
    updateUI();
}

// Initialize game
game();

// Attach event listeners
specialSkills.forEach((button, index) => {
    button.onclick = () => performAction(index + 1);
});


