let calcDisplay = document.getElementById('screen');
let ans = 0;
let currentNumber = '0';
let signs = ['+', "-", "*", "/"];
let target;
let opIndex = null;
let equalStatus = false;
calcDisplay.textContent = currentNumber;


for(i = 0; i<4 ; i++) {
    operations[i] = new Operator();
    operations[i].doOperation = functionality[i];
    operations[i].operatorClicked = false;
}
operations[0].operatorClicked = true;


document.addEventListener('click',(e)=>{
    target = e.target;


    if(target.classList.contains("number")) {
        if(equalStatus == true){
            currentNumber = '0';
            ans = '0';
            equalStatus = false;
            operations[0].operatorClicked = true;
            calcDisplay.textContent = currentNumber;
        }
            if(+currentNumber + (+target.textContent) == 0 && currentNumber == "0") {
                currentNumber = '0';
            }else if(currentNumber == '0'){
                currentNumber = target.textContent;
            }else if(currentNumber.length <10) {
                currentNumber += target.textContent;
            }
            calcDisplay.textContent = currentNumber;
        
    }
    
    else if(target.classList.contains("operator")) {
        opIndex = signs.indexOf(target.id);
        ans = operations[opIndex].operate(ans, currentNumber);
        currentNumber = '0';
        ans = Math.round(ans*10000000000)/10000000000;
        calcDisplay.textContent = ans;
        equalStatus = false;
    }
    
    else if(target.id == "equal") {
        for(let operation of operations) {
            if(operation.operatorClicked == true) {
                operation.operatorClicked = false;
                ans = operation.doOperation(+ans, +currentNumber);
            }
        }
        ans = Math.round(ans*10000000000)/10000000000;
        calcDisplay.textContent = ans;
        currentNumber = String(ans);
        equalStatus = true;
    }
    
    else if(target.id == 'delete') {
        if(currentNumber.length != 1){
            if(currentNumber[currentNumber.length-1] == '.'){
            }
            currentNumber = currentNumber.slice(0,currentNumber.length-1);
        }else if(currentNumber != 0 ) {
            currentNumber = '0';
        }
        calcDisplay.textContent = currentNumber;
        if(equalStatus = true) {
            equalStatus = false;
            ans = 0;
            operations[0].operatorClicked = true;
        }
    }
    else if(target.id == 'clear') {
        currentNumber = '0';
        ans = '0'
        for(operation of operations) {
            operations.operatorClicked = false;
        }
        operations[0].operatorClicked = true;
        calcDisplay.textContent = currentNumber;
        equalStatus = false;
    }
    else if(target.id == 'decimal') {
        if(currentNumber.includes('.') == false &&  currentNumber.length <23) {
            currentNumber += '.';
            calcDisplay.textContent = currentNumber;
            if(equalStatus = true) {
            equalStatus = false;
            operations[0].operatorClicked = true;
            ans = 0;
        }
        }
    }else if(target.id == 'percent') {
        currentNumber = String(+currentNumber/100);
        currentNumber = Math.round(currentNumber*10000000000)/10000000000;
        calcDisplay.textContent = currentNumber;
        if(equalStatus = true) {
            equalStatus = false;
            operations[0].operatorClicked = true;
            ans = 0;
        }
    }
}
)