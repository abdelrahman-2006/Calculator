let operations = [];
let functionality = [];


functionality[0] = function(firstNum, secondNum) {
    return firstNum + secondNum;
};
functionality[1] = function(firstNum, secondNum) {
    return firstNum - secondNum;    
};
functionality[2] = function(firstNum, secondNum) {
    return firstNum * secondNum;    
};
functionality[3]  = function(firstNum, secondNum) {
    return firstNum / secondNum;    
};

//the operation is calculated with the next one as we wont have the complete number until that time
let Operator = function() {
    this.operatorClicked = false;
    this.operate = function(firstNum, secondNum) {
        for(let operation of operations) {
            if(operation.operatorClicked == true) {
                operation.operatorClicked = false;
                this.operatorClicked = true;
                return operation.doOperation(+firstNum, +secondNum);
            }
        }
        this.operatorClicked = true;
    }
}