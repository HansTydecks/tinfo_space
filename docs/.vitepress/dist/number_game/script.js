let randomNumber;
let minRange = 0;
let maxRange = 10;

// Zahlenbereich auswählen
document.querySelectorAll('.range-btn').forEach(button => {
    button.addEventListener('click', function() {
        minRange = parseInt(this.dataset.min);
        maxRange = parseInt(this.dataset.max);
        document.getElementById('generateBtn').disabled = false;
        document.getElementById('feedback').textContent = `Bereich ausgewählt: ${minRange} - ${maxRange}`;
    });
});

// Zufallszahl generieren
document.getElementById('generateBtn').addEventListener('click', function() {
    randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    document.getElementById('numberDisplay').textContent = "Zahl generiert.";

    // TTS zur Vorlesung der Zahl
    const utterance = new SpeechSynthesisUtterance(randomNumber.toString());
    utterance.lang = "de-DE";
    speechSynthesis.speak(utterance);
});

// Zahl überprüfen
document.getElementById('checkBtn').addEventListener('click', function() {
    const userGuess = parseInt(document.getElementById('guessInput').value);
    const feedback = document.getElementById('feedback');

    if (userGuess === randomNumber) {
        feedback.textContent = 'Richtig! Gut gemacht!';
    } else if (userGuess > randomNumber) {
        feedback.textContent = 'Leider falsch. Die Zahl ist zu hoch.';
    } else {
        feedback.textContent = 'Leider falsch. Die Zahl ist zu niedrig.';
    }
});
