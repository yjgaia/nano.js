let result = nano({
    name: '덧셈',
    desc: '두 수를 더합니다.',
    type: 'calc',
    inputs: ['첫번째 수', '두번째 수'],
    calc: (get) => {
        return get('첫번째 수') + get('두번째 수');
    }
});

document.title = 'Nanoapps - ' + result.name;
document.querySelector('#root').append(result.desc, result.app.getEl());