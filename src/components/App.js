import React, { Component } from 'react';
import { hot } from "react-hot-loader";

import yearValidator from "./../utils/yearValidator";
import Book from "./../utils/book";
import sort from "./../utils/sort";
import search from "./../utils/search";

import Table from "./Table";
import Form from "./Form";
import { settings } from "./../config";
import "./../styles.css";

class App extends Component {
    constructor(props){
        super(props);

        let doesNeedSortKeys = {};
        settings.header.sortKeys.forEach(key => doesNeedSortKeys[key] = 0);
        this.state = {
            books: JSON.parse(data),
            formDisabled: true,
            editBook: {},
            sortStatus: doesNeedSortKeys,
            alertMessage: '',
            searchValue: '',
            currentPage: 1
        };
        this.addBook = this.addBook.bind(this);
        this.saveBook = this.saveBook.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.handleChangeForm = this.handleChangeForm.bind(this);
        this.handleSearchRequest = this.handleSearchRequest.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.editBook = this.editBook.bind(this);
        this.handleSortRequest = this.handleSortRequest.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.moveToPage = this.moveToPage.bind(this);
    }

    addBook() {
        this.setState({
            formDisabled: false
        });
    }

    cancelEdit() {
        this.setState({
            alertMessage: '',
            formDisabled: true,
            editBook: {}
        })
    }

    saveBook() {
        const { editBook, books, formDisabled } = this.state;
        if (!editBook.name || !editBook.author) {
            this.setState({alertMessage: "Поля 'Название книги' и 'Автор' должны быть заполнены"});
            return;
        }
        if (editBook.year &&
            editBook.year.length < 4) {
            this.setState({alertMessage: "Поле 'Год' должно содержать 4 цифры"});
            return;
        }
        if (+editBook.year > (new Date()).getFullYear()){
            this.setState({alertMessage: "Введенный год больше текущего"});
            return;
        }

        let booksCopy = books.slice();
        const formStatus = !formDisabled;
        if (editBook.id) {
            const editIndex = booksCopy.findIndex(book => book.id === editBook.id);
            booksCopy[editIndex] = Object.assign(editBook, {
                editDate: Date.now()
            });
        } else {
            booksCopy.push(new Book(editBook));
        }

        this.setState({
                alertMessage: '',
                books: booksCopy,
                formDisabled: formStatus,
                editBook: {}
        });
    }

    editBook(index) {
        const { books, formDisabled } = this.state,
            book = books[index];

        if (!formDisabled) {
            return;
        }

        this.setState({
            formDisabled: false,
            editBook: {
                id: book.id,
                name: book.name,
                author: book.author,
                year: book.year,
                addDate: book.addDate
            }
        })
    }

    deleteBook(index) {
        const { books, formDisabled } = this.state,
            data = books.slice();
        data.splice(index, 1);

        if (!formDisabled) {
            return;
        }

        this.setState({
            books: data
        });
    }

    handleChangeForm(event) {
        const { editBook } = this.state,
            key = event.target.name;
        let value = event.target.value;

        if (key === 'year') {
            value = yearValidator(editBook[key], value);
        } else if (editBook.hasOwnProperty(key)) {
            if (value.length > settings.inputTextMaxSize) {
                value = editBook[key];
            }
        }

        const editBookCopy = Object.assign(editBook, {
            [key]: value
        });

        this.setState({
            editBook: editBookCopy
        });
    }

    handleSortRequest(key) {
        const { sortStatus } = this.state,
            sortVals = settings.sortValues,
            newSortStatus = Object.assign(sortStatus, {
                [key]: sortVals[(sortVals.indexOf(sortStatus[key]) + 1) % sortVals.length]
            });

        this.setState({
            sortStatus: newSortStatus
        });
    }

    handleSearchRequest(event) {
        this.setState({searchValue: event.target.value});
    }

    moveLeft() {
        const { currentPage } = this.state;
        if (currentPage > 1) {
            const prevPage = currentPage - 1;
            this.setState({
                currentPage: prevPage
            });
        }
    }

    moveRight(edge) {
        const { currentPage } = this.state;
        if (currentPage < edge) {
            const nextPage = currentPage + 1;
            this.setState({
                currentPage: nextPage
            });
        }
    }

    moveToPage(page) {
        this.setState({currentPage: page});
    }

    render() {
        const { books, formDisabled, editBook, sortStatus, alertMessage, searchValue, currentPage } = this.state;
        const { addBook, saveBook, cancelEdit,
                handleChangeForm, handleSearchRequest, handleSortRequest,
                deleteBook, moveLeft, moveRight, moveToPage } = this;
        return (
            <div>
                <div className="show_hide_form">
                    {formDisabled ? (
                        <button className="add_save_book"
                                onClick={addBook}>Добавить книгу</button>
                    ) : (
                        <div className="save_cancel">
                            <button className="add_save_book"
                                    onClick={saveBook}>Сохранить</button>
                            <button className="add_save_book"
                                    onClick={cancelEdit}>Отменить</button>
                        </div>
                    )}
                    <Form disabled={formDisabled}
                          handleChange={handleChangeForm}
                          book={editBook}/>
                </div>
                <div id="alert_message">{alertMessage}</div>
                <input id="search"
                       name="search"
                       type="text"
                       placeholder="Поиск по книге и по автору..."
                       onChange={handleSearchRequest}/>

                <Table data={sort(search(books, searchValue.toLowerCase()), sortStatus)}
                       deleteBook={deleteBook}
                       editBook={this.editBook}
                       handleSortRequest={handleSortRequest}
                       sortStatus={sortStatus}
                       currentPage={currentPage}
                       moveLeft={moveLeft}
                       moveRight={moveRight}
                       moveToPage={moveToPage}/>
            </div>
        )
    }
}

export default hot(module)(App);