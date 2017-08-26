import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            books: []
        };
    }

    render() {
        const { onMoveBook, booksInShelf, query, books, updateQuery } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/' >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query}
                            onChange={(event) => updateQuery(event.target.value, booksInShelf)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            books.length > 0 && books.map(book => (
                                <li>
                                    <Book book={book} onMoveBook={onMoveBook} />
                                </li>
                            ))
                        }
                    </ol>
                </div>
            </div>)
    }

}

export default SearchBooks;

