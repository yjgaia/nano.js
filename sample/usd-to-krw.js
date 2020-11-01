let result = nano({
    name: '원화(￦)↔달러($) 계산',
    desc: '원화(￦)와 달러($)를 계산합니다.',
    type: 'unit-api',
    api: 'https://api.exchangeratesapi.io/latest?base=USD',
    units: {
        '원(￦)': 'rates.KRW',
        '달러($)': 1
    }
});

document.title = 'Nanoapps - ' + result.name;
document.querySelector("#root").append(result.desc, result.app.getEl());