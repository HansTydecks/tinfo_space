let randomNumber;

document.getElementById('generateBtn').addEventListener('click', function() {
    const x = 1000000; // Maximalwert
    randomNumber = Math.floor(Math.random() * (x + 1));
    document.getElementById('numberDisplay').textContent = `Zahl generiert.`;
    
    // TTS zur Vorlesung der Zahl
    const utterance = new SpeechSynthesisUtterance(randomNumber.toString());
    speechSynthesis.speak(utterance);
});

document.getElementById('checkBtn').addEventListener('click', function() {
    const userGuess = parseInt(document.getElementById('guessInput').value);
    const feedback = document.getElementById('feedback');
    
    if (userGuess === randomNumber) {
        feedback.textContent = 'Richtig! Gut gemacht!';
    } else {
        feedback.textContent = `Leider falsch. Die Zahl war ${randomNumber}.`;
    }
});
