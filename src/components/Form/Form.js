import React from "react";
import { hot } from "react-hot-loader";
import "../../styles.css";

const Form = ({ disabled, handleChange, book }) => {
    return (
        !disabled &&
            <form id="add_edit_data">
                <input name="name" type="text" placeholder="Название книги" onChange={handleChange} value={book.name || ''}/>
                <input name="author" type="text" placeholder="Автор" onChange={handleChange} value={book.author || ''}/>
                <input name="year" type="text" placeholder="Год выпуска" onChange={handleChange} value={book.year || ''}/>
            </form>
    )
};

export default hot(module)(Form);