let result = nano({
	name: '제곱미터(m²)↔평수(坪) 계산 (함수)',
	desc: '제곱미터(m²)와 평(坪)을 함수로 계산합니다.',
	type: 'func',
	inputs: ['㎡', '평'],
	func: (input, value, set) => {
		if (input === '㎡') {
			set('평', value / 3.305785);
		} else if (input === '평') {
			set('㎡', value * 3.305785);
		}
	}
});

document.title = 'Nanoapps - ' + result.name;
document.querySelector('#root').append(result.desc, result.app.getEl());