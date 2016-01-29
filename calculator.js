'use strict';

class Calculator {
    constructor(options) {
        this._element = options.element;
        this._clearAll();
        this._element.addEventListener('click', this._onCalculatorClicked.bind(this));
    }

    _onCalculatorClicked(event) {
        var pressedButton = event.target.dataset['button'];
        if( pressedButton >= 0 && pressedButton < 10 ) {
            this._pressNumButton(pressedButton);
        }
        else if ( pressedButton === 'button-divide' ) {
            this._pressOperation('/');
        }
        else if ( pressedButton === 'button-multiply' ) {
            this._pressOperation('*');
        }
        else if ( pressedButton === 'button-sub' ) {
            this._pressOperation('-');
        }
        else if ( pressedButton === 'button-sum' ) {
            this._pressOperation('+');
        }
        else if ( pressedButton === 'button-comma' ) {

        }
        else if ( pressedButton === 'button-erase' ) {
            this._eraseLast();
        }
        else if ( pressedButton === 'button-clear' ) {
            this._clearAll();
        }
        else if ( pressedButton === 'button-result' ) {
            this._evaluateResult();
        }
    }

    _clearAll() {
        this._memory1 = "";
        this._memory2 = "";
        this._operation = "";
        this._printResult("0");
    }

    _eraseLast() {
        if( this._operation ) {
            this._memory2 = this._memory2.slice(0,-1);
            if( this._memory2.length > 0 )
                this._printResult(this._memory2);
            else
                this._printResult("0");
        }
        else {
            this._memory1 = this._memory1.slice(0,-1);
            this._printResult(this._memory1);
            if( this._memory1.length > 0 )
                this._printResult(this._memory1);
            else
                this._printResult("0");
        }
    }

    _pressNumButton( number ) {
        if( this._operation ) {
            this._memory2 += number;
            this._printResult(this._memory2);
        }
        else {
            this._memory1 += number;
            this._printResult(this._memory1);
        }
    }

    _pressOperation( operation ) {
        this._operation = operation;
    }

    _evaluateResult() {
        if( ! this._operation ) {
            return; // do nothing without operation (+ - / *)
        }

        var result = 0;
        switch( this._operation ) {
            case '+':
                result = Number(this._memory1) + Number(this._memory2);
                break;
            case '-':
                result = Number(this._memory1) - Number(this._memory2);
                break;
            case '/':
                result = Number(this._memory1) / Number(this._memory2);
                break;
            case '*':
                result = Number(this._memory1) * Number(this._memory2);
                break;
        }

        this._clearAll();
        this._memory1 = result;
        this._printResult(result);
    }

    _printResult( resultString ) {
        var resultField = this._element.querySelector('[data-field=result]');
        resultField.textContent = resultString;
    }
}
