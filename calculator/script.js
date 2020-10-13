class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
        this.Res = false;
        this.currentOperandTextElement.innerText = '0'
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        this.Res = false;
        this.currentOperandTextElement.innerText = '0'
        this.currentOperand = '0'
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    choosOperation(operation) {
        if(this.currentOperand === '') return
        if(this.currentOperand !== '' && this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computetion
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        if (prev < 0 && this.operation === 'y√x') {
            alert('Извлечение корня, из отрицательных чисел, ЗАПРЕЩЕНО в этой вселенной, поищите себе другую.')
            this.currentOperand = ''
            this.previousOperand = ''
            this.operation = undefined
            this.Res = false;
            this.currentOperandTextElement.innerText = '0'
            this.currentOperand = '0'
        }
        switch(this.operation) {
            case '+':
                let a = prev + current
                computetion = parseFloat(a.toFixed(14))
                break
            case '-':
                let b = prev - current
                computetion = parseFloat(b.toFixed(14))
                break
            case '*':
                let c = prev * current
                computetion = parseFloat(c.toFixed(14))
                break
            case '÷':
                let d = prev / current
                computetion = parseFloat(d.toFixed(14))
                break
            case 'x^y':
                computetion = prev ** current
                break
            case 'y√x':
                computetion = prev ** (1/current)
                break
            case '±':
                computetion = prev * -1
                break
            default:
                return
        }
        this.currentOperand = computetion
        this.operation = undefined
        this.previousOperand = ''
        this.Res = true;
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            let a = `${integerDisplay}.${decimalDigits}`
            return a
        } else {
            return integerDisplay
        }
    }
    


    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
          this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
          
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

    invers() {
        if(calculator.previousOperand === '' && calculator.currentOperand === '') {
            return
        } else {
            let inversNumber = parseFloat(this.currentOperand) * -1
            this.currentOperand = inversNumber
        }
    }

    sqr() {
        if(this.currentOperand < 0) {
            alert('Извлечение корня, из отрицательных чисел, ЗАПРЕЩЕНО в этой вселенной, поищите себе другую.')
            this.currentOperand = ''
            this.previousOperand = ''
            this.operation = undefined
            this.Res = false;
            this.currentOperandTextElement.innerText = '0'
            this.currentOperand = '0'
        }
        let sqrCurrenOperand = this.currentOperand
        let sqrNumber = (sqrCurrenOperand) ** (1/2)
        this.currentOperand = sqrNumber
        calculator.Res = true
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operations]')
const equalsButton = document.querySelector('[data-equals]') 
const deleteButton = document.querySelector('[data-delete]') 
const allClearButton = document.querySelector('[data-all-clear]') 
const inversButton = document.querySelector('[data-invers]')
const sqrButton = document.querySelector('[data-sqr]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]') 
const currentOperandTextElement = document.querySelector('[data-current-operand]') 

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(calculator.previousOperand === '' && calculator.currentOperand !== '' && calculator.Res === true) {
            calculator.currentOperand = ''
            calculator.Res = false
        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.choosOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

inversButton.addEventListener('click', button => {
    calculator.invers()
    calculator.updateDisplay()
})

sqrButton.addEventListener('click', button => {
    calculator.sqr()
    calculator.updateDisplay()
})