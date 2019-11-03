/**
 * Поиск по названию книги и по автору
 * @param data
 * @param value
 * @returns {*}
 */
const search = (data, value) => data.filter(item =>
        item.name.toLowerCase().indexOf(value) >= 0 || item.author.toLowerCase().indexOf(value) >= 0);

export default search;