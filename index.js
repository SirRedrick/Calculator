import { add, subtract, multiply, divide } from './scripts/operations.js';

let input = {
	ref: document.querySelector('.input'),
	previousValue: [],
	currentValue: [],
	operation: null,
};
const buttons = document.querySelector('.buttons');

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
	input.ref.innerHTML = input.currentValue.join('');
};

buttons.addEventListener('click', ({ target }) => {
	if (input.currentValue.join('') === 'ERROR') {
		input.currentValue = [];
		renderInput();
	}
	const button = target.parentNode.dataset.button || target.dataset.button;
	const type = target.parentNode.dataset.type || target.dataset.type;

	if (type === 'number') {
		if (input.currentValue.length > 12) return;
		input.currentValue = [...input.currentValue, button];
		renderInput();
		return;
	}

	switch (button) {
		case 'EQUAL':
			if (input.operation !== null) {
				input.currentValue = (
					'' + operate(input.operation, +input.previousValue.join(''), +input.currentValue.join(''))
				).split('');
			}
			input.previousValue = [];
			input.operation = null;
			renderInput();
			break;
		case 'CLEAR':
			input = {
				ref: input.ref,
				previousValue: [],
				currentValue: [],
				operation: null,
				isDecimal: false,
			};
			renderInput();
			break;
		case 'CLEAR-ENTRY':
			input.currentValue = [];
			renderInput();
			break;
		case 'DELETE':
			input.currentValue.pop();
			renderInput();
			break;
		case 'NEGATE':
			{
				let temp = [...input.currentValue];
				if (input.currentValue[0] === '-') {
					temp.shift();
				} else {
					temp.unshift('-');
				}
				input.currentValue = temp;
				renderInput();
			}
			break;
		case 'DECIMAL':
			{
				let temp = [...input.currentValue];
				if (input.currentValue.includes('.')) return;
				temp.push('.');
				input.currentValue = temp;
				renderInput();
			}
			break;
		default:
			if (input.operation !== null) {
				input.currentValue = (
					'' + operate(input.operation, +input.previousValue.join(''), +input.currentValue.join(''))
				).split('');
				renderInput();
				input.previousValue = [...input.currentValue];
				input.currentValue = [];
				input.operation = button;
				return;
			}
			input.operation = button;
			input.previousValue = [...input.currentValue];
			input.currentValue = [];
			renderInput();
	}
});
