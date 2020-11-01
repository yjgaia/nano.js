let result = nano({
	name: '제곱미터(m²)↔평수(坪) 계산',
	desc: '제곱미터(m²)와 평(坪)을 계산합니다.',
	type: 'unit',
	units: {
		'㎡': 3.305785,
		'평': 1
	}
});

document.title = 'Nanoapps - ' + result.name;
document.querySelector('#root').append(result.desc, result.app.getEl());