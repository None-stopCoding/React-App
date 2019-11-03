/**
 * Механизм работы функции сортировки:
 *  - при нажатии на заголовок в таблице - соответствующее значение получает
 *      перемещается на 'последнее место' в объекте sortStatus с измененнным статусом
 *  - здесь пробегаемся по объекту статусов сортировки полей и если надо сортировать
 *      то сортируем значения в завасимостти от статуса
 *  - таким образом значения всегда будут отсортированы по заголовкам в
 *      том порядке, в каком их нажал пользователь
 * @param sortKeys
 * @param books
 * @returns {*}
 */
const sort = (books, sortKeys) => {
    let data = books.slice();
    Object.entries(sortKeys).forEach(([key, value]) => {
        if (value !== 0)
            data.sort((book, nextBook) => {
                if (value > 0)
                    return book[key] - nextBook[key];
                else
                    return nextBook[key] - book[key];
            });
    });
    return data;
};

export default sort;