import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookShelfChangerOption from './BookShelfChangerOption'

class BookShelfChanger extends Component {

    handleChange(event) {
        let shelf = event.target.value
        const { book, onMoveBook } = this.props;
        onMoveBook(book, shelf);
    }

    static propTypes = {
        onMoveBook: PropTypes.func.isRequired
    }

    render() {
        const { book } = this.props;
        return (
            <div className="book-shelf-changer">
                <select onChange={(event) => this.handleChange(event)} value={book.shelf} >
                    <option value="none" disabled>Move to...</option>
                    <BookShelfChangerOption selectedValue={book.shelf} optionValue="currentlyReading" text="Currently Reading" />
                    <BookShelfChangerOption selectedValue={book.shelf} optionValue="wantToRead" text="Want to Read" />
                    <BookShelfChangerOption selectedValue={book.shelf} optionValue="read" text="Read" />
                    <BookShelfChangerOption selectedValue={book.shelf} optionValue="none" text="None" />
                </select>
            </div>
        )
    }


}

export default BookShelfChanger