/**
 * Генерация нвоой книги
 * Проставляются автоматически:
 *  id - текущий timestamp + рандомное число длинной 10^6
 *  addDate - текущий timestamp (числа сортировать проще :) )
 *  eitDate - null
 *
 * @param name
 * @param author
 * @param year
 * @returns {{year: *, author: *, name: *, id: number, addDate: *, editDate: null}}
 * @constructor
 */
const Book = ({ name, author, year }) => {
    return {
        id: Date.now() + Math.ceil(Math.random()*100000),
        name: name,
        author: author,
        year: year,
        addDate: Date.now(),
        editDate: null
    }
};

export default Book;