class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operator = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (this.currentOperand === '0' || this.currentOperand === this.previousOperand) {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    appendDecimal() {
        if (!this.currentOperand.includes('.') && this.previousOperand !== '') {
            this.currentOperand += '.';
        }
    }

    chooseOperation(operator) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operator) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation.toFixed(2); 
        this.operator = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand + (this.operator ? ` ${this.operator}` : '');
    }
}
    

const numberButtons = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");
const decimal = document.querySelector(".decimal");
const previousOperandTextElement = document.querySelector(".first-function");
const currentOperandTextElement = document.querySelector(".last-function");

const  calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
    
});
decimal.addEventListener("click", () => {
    calculator.appendDecimal();
    calculator.updateDisplay();
});

operator.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equal.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
});

clear.addEventListener("click", button => {
    calculator.clear();
    calculator.updateDisplay();
});

backspace.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
});
