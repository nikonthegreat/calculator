var calc = new Calculator({
        element: document.getElementById('calculator')
});

$(document).keydown(calc.keyPressHandler.bind(calc));
