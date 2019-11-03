const settings = {
    header: {
        data: {
            id: 'ID',
            name: 'Название',
            author: 'Автор',
            year: 'Год выпуска',
            addDate: 'Дата добавления',
            editDate: 'Дата редактирования'
        },
        sortKeys: ['year', 'addDate', 'editDate']
    },
    sortValues: [-1, 0, 1],         // 0 - не отсортирован, 1 - по возрастанию, -1 - по убыванию
    inputTextMaxSize: 30,
    rowsShownAtOneTime: 5
};

export { settings };