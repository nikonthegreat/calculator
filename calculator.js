'use strict';

class Calculator {
    constructor(options) {
        this._element = options.element;

        this._clearAll();
        this._element.addEventListener('click', this._onCalculatorClicked.bind(this));

        this._actions = {
            divide: this._pressOperation.bind(this, '/'),
            multiply: this._pressOperation.bind(this, '*'),
            sub: this._pressOperation.bind(this, '-'),
            sum: this._pressOperation.bind(this, '+')
        }
    }

    keyPressHandler( event ) {
        switch( event.which ) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
            case 48:
                this._pressNumButton( String(Number(event.which)-48) );
                break;
            case 96:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
                this._pressNumButton( String(Number(event.which)-96) );
                break;
            case 106:
                this._actions.multiply();
                break;
            case 109:
                this._actions.sub();
                break;
            case 107:
                this._actions.sum();
                break;
            case 110:
                // TODO comma
                break;
            case 8:
                this._eraseLast();
                break;
            case 46:
                this._clearAll();
                break;
            case 13:
                this._evaluateResult();
                break;
        }
    }

    _onCalculatorClicked(event) {
        var pressedButton = event.target.dataset['button'];

        switch( pressedButton  ) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this._pressNumButton(pressedButton);
                break;
            case 'button-divide':
                this._actions.divide();
                break;
            case 'button-multiply':
                this._actions.multiply();
                break;
            case 'button-sub':
                this._actions.sub();
                break;
            case 'button-sum':
                this._actions.sum();
                break;
            case 'button-comma':
                // TODO comma
                break;
            case 'button-erase':
                this._eraseLast();
                break;
            case 'button-clear':
                this._clearAll();
                break;
            case 'button-result':
                this._evaluateResult();
                break;
        }
    }

    _clearAll() {
        this._memory1 = "";
        this._memory2 = "";
        this._operation = "";
        this._clearHistory();
        this._printResult("0");
    }

    _eraseLast() {
        if( this._evaluated ) {
            return;
        }

        if( this._operation ) {
            this._memory2 = this._memory2.slice(0,-1);

            if( this._memory2.length > 0 )
                this._printResult(this._memory2);
            else
                this._printResult("0");
        }
        else {
            this._memory1 = this._memory1.slice(0,-1);

            if( this._memory1.length > 0 )
                this._printResult(this._memory1);
            else
                this._printResult("0");
        }
    }

    _pressNumButton( number ) {
        console.log('123');
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
        if( this._operation && this._memory2 )
            this._evaluateResult();

        this._operation = operation;
        this._printHistory();
        this._memory2 = '';
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

        this._memory1 = result;
        this._clearHistory();
        this._printResult(result);
        this._evaluated = true;
    }

    _clearHistory() {
        this._setHistory('');
    }

    _printHistory() {
        this._setHistory( `${this._memory1} ${this._operation}` );
    }

    _setHistory( historyString ) {
        var historyField = this._element.querySelector('[data-field=history]');
        historyField.textContent = historyString;
    }

    _printResult( resultString ) {
        var resultField = this._element.querySelector('[data-field=result]');
        resultField.textContent = resultString;
        this._evaluated = false;
    }
}
