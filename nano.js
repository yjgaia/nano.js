global.nano = METHOD({

    run: (def) => {

        let app = DIV();

        // 단위 변환기
        if (def.type === 'unit') {

            let inputs = [];

            EACH(def.units, (ratio, unit) => {

                let input;
                app.append(DIV({
                    c: [input = INPUT({
                        placeholder: unit,
                        on: {
                            keyup: (e) => {
                                let base = REAL(e.getKey()) / ratio;

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
        if (def.type === 'unit-api') {

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
                    c: [input = INPUT({
                        placeholder: unit,
                        on: {
                            keydown: (e) => {
                                if (e.getKey() !== 'Tab') {
                                    debouncer.run();
                                }
                            }
                        }
                    }), SPAN({
                        c: unit
                    })]
                }));

                inputs.push({
                    ratio: ratio,
                    input: input
                });
            });
        }

        return {
            name: def.name,
            desc: def.desc,
            app: app
        };
    }
});