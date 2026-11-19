
const currentOperand = document.getElementById("current-operand");
const previousOperand = document.getElementById("previous-operand");
const buttons = document.querySelector(".buttons");

let currentInput = "0";
let previousInput = "";
let operator = null;
let shouldReset = false;

function updateDisplay() {
    currentOperand.textContent = currentInput;
    previousOperand.textContent = operator
        ? `${previousInput} ${operator}`
        : "";
}

function enterNumber(number) {
    if (currentInput === "Error") clearCalculator();

    if (shouldReset) {
        currentInput = number;
        shouldReset = false;
    } else {
        if (currentInput === "0") {
            currentInput = number;
        } else if (currentInput.length < 15) {
            currentInput += number;
        }
    }

    updateDisplay();
}

function enterDecimal() {
    if (currentInput === "Error") clearCalculator();

    if (shouldReset) {
        currentInput = "0";
        shouldReset = false;
    }

    if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
}

function chooseOperator(selectedOperator) {
    if (currentInput === "Error") return;

    if (operator && !shouldReset) {
        calculate();
    }

    previousInput = currentInput;
    operator = selectedOperator;
    shouldReset = true;

    updateDisplay();
}

function calculate() {
    if (!operator || shouldReset) return;

    const firstNumber = Number(previousInput);
    const secondNumber = Number(currentInput);
    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "×":
            result = firstNumber * secondNumber;
            break;

        case "÷":
            if (secondNumber === 0) {
                currentInput = "Error";
                previousInput = "";
                operator = null;
                shouldReset = true;
                updateDisplay();
                return;
            }
            result = firstNumber / secondNumber;
            break;
    }

    if (!Number.isFinite(result)) {
        currentInput = "Error";
    } else {
        currentInput = String(Number(result.toPrecision(12)));
    }

    previousInput = "";
    operator = null;
    shouldReset = true;

    updateDisplay();
}

function clearCalculator() {
    currentInput = "0";
    previousInput = "";
    operator = null;
    shouldReset = false;

    updateDisplay();
}

function deleteNumber() {
    if (currentInput === "Error" || shouldReset) {
        currentInput = "0";
        shouldReset = false;
    } else {
        currentInput = currentInput.slice(0, -1);

        if (currentInput === "" || currentInput === "-") {
            currentInput = "0";
        }
    }

    updateDisplay();
}

buttons.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (!button) return;

    const action = button.dataset.action;
    const value = button.dataset.value;

    switch (action) {
        case "number":
            enterNumber(value);
            break;

        case "decimal":
            enterDecimal();
            break;

        case "operator":
            chooseOperator(value);
            break;

        case "calculate":
            calculate();
            break;

        case "clear":
            clearCalculator();
            break;

        case "delete":
            deleteNumber();
            break;
    }
});

updateDisplay();
