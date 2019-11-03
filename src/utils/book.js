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