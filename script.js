const display = document.querySelector(".display");
const container = document.querySelector(".container");
let firstNumber = '';
let secondNumber = '';
let operator = '';
let shouldResetDisplay = false;
let decimalAdded = false;

container.addEventListener('click', (event) => {
    const clickedButton = event.target;

    if (clickedButton.classList.contains('item')) {
            const number = clickedButton.getAttribute('data-number');
            const op = clickedButton.getAttribute('data-operator');
            const func = clickedButton.getAttribute('data-function');
            const decimalPoint = clickedButton.getAttribute('data-decimal');
            const performPercent = clickedButton.getAttribute('data-performPercent');
            const appendSign = clickedButton.getAttribute('data-appendSign');

            if (number !== null) {
                    handleNumber(number);
            } else if (op !== null) {
                    handleOperator(op);
            } else if (func === 'clear') {
                    clearDisplay();
            } else if (func === 'equals') {
                    calculateResult();
            } else if(decimalPoint === "."){
                    handleDecimalPoint();
            } else if(appendSign === "+/-"){
                changeSign();
            }else if(performPercent === "%"){
                performPercent();
            }
        }
        });

    function handleNumber(number) {
        if (display.textContent === '0' || shouldResetDisplay) {
                display.textContent = number;
                shouldResetDisplay = false;
        } else {
                display.textContent += number;
            }
            decimalAdded = display.textContent.includes('.');
    }

    function handleDecimalPoint() {
            if (!decimalAdded) {
                display.textContent += '.';
                decimalAdded = true;
            }
    }

        
    function handleOperator(op) {
            if (firstNumber === '') {
                firstNumber = display.textContent;
            } else if (shouldResetDisplay) {
                operator = op;
                return;
            } else {
                secondNumber = display.textContent;
                calculateResult();
            }

            operator = op;
            shouldResetDisplay = true;
            decimalAdded = false;
    }

    function clearDisplay() {
            display.textContent = '0';
            firstNumber = '';
            secondNumber = '';
            operator = '';
            shouldResetDisplay = false;
            decimalAdded = false;
    }

    function calculateResult() {
            if (firstNumber === '' || operator === '' || display.textContent === '') return;

            secondNumber = display.textContent;
            const prev = parseFloat(firstNumber);
            const curr = parseFloat(secondNumber);
            let result;

            switch (operator) {
                case '+':
                    result = prev + curr;
                    break;
                case '-':
                    result = prev - curr;
                    break;
                case '*':
                    result = prev * curr;
                    break;
                case '/':
                    if (curr === 0) {
                        result = 'Error'; // Handle division by zero
                    } else {
                        result = prev / curr;
                    }
                    
                    break;
                default:
                    return;
            }

            display.textContent = result;
            firstNumber = result;
            shouldResetDisplay = true;
            operator = '';
            secondNumber = '';
    }

function changeSign() {
        let currentValue = display.textContent;
        if (currentValue.startsWith('-')) {
            display.textContent = currentValue.slice(1); // Remove the leading minus sign
        } else {
            display.textContent = '-' + currentValue; // Add a minus sign
        }
    }

function performPercent(){
    display.textContent = Number(display.textContent) / 100.00;
}
