import { settings } from "./../config";

/**
 * Возвращает массив строк - как срез общего массива книга в зависимости от текущей страницы
 * @param data
 * @param currentPage
 * @returns {*}
 */
const paginate = (data, currentPage) => {
    let lastIndex = currentPage * settings.rowsShownAtOneTime >= data.length
        ? data.length
        : currentPage * settings.rowsShownAtOneTime;
    return data.slice((currentPage - 1) * settings.rowsShownAtOneTime, lastIndex);
};

export default paginate;