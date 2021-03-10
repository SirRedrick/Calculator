import { add, subtract, multiply, divide } from './scripts/operations.js';

const operate = (operator, num1, num2) => {
	switch (operator) {
		case 'ADD':
			return add(num1, num2);
		case 'SUBTRACT':
			return subtract(num1, num2);
		case 'MULTIPLY':
			return multiply(num1, num2);
		case 'DIVIDE':
			return divide(num1, num2);
	}
};

const renderInput = () => {
	input.ref.innerHTML = input.value.join('');
};

const input = {
	ref: document.querySelector('.input'),
	value: [],
	operaion: null,
	isDecimal: false,
};
const buttons = document.querySelector('.buttons');

buttons.addEventListener('click', ({ target }) => {
	const button = target.parentNode.dataset.button || target.dataset.button;
	const type = target.parentNode.dataset.type || target.dataset.type;

	if (type === 'number') {
		if (input.value.length > 14) return;
		input.value = [...input.value, button];
		renderInput();
	}
});
