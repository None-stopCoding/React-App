// TODO оптимизировать
const validateYear = (prevValue, value) => {
    let yearNow = (new Date()).getFullYear().toString();
    if (value.length > 4 ||
        isNaN(+value) ||
        (+value[0] === 0) ||
        (value.length === 4 &&
            value[0] === yearNow[0] &&
            value[1] === yearNow[1] &&
            value[2] === yearNow[2] &&
            +value[3] > +yearNow[3]) ||
        (value.length === 3 &&
            value[0] === yearNow[0] &&
            value[1] === yearNow[1] &&
            +value[2] > +yearNow[2]) ||
        (value.length === 2 &&
            value[0] === yearNow[0] &&
            +value[1] > +yearNow[1]) ||
        (value.length === 1 && +value[0] > +yearNow[0])) {

        return prevValue;
    }
    return value.trim();
};

export default validateYear;