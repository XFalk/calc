window.addEventListener('keydown', touchKey);
const buttons = document.querySelectorAll(`.button`);
buttons.forEach(button => button.addEventListener('transitionend', removeTransition));
buttons.forEach(button => button.addEventListener('click', addText));
const display = document.querySelector(`.display`);
const clear = document.querySelector(`#clear`);
clear.addEventListener('click', clearDisplay);
const backspace = document.querySelector(`#backspace`);
backspace.addEventListener('click', delSymbol);
const equal = document.querySelector(`#equal`);
equal.addEventListener('click', operate);

function operate() {
    let result;
    let mas = ('0' + display.textContent).split(' ');
    if (mas[0].includes('-')) {
           mas[0] = mas[0].slice(1);
        }
        for (let i = 0; i < mas.length; i++) {
            if (mas[i] === '*') {
                result = getMultip(+mas[i - 1], +mas[i + 1]);
                mas.splice(i - 1, 3, result);
                i = 0;
            }
            if (mas[i] === '/') {
                result = getDivis(+mas[i - 1], +mas[i + 1]);
                mas.splice(i - 1, 3, result);
                i = 0;
            }
        }
        for (let i = 0; i < mas.length; i++) {
            if (mas[i] === '+') {
                result = getSum(+mas[i - 1], +mas[i + 1]);
                mas.splice(i - 1, 3, result);
                i = 0;
            }
            if (mas[i] === '-') {
                result = getDif(+mas[i - 1], +mas[i + 1]);
                mas.splice(i - 1, 3, result);
                i = 0;
            }
        }
        display.textContent = +mas[0];
    }

    function delSymbol() {
        do
            display.textContent = `${ display.textContent.slice(0,-1)}`
        while (display.textContent.slice(-1) === " ");
    }

    function clearDisplay() {
        display.innerHTML = ``;
    }

    function getSum(x, y) {
        return x + y;
    }

    function getDif(x, y) {
        return x - y;
    }

    function getMultip(x, y) {
        return x * y;
    }

    function getDivis(x, y) {
        return x / y;
    }

    function touchKey(e) {
        const button = document.querySelector(`.button[data-key='${e.keyCode}']`);
        if (!button) return;
        if (button.id === `equal`) {
            operate();
        }
        if (button.id === `clear`) {
            clearDisplay();
        }
        if (button.id === `backspace`) {
            delSymbol();
        }
        addTextKey(button);
        button.classList.add('playing');
    }

    function removeTransition(e) {
        this.classList.remove(`playing`);
    }

    function addText(e) {
        if (!e) return;
        if (e.currentTarget.className.includes(`service`)) {
            return;
        }
        if (e.currentTarget.className.includes(`operation`)) {
            display.textContent = `${display.textContent + ' ' + e.currentTarget.dataset.count + ' '}`;
        } else {
            display.textContent = `${display.textContent + e.currentTarget.dataset.count}`;
        }
    }

    function addTextKey(e) {
        if (!e) return;
        if (e.className.includes(`service`)) {
            return;
        }
        if (e.className.includes(`operation`)) {
            display.textContent = `${display.textContent + ' ' + e.dataset.count + ' '}`;
        } else {
            display.textContent = `${display.textContent + e.dataset.count}`;
        }
    }
