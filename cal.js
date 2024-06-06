let displayValue = '';

function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue === '' ? '0' : displayValue;
}

function clearDisplay() {
    displayValue = '';
    updateDisplay();
}

function deleteLast() {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
}

function appendNumber(number) {
    if (displayValue === 'Error') {
        displayValue = '';
    }
    displayValue += number;
    updateDisplay();
}

function appendOperator(operator) {
    if (displayValue === 'Error') {
        displayValue = '';
    }
    const lastChar = displayValue.charAt(displayValue.length - 1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        displayValue = displayValue.slice(0, -1);
    }
    displayValue += operator;
    updateDisplay();
}

function calculate() {
    try {
        displayValue = eval(displayValue).toString();
        if (displayValue === 'Infinity' || displayValue === '-Infinity' || isNaN(displayValue)) {
            displayValue = 'Error';
        }
    } catch {
        displayValue = 'Error';
    }
    updateDisplay();
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (!isNaN(key) || key === '.') {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key.toLowerCase() === 'c') {
        clearDisplay();
    }
});
