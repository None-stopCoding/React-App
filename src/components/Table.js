import React from "react";
import { Pagination } from "./rules";
import { paginate, convertUnix } from "./../utils/rules";
import { settings } from "./../config";

/**
 * Основная таблица
 * @param data
 * @param needSort
 * @param canSort
 * @param currentPage
 * @param handleSortRequest
 * @param deleteBook
 * @param editBook
 * @param moveLeft
 * @param moveRight
 * @param moveToPage
 * @returns {*}
 * @constructor
 */
const Table = ({ data, sortStatus, currentPage, handleSortRequest,
                   deleteBook, editBook, moveLeft, moveRight, moveToPage }) => {
    // количество страниц для пагинации
    const pagesAmount = Math.ceil(parseFloat((data.length/settings.rowsShownAtOneTime).toFixed(2)));
    // массив отображаемых данных на текущей странице
    let currentData = paginate(data, currentPage);

    // пока предыдущая страница существует и
    //      на текущей странице данных нет - перейти на предыдущую страницу
    while (!currentData.length && currentPage > 1) {
        currentData = paginate(data, --currentPage);
    }
    return (
        <div>
            {currentData.length > 0 ? (
                <div>
                    <table>
                        <tbody>
                        <Header sortStatus={ sortStatus }
                                handleClick={ handleSortRequest }/>
                        {
                            currentData.map((book, index) => {
                                // индекс строки в массиве всех книг
                                const realIndex = (currentPage - 1) * settings.rowsShownAtOneTime + index;
                                return <Row  key={ book.id }
                                             book={ book }
                                             deleteBook={ () => deleteBook(realIndex)}
                                             editBook={ () => editBook(realIndex) }/>
                            })

                        }
                        </tbody>
                    </table>
                    <Pagination currentPage={ currentPage }
                                pagesAmount={ pagesAmount }
                                moveLeft={ moveLeft }
                                moveRight={ moveRight }
                                moveToPage={ moveToPage }/>
                </div>
            ) : (
                <h1 style={ {clear: "left"} }>Книг нет.</h1>
            )}
        </div>
    )
};

/**
 * Компонет заголовка
 *  если по полю можно сортироваться
 *      то взавизимости от направления сортировки отобразить стрелки
 * @param sortStatus
 * @param handleClick
 * @returns {*}
 * @constructor
 */
const Header = ({ sortStatus, handleClick }) => {
    return (
        <tr className="row">
            <th colSpan={2}>{}</th>
            {
                Object.entries(settings.header.data).map( ([key, value], index) => {
                    let wrappedItem = value;
                    if (settings.header.sortKeys.includes(key)) {
                        wrappedItem =
                            <span>
                                { sortStatus[key] > 0 && <span> &#8593;</span> }
                                { sortStatus[key] < 0 && <span> &#8595; </span> }
                                <span className="sort" onClick={ () => handleClick(key)}>{ value }</span>
                                { sortStatus[key] > 0 && <span> &#8593;</span> }
                                { sortStatus[key] < 0 && <span> &#8595; </span> }
                            </span>;
                    }

                    return <th key={ index }>{ wrappedItem }</th>
                })
            }
        </tr>
    )
};

/**
 * Строка записи о книге в таблице
 * @param book
 * @param deleteBook
 * @param editBook
 * @returns {*}
 * @constructor
 */
const Row = ({ book, deleteBook, editBook }) => {
    const { id, name, author, year, addDate, editDate } = book;
    return (
        <tr>
            <td className="remove_edit" onClick={ deleteBook }><img src="./img/remove.jpg" alt="Remove"/></td>
            <td className="remove_edit" onClick={ editBook }><img src="./img/edit.png" alt="Edit"/></td>
            <Cell data={ id } className="center_data"/>
            <Cell data={ name }/>
            <Cell data={ author }/>
            <Cell data={ year } className="center_data"/>
            <DateCell timestamp={ addDate }/>
            <DateCell timestamp={ editDate }/>
        </tr>
    )
};

/**
 * Одно из значение объекта 'книга'
 * @param data
 * @param className
 * @returns {*}
 * @constructor
 */
const Cell = ({ data, className }) =>
    <td className={className || ''}>{ data }</td>;

/**
 * занчение типа DateTime объекта 'книга'
 * @param timestamp
 * @returns {*}
 * @constructor
 */
const DateCell = ({ timestamp }) =>
    <td className="center_data">{ timestamp && convertUnix(+timestamp) }</td>;

export default Table;