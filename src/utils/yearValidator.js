/**
 * Валидация ввода года
 * Проверка:
 *  год меньше 4 цифр
 *  тольоко числа
 *  первая цира не ноль!
 *  в зависимости от длинны введенного числа
 *      если до введенной цифры введенная часть числа совпадает с аналогичной частью текущео года
 *          и если введенная цифра больше той что должна идти дальше судю по году
 *              то валидация не прошла - > вернуть предыдущее введенное значение
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