global.nano = METHOD({

    run: (def) => {

        let app = DIV({
            cls: 'app'
        });

        // 단위 변환기
        if (def.type === 'unit') {

            let inputs = [];

            EACH(def.units, (ratio, unit) => {

                let input;
                app.append(DIV({
                    cls: 'nano-input-container',
                    c: [input = INPUT({
                        cls: 'nano-input',
                        placeholder: unit,
                        on: {
                            keyup: () => {
                                let base = REAL(input.getValue()) / ratio;

                                EACH(inputs, (info) => {
                                    if (info.input !== input) {
                                        let result = base * info.ratio;
                                        if (isNaN(result) !== true) {
                                            info.input.setValue(result);
                                        }
                                    }
                                });
                            }
                        }
                    }), SPAN({
                        cls: 'nano-input-unit',
                        c: unit
                    })]
                }));

                inputs.push({
                    ratio: ratio,
                    input: input
                });
            });
        }

        // API를 이용한 단위 변환기
        else if (def.type === 'unit-api') {

            let inputs = [];

            EACH(def.units, (ratio, unit) => {

                let input;
                let debouncer = DEBOUNCER(300, () => {
                    GET(def.api, (data) => {
                        data = PARSE_STR(data);

                        let base;
                        if (typeof ratio === 'string') {
                            base = REAL(input.getValue()) / eval('data.' + ratio);
                        } else {
                            base = REAL(input.getValue()) / ratio;
                        }

                        EACH(inputs, (info) => {
                            if (info.input !== input) {

                                if (typeof info.ratio === 'string') {
                                    let result = base * eval('data.' + info.ratio);
                                    if (isNaN(result) !== true) {
                                        info.input.setValue(result);
                                    }
                                }

                                else {
                                    let result = base * info.ratio;
                                    if (isNaN(result) !== true) {
                                        info.input.setValue(result);
                                    }
                                }
                            }
                        });
                    });
                });

                app.append(DIV({
                    cls: 'nano-input-container',
                    c: [input = INPUT({
                        cls: 'nano-input',
                        placeholder: unit,
                        on: {
                            keydown: (e) => {
                                if (e.getKey() !== 'Tab') {
                                    debouncer.run();
                                }
                            }
                        }
                    }), SPAN({
                        cls: 'nano-input-unit',
                        c: unit
                    })]
                }));

                inputs.push({
                    ratio: ratio,
                    input: input
                });
            });
        }

        // 계산기
        else if (def.type === 'calc') {

            if (def.inputs === undefined) {
                app.append(DIV({
                    cls: 'result',
                    c: '= ' + def.calc()
                }));
            } else {

                let inputs = {};
                let calc = () => {
                    const result = def.calc((name) => {
                        return parseFloat(inputs[name].getValue());
                    });
                    resultPanel.empty();
                    resultPanel.append('= ' + result);
                };

                EACH(def.inputs, (name) => {

                    let input;
                    app.append(DIV({
                        cls: 'nano-input-container',
                        c: [input = INPUT({
                            cls: 'nano-input',
                            placeholder: name,
                            on: {
                                keyup: calc
                            }
                        }), SPAN({
                            cls: 'nano-input-unit',
                            c: name
                        })]
                    }));

                    inputs[name] = input;
                });

                let resultPanel;
                app.append(resultPanel = DIV({
                    cls: 'result',
                    c: '='
                }));
            }
        }

        // 함수
        else if (def.type === 'func') {

            let inputs = {};

            EACH(def.inputs, (name) => {

                let input;
                app.append(DIV({
                    cls: 'nano-input-container',
                    c: [input = INPUT({
                        cls: 'nano-input',
                        placeholder: name,
                        on: {
                            keyup: () => {
                                def.func(name, parseFloat(input.getValue()), (name, value) => {
                                    inputs[name].setValue(value);
                                });
                            }
                        }
                    }), SPAN({
                        cls: 'nano-input-unit',
                        c: name
                    })]
                }));

                inputs[name] = input;
            });
        }

        return {
            name: def.name,
            desc: def.desc,
            app: app
        };
    }
});