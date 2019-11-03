/**
 * Валидация ввода года
 * @param prevValue
 * @param value
 * @returns {*|string}
 */
const validateYear = (prevValue, value) => {
    let yearNow = (new Date()).getFullYear().toString();

    if (value.length > 4 ||
        isNaN(+value) ||
        (+value[0] === 0) ||
        (() => {
            let iter = yearNow.length;
            while(iter > 0) {
                if (value.length === iter) {
                    let index = 0;
                    while (index < iter - 1)
                        if (value[index] !== yearNow[index++])
                            break;
                    if (index === iter - 1 && +value[index] > +yearNow[index]) return true;
                }
                iter--;
            }
        })()) {

        return prevValue;
    }
    return value.trim();
};

export default validateYear;