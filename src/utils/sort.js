const sort = (books, sortStatus) => {
    let data = books.slice();
    Object.entries(sortStatus).forEach(([key, value]) => {
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

export default { sort };