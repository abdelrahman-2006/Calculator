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


document.addEventListener('click',(e)=>{
    target = e.target;


    if(target.classList.contains("number")) {
        if(error != true){
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
        
    }
    
    else if(target.classList.contains("operator")) {
        if(error == false){
            if(equalStatus == true ){
                currentNumber = String(ans);
                equalStatus = false;
                ans = 0;
                operations[0].operatorClicked = true;
            } else if(!isFinite(ans)) {
                calcDisplay.textContent = "Error"
                error = true
            }
            opIndex = signs.indexOf(target.id);
            ans = operations[opIndex].operate(ans, currentNumber);
            ans = Math.round(ans*10000000000)/10000000000;
            currentNumber = '0';
            calcDisplay.textContent = ans;
            equalStatus = false;
        }
    }
    
    else if(target.id == "equal") {
        if(error != true){
            for(let operation of operations) {
                if(operation.operatorClicked == true) {
                    operation.operatorClicked = false;
                    ans = operation.doOperation(+ans, +currentNumber);
                }
            }
            if(!isFinite(ans)) {
                calcDisplay.textContent = "Error"
                error = true
            }else{
                ans = Math.round(ans*10000000000)/10000000000;
                calcDisplay.textContent = ans;
                equalStatus = true;
            }
        }
    }
    
    else if(target.id == 'delete') {
        if(error == false){
        if(equalStatus == true ){
            currentNumber = String(ans);
            equalStatus = false;
            ans = 0;
            operations[0].operatorClicked = true;
        }
        if(currentNumber.length != 1){
            if(currentNumber[currentNumber.length-1] == '.'){
            }
            currentNumber = currentNumber.slice(0,currentNumber.length-1);
        }else if(currentNumber != 0 ) {
            currentNumber = '0';
        }
        calcDisplay.textContent = currentNumber;
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
        error = false
    }
    else if(target.id == 'decimal') {
        if(error == false)
        if(currentNumber.includes('.') == false &&  currentNumber.length <23) {
            currentNumber += '.';
            calcDisplay.textContent = currentNumber;
            if(equalStatus == true ){
            currentNumber = String(ans);
            equalStatus = false;
            ans = 0;
            operations[0].operatorClicked = true;
        }
        }
    }else if(target.id == 'percent') {
        if(error == false){
        currentNumber = String(+currentNumber/100);
        currentNumber = Math.round(currentNumber*10000000000)/10000000000;
        calcDisplay.textContent = currentNumber;
        if(equalStatus == true ){
            currentNumber = String(ans);
            equalStatus = false;
            ans = 0;
            operations[0].operatorClicked = true;
        }
        }
    }
}
)