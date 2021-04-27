class Calculate {
    constructor(previousValueOnDisplay, currentValueOnDisplay) {
        $('.calc-result-previous-value').text(' ');
        $('.calc-result-current-value').text(currentValueOnDisplay);
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '0';
        $('.calc-result-current-value').text('0');
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand == '' && this.previousOperand == '') {
            this.currentOperand = '0';
        }
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return
        }

        if (this.currentOperand == '0') {
            this.currentOperand = '';
        }

        if (number === '.' && this.currentOperand == '') {
            this.currentOperand = '0';
        }


        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    choseOperation(operation) {
        this.operation = operation;
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''
    }

    compute() {
        let computation
        const previous = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = previous + current
                break
            case '-':
                computation = previous - current
                break
            case '*':
                computation = previous * current
                break
            case '/':
                if (current !== 0) {
                    computation = previous / current
                }
                else {
                    computation = 'Eror';
                    voice();
                }
                break
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateOnDisplay() {
        $('.calc-result-current-value').text(this.currentOperand)
        if (this.operation != null) {
            $('.calc-result-previous-value').text(`${this.previousOperand} ${this.operation}`);
        }
        else {
            $('.calc-result-previous-value').text(' ');
        }
    }

    getValue(previousValue, currentValue) {
        this.previousOperand = previousValue;
        this.currentOperand = currentValue;
    }

    update() {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
    }

    getOperator() {
        return this.currentOperand;
    }
    getLastResult() {
        return this.previousOperand;
    }

}

function voice() {
    speechSynthesis.speak(new SpeechSynthesisUtterance('Слышь, ты куда на 0 делишь! Я тебе ща поделю'));
}

$(window).load(function () {
    const allButtons = $('.calc-button');
    const previousValueOnDisplay = $('.calc-result-previous-value').get(0);
    const currentValueOnDisplay = $('.calc-result-current-value').get(0);
    const calculator = new Calculate(previousValueOnDisplay, currentValueOnDisplay);
    var number = /\d|\./g;
    var operation = /\-|\+|\*|\//g

    allButtons.click(function () {
        console.log($(this).text());
        console.log($(this).text().match(number));
        if ($(this).text() == $(this).text().match(number)) {
            calculator.appendNumber($(this).text());
            calculator.updateOnDisplay();
        }
        if ($(this).text() == $(this).text().match(operation)) {
            calculator.choseOperation($(this).text());
            if (calculator.getLastResult() == 'Eror') {
                calculator.updateOnDisplay();
                calculator.update();
            }
            else {
                calculator.updateOnDisplay();
            }
        }
        if ($(this).text() == '=') {
            calculator.compute();
            if (calculator.getOperator() == 'Eror') {
                calculator.updateOnDisplay();
                calculator.update();
            }
            else {
                calculator.updateOnDisplay();
            }
            if ($(this).text() == '') {
                let temp = previousValueOnDisplay.text().slice(0, -2);
                calculator.clear();
                currentValueOnDisplay.text() = temp;
                previousValueOnDisplay.text() = '';
                calculator.getValue('', temp);
            }
        }
        if ($(this).text() == 'C') {
            calculator.clear()
            calculator.updateOnDisplay();
        }
        if ($(this).text() == '&lt;-') {
            calculator.delete()
            calculator.updateOnDisplay();
        }
    })

});