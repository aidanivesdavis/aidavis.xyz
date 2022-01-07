import samples from './samples.js';

let sampleTextDisplay = document.getElementById('sampleTextDisplay');
let typingArea = document.getElementById('typingArea');
let feedbackDisplay = document.getElementById('feedbackDisplay');
let resetButton = document.getElementById('resetButton');
let newButton = document.getElementById('newButton');

// Start a timer when the user begins typing. Stop the timer when the user clicks "End" and display the words per minute.
// TODO How should data flow work in this? All the variables are global and the functions have no parameters. 
// It's not clear what could affect what. If you have an issue with one variable, for example, it may be difficult to find what caused the issue.

let testHasBegun;
let startTime;
let endTime;

// TODO: Set the cursor when the page loads so the user doesn't have to click in the text box.

newTest();

// Maybe prevent the user from pasting stuff in?
typingArea.addEventListener('input', () => {
    if (!testHasBegun) {
        testHasBegun = true;
        startTime = Date.now();
    }
    switch (checkInput()) {
        case 'typo':
            feedbackDisplay.innerText = 'typo';
            break;
        case 'test complete':
            endTime = Date.now();
            feedbackDisplay.innerText = Math.floor((typingArea.innerText.length / 5) / ((endTime - startTime) / (1000 * 60))) + 'WPM';
            typingArea.setAttribute('contenteditable', false);
            break;
        case 'no typo':
            feedbackDisplay.innerText = '';
            break;
    }
});

resetButton.onclick = reset;

newButton.onclick = newTest;

function reset() {
    typingArea.innerText = '';
    typingArea.setAttribute('contenteditable', true);
    typingArea.focus();

    feedbackDisplay.innerText = '';
    testHasBegun = false;
}

function newTest() {
    reset();

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * samples.length);
    } while (samples[randomIndex] === sampleTextDisplay.innerText);
    sampleTextDisplay.innerText = samples[randomIndex];
}

function checkInput() {
    let userInput = typingArea.innerText.replace(/\n/g, '');
    if (userInput.length > sampleTextDisplay.innerText.length) {
        return "typo";
    }
    for (let i in userInput) {
        if (userInput[i] !== sampleTextDisplay.innerText[i]) {
            return "typo";
        }
    }
    if (userInput.length === sampleTextDisplay.innerText.length) {
        return "test complete";
    } else {
        return "no typo";
    }
}