let result = nano({
    name: '현재 시간',
    desc: '현재 시간을 구합니다.',
    type: 'calc',
    calc: () => {
        return new Date().toLocaleString();
    }
});

document.title = 'Nanoapps - ' + result.name;
document.querySelector('#root').append(result.desc, result.app.getEl());