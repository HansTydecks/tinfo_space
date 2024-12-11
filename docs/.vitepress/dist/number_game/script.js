let targetNumber;

function startGame(max) {
  // Generate a random number
  targetNumber = Math.floor(Math.random() * (max + 1));

  // Use Text-to-Speech to read the number aloud in German
  const utterance = new SpeechSynthesisUtterance(targetNumber.toString());
  utterance.lang = 'de-DE'; // Set language to German
  speechSynthesis.speak(utterance);

  // Update the game area in the HTML
  const gameArea = document.getElementById('gameArea');
  gameArea.innerHTML = `
    <p>Ich habe eine Zahl gewählt. Gib deine Vermutung ein:</p>
    <input type="text" id="guessInput" placeholder="Zahl eingeben">
    <button onclick="checkGuess(${max})">Raten</button>
    <p id="result"></p>
  `;
}

function checkGuess(max) {
  const input = document.getElementById('guessInput').value.trim();
  const guess = parseInt(input, 10);
  const resultElement = document.getElementById('result');

  if (isNaN(guess) || guess < 0 || guess > max) {
    resultElement.textContent = `Bitte eine gültige Zahl zwischen 0 und ${max} eingeben.`;
  } else if (guess === targetNumber) {
    resultElement.textContent = 'Gratuliere! Du hast die richtige Zahl erraten!';
  } else if (guess < targetNumber) {
    resultElement.textContent = 'Zu niedrig. Versuch es nochmal!';
  } else {
    resultElement.textContent = 'Zu hoch. Versuch es nochmal!';
  }
}
