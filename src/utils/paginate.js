import {settings} from "./../config";

const paginate = (data, currentPage) => {
    let lastIndex = currentPage * settings.rowsShownAtOneTime >= data.length
        ? data.length
        : currentPage * settings.rowsShownAtOneTime;
    return data.slice((currentPage - 1) * settings.rowsShownAtOneTime, lastIndex);
};

export default paginate;