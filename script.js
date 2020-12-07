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
const back = document.querySelector(`#back`);
back.addEventListener('click', backSave);
const sign = document.querySelector(`#sign`);
sign.addEventListener('click', changeSign);
let save;

function backSave() {
    display.textContent = save;
}

function operate() {
    let result;
    save = display.textContent;
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
    display.textContent = +mas[0].toFixed(10);;
}


function delSymbol() {
    save = display.textContent;
    do
        display.textContent = `${ display.textContent.slice(0,-1)}`
    while (display.textContent.slice(-1) === " ");
}

function changeSign() {
    let mas = (display.textContent).split(' ');
    mas[mas.length - 1] = +mas[mas.length - 1] * (-1);
    display.textContent = mas.join(` `);
}

function clearDisplay() {
    save = display.textContent;
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
    if (y === 0) {
        alert('Ты что, решил делить на 0? Не надо так!!!');
        clearDisplay();
        return null;
    } else
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
    if (button.id === `sign`) {
        changeSign();
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
    display.scrollTop = display.scrollHeight;
    if (e.currentTarget.id === `separator`) {
        let mas = (display.textContent).split(' ');
        if (mas[mas.length - 1].includes(`.`)) {
            return;
        }
    }

    if (e.currentTarget.className.includes(`operation`)) {
        let mas = (display.textContent).split(' ');
        if (mas[mas.length - 2] === '+' || mas[mas.length - 2] === '-' || mas[mas.length - 2] === '*' || mas[mas.length - 2] === '/' || mas[mas.length - 2] === '+') {
            mas[mas.length - 2] = e.currentTarget.dataset.count;
            display.textContent = mas.join(` `);
        } else {
            display.textContent = `${display.textContent + ' ' + e.currentTarget.dataset.count + ' '}`;
        }
    } else {
        display.textContent = `${display.textContent + e.currentTarget.dataset.count}`;
    }
}

function addTextKey(e) {
    if (!e) return;
    if (e.className.includes(`service`)) {
        return;
    }
    display.scrollTop = display.scrollHeight;
    if (e.id === `separator`) {
        let mas = (display.textContent).split(' ');
        if (mas[mas.length - 1].includes(`.`)) {
            return;
        }
    }

    if (e.className.includes(`operation`)) {
        let mas = (display.textContent).split(' ');
        if (mas[mas.length - 2] === '+' || mas[mas.length - 2] === '-' || mas[mas.length - 2] === '*' || mas[mas.length - 2] === '/' || mas[mas.length - 2] === '+') {
            mas[mas.length - 2] = e.dataset.count;
            display.textContent = mas.join(` `);
        } else {
            display.textContent = `${display.textContent + ' ' + e.dataset.count + ' '}`;
        }
    } else {
        display.textContent = `${display.textContent + e.dataset.count}`;
    }
}
