import React from "react";

const Pagination = ({ currentPage, pagesAmount, moveLeft, moveRight, moveToPage }) => {
    return (
        <div className="pagination">
            { currentPage > 1 && <LeftArrow moveLeft={() => moveLeft()}/> }
            <Pages currentPage={ currentPage }
                   total={ Array.from(Array(pagesAmount).keys()) }
                   moveToPage={ moveToPage }/>
            { currentPage < pagesAmount && <RightArrow moveRight={() => moveRight(pagesAmount)}/> }
        </div>
    )
};

const LeftArrow = ({ moveLeft }) =>
    <a href="#" onClick={ moveLeft }>❮</a>;

const RightArrow = ({ moveRight }) =>
    <a href="#" onClick={ moveRight }>❯</a>;

const Pages = ({ currentPage, total, moveToPage }) => {
    return (
        <div>
            {
                total.map((page, index) =>
                    <a key={index}
                       href="#"
                       id={(page + 1) === currentPage ? "active": ""}
                       onClick={ () => moveToPage(page + 1) }>

                        {page + 1}
                    </a>
                )
            }
        </div>
    )
};

export default Pagination;