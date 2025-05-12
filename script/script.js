const dontolHealth = document.getElementById('dontolHealthBar');
const playerEnergy = document.getElementById('playerEnergy');
const dontolClickArea = document.getElementById("dontolImage");
const textNote = document.getElementById("textNote");
const textMessage = document.getElementById("textMessage");
const specialSkills1 = document.getElementById("specialSkills1");
const specialSkills2 = document.getElementById("specialSkills2");
const specialSkills3 = document.getElementById("specialSkills3");

// Initialization of Dontol's health and player energy
let dontolHealthValue = 500;
let playerEnergyValue = 0;

dontolHealth.innerText = dontolHealthValue;
playerEnergy.innerText = playerEnergyValue;

specialSkills1.disabled = true;
specialSkills2.disabled = true;
specialSkills3.disabled = true;

function playDontolSound() {
    const audio = new Audio('./assets/sound.mp3');
    audio.play();
}

// Function to attack Dontol
dontolClickArea.onclick = async function() {
    if (dontolHealthValue > 0) {
        dontolHealthValue -= 10;
        playDontolSound();
        dontolHealth.innerText = dontolHealthValue;
        textMessage.innerHTML = 'You attacked Dontol and dealt 10 damage! (You gain 10 energy too)';

        playerEnergyValue += 10;
        playerEnergy.innerText = playerEnergyValue;

        // Enable special skills based on energy
        specialSkills1.disabled = playerEnergyValue < 30;
        specialSkills2.disabled = playerEnergyValue < 50;
        specialSkills3.disabled = playerEnergyValue < 100;
    } else {
        textMessage.innerHTML = 'Dontol is already defeated!';
        dontolClickArea.src = 'dontol-defeated.png';
        specialSkills1.disabled = true;
        specialSkills2.disabled = true
        specialSkills3.disabled = true;
        // Disable special skills when energy is not enough and enable them when energy is enough

        

        // Disable the click area to prevent further attacks
        dontolClickArea.onclick = null;
        dontolClickArea.style.pointerEvents = 'none'; // Disable pointer events
        dontolClickArea.style.cursor = 'not-allowed'; // Change cursor to indicate disabled state
    }
};

specialSkills1.onclick = function() {
    if (playerEnergyValue >= 30) {
        playerEnergyValue -= 30;
        playDontolSound();
        playerEnergy.innerText = playerEnergyValue;
        dontolHealthValue -= 50;
        dontolHealth.innerText = dontolHealthValue;
        textMessage.innerText = 'You used special skill 1 and dealt 50 damage!';
    } else {
        textMessage.innerText = 'Not enough energy to use special skill 1!';
    }
};

specialSkills2.onclick = function() {
    if (playerEnergyValue >= 50) {
        playerEnergyValue -= 50;
        playDontolSound();
        playerEnergy.innerText = playerEnergyValue;
        dontolHealthValue -= 90;
        dontolHealth.innerText = dontolHealthValue;
        textMessage.innerHTML = 'You used special skill 2 and dealt 90 damage!';
    } else {
        textMessage.innerHTML = 'Not enough energy to use special skill 2!';
    }
};

specialSkills3.onclick = function() {
    if (playerEnergyValue >= 100) {
        playerEnergyValue -= 100;
        playDontolSound();
        playerEnergy.innerText = playerEnergyValue;
        dontolHealthValue -= 200;
        dontolHealth.innerText = dontolHealthValue;
        textMessage.innerHTML = 'You used special skill 3 and dealt 200 damage!';
    } else {
        textMessage.innerHTML = 'Not enough energy to use special skill 3!';
    }
};


