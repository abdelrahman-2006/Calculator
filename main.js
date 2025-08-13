let calcDisplay = document.getElementById('screen');
let ans = 0;
let currentNumber = '0';
let signs = ['+', "-", "*", "/"];
let target;
let opIndex = null;
let equalStatus = false;
calcDisplay.textContent = currentNumber;
let error =  false;


for(i = 0; i<4 ; i++) {
    operations[i] = new Operator();
    operations[i].doOperation = functionality[i];
    operations[i].operatorClicked = false;
}
operations[0].operatorClicked = true;


document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains("number")) {
        inputDigit(target.textContent);
    } else if (target.classList.contains("operator")) {
        inputOperator(target.id);
    } else if (target.id === "equal") {
        evaluateExpression();
    } else if (target.id === "delete") {
        deleteLast();
    } else if (target.id === "clear") {
        resetCalculator();
    } else if (target.id === "decimal") {
        inputDecimal();
    } else if (target.id === "percent") {
        inputPercent();
    }
});
document.addEventListener('keydown', (event) => {
    if (isFinite(event.key)) {
        inputDigit(event.key);
    } else if (signs.includes(event.key)) {
        inputOperator(event.key);
    } else if (event.key === "=" || event.key === "Enter") {
        evaluateExpression();
    } else if (event.key === "Backspace") {
        deleteLast();
    } else if (event.key === "Escape") {
        resetCalculator();
    } else if (event.key === ".") {
        inputDecimal();
    } else if (event.key === "%") {
        inputPercent();
    }
});


function resetCalculator() {
    currentNumber = '0';
    ans = '0';
    for (let operation of operations) {
        operation.operatorClicked = false;
    }
    operations[0].operatorClicked = true;
    calcDisplay.textContent = currentNumber;
    equalStatus = false;
    error = false;
}

function inputDigit(digit) {
    if (error) return;
    if (equalStatus) {
        currentNumber = '0';
        ans = '0';
        equalStatus = false;
        operations[0].operatorClicked = true;
    }
    if (+currentNumber + (+digit) === 0 && currentNumber === "0") {
        currentNumber = '0';
    } else if (currentNumber === '0') {
        currentNumber = digit;
    } else if (currentNumber.length < 10) {
        currentNumber += digit;
    }
    calcDisplay.textContent = currentNumber;
}

function inputOperator(opKey) {
    if (error) return;
    if (equalStatus) {
        currentNumber = String(ans);
        equalStatus = false;
        ans = 0;
        operations[0].operatorClicked = true;
    } else if (!isFinite(ans)) {
        calcDisplay.textContent = "Error";
        error = true;
        return;
    }
    opIndex = signs.indexOf(opKey);
    ans = operations[opIndex].operate(ans, currentNumber);
    ans = Math.round(ans * 1e10) / 1e10;
    currentNumber = '0';
    calcDisplay.textContent = ans;
    equalStatus = false;
}

function evaluateExpression() {
    if (error) return;
    for (let operation of operations) {
        if (operation.operatorClicked) {
            operation.operatorClicked = false;
            ans = operation.doOperation(+ans, +currentNumber);
        }
    }
    if (!isFinite(ans)) {
        calcDisplay.textContent = "Error";
        error = true;
    } else {
        ans = Math.round(ans * 1e10) / 1e10;
        calcDisplay.textContent = ans;
        equalStatus = true;
    }
}

function deleteLast() {
    if (error) return;
    if (equalStatus) {
        currentNumber = String(ans);
        equalStatus = false;
        ans = 0;
        operations[0].operatorClicked = true;
    }
    if (currentNumber.length > 1) {
        currentNumber = currentNumber.slice(0, -1);
    } else {
        currentNumber = '0';
    }
    calcDisplay.textContent = currentNumber;
}

function inputDecimal() {
    if (error) return;
    if (!currentNumber.includes('.') && currentNumber.length < 23) {
        currentNumber += '.';
        calcDisplay.textContent = currentNumber;
        if (equalStatus) {
            currentNumber = String(ans);
            equalStatus = false;
            ans = 0;
            operations[0].operatorClicked = true;
        }
    }
}

function inputPercent() {
    if (error) return;
    currentNumber = String(+currentNumber / 100);
    currentNumber = Math.round(+currentNumber * 1e10) / 1e10;
    calcDisplay.textContent = currentNumber;
    if (equalStatus) {
        currentNumber = String(ans);
        equalStatus = false;
        ans = 0;
        operations[0].operatorClicked = true;
    }
}
