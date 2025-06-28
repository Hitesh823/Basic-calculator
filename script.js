const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearBtn = document.getElementById('clear');
const equalsBtn = document.getElementById('equals');
const sqrtBtn = document.getElementById('sqrt');
const mPlusBtn = document.getElementById('mplus');
const mMinusBtn = document.getElementById('mminus');
const mrBtn = document.getElementById('mr');
const mcBtn = document.getElementById('mc');

let currentInput = '';
let resultDisplayed = false;
let memory = 0;

// Handle Button Clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (button.classList.contains('operator') || !isNaN(value) || value === '.' || value === '%') {
            if (resultDisplayed) {
                currentInput = '';
                resultDisplayed = false;
            }
            currentInput += value;
            display.innerText = currentInput;
        }
    });
});

// Equals Button
equalsBtn.addEventListener('click', () => {
    try {
        if (currentInput.trim() === '') return;

        // Replace percentage operator with actual calculation
        let expression = currentInput.replace(/%/g, '/100');

        const result = eval(expression);

        if (!isFinite(result)) {
            display.innerText = "Error";
        } else {
            display.innerText = result;
            currentInput = result.toString();
            resultDisplayed = true;
        }
    } catch {
        display.innerText = "Error";
    }
});

// Square Root Button
sqrtBtn.addEventListener('click', () => {
    try {
        const number = parseFloat(currentInput);
        if (isNaN(number) || number < 0) {
            display.innerText = "Error";
        } else {
            const result = Math.sqrt(number);
            display.innerText = result;
            currentInput = result.toString();
            resultDisplayed = true;
        }
    } catch {
        display.innerText = "Error";
    }
});

// Clear Button
clearBtn.addEventListener('click', () => {
    currentInput = '';
    display.innerText = '0';
});

// Memory Functions
mPlusBtn.addEventListener('click', () => {
    memory += parseFloat(display.innerText) || 0;
});

mMinusBtn.addEventListener('click', () => {
    memory -= parseFloat(display.innerText) || 0;
});

mrBtn.addEventListener('click', () => {
    currentInput = memory.toString();
    display.innerText = currentInput;
});

mcBtn.addEventListener('click', () => {
    memory = 0;
});

// Keyboard Input Handling
document.addEventListener('keydown', (e) => {
    const allowedKeys = '0123456789+-*/.%';
    
    if (allowedKeys.includes(e.key)) {
        if (resultDisplayed) {
            currentInput = '';
            resultDisplayed = false;
        }
        currentInput += e.key;
        display.innerText = currentInput;
    } else if (e.key === 'Enter') {
        equalsBtn.click();
    } else if (e.key.toLowerCase() === 'c') {
        clearBtn.click();
    }
});
