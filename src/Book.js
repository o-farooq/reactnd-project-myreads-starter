import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BookShelfChanger from './BookShelfChanger'
class Book extends Component {

    static propTypes = {
        onMoveBook: PropTypes.func.isRequired
    }



    render() {
        const { onMoveBook, book } = this.props
        return (
            book &&
            <div className="book">
                <div className="book-top">
                    {<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>}
                    <BookShelfChanger onMoveBook={onMoveBook} book={book} />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors && book.authors.join(", ")}</div>
            </div>

        )
    }

}

export default Book