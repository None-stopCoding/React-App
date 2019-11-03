import React from "react";
import Pagination from "./Pagination";
import paginate from "./../utils/paginate";
import convertUnix from "./../utils/convertUnix";
import { settings } from "./../config";

const Table = ({ data, sortStatus, currentPage, handleSortRequest, deleteBook, editBook, moveLeft, moveRight, moveToPage }) => {
    const pagesAmount = Math.ceil(parseFloat((data.length/settings.rowsShownAtOneTime).toFixed(2)));
    let currentData = paginate(data, currentPage);

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

const Row = ({ book, deleteBook, editBook }) => {
    const { id, name, author, year, addDate, editDate } = book;
    return (
        <tr>
            <td className="remove_edit" onClick={deleteBook}><img src="./img/remove.jpg" alt="Remove"/></td>
            <td className="remove_edit" onClick={editBook}><img src="./img/edit.png" alt="Edit"/></td>
            <Cell data={ id } className="center_data"/>
            <Cell data={ name }/>
            <Cell data={ author }/>
            <Cell data={ year } className="center_data"/>
            <DateCell timestamp={ addDate }/>
            <DateCell timestamp={ editDate }/>
        </tr>
    )
};

const Cell = ({ data, className }) => <td className={className || ''}>{ data }</td>;

const DateCell = ({ timestamp }) => <td className="center_data">{ timestamp && convertUnix(+timestamp) }</td>;

export default Table;