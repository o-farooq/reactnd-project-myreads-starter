import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {

  constructor() {
    super();
    this.handleBookMove = this.handleBookMove.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
  }


  state = {
    booksInShelf: [],
    searchResults: [],
    query: ''
  }

  /**
   * 
   * @param {book} book 
   * @param {shelf} shelf where book is moved 
   */
  handleBookMove(book, shelf) {
    const { booksInShelf, searchResults } = this.state
    // create copy of state and not mutate the state
    let booksInShelfLocal = booksInShelf.slice();

    BooksAPI.update(book, shelf).then((result) => {
      if (result.error)
        return;
      let bookInSearchResults = searchResults.filter(sbook => sbook.id === book.id)[0]
      if (bookInSearchResults) {
        bookInSearchResults.shelf = shelf;
      }

      let bookInShelf = booksInShelfLocal.filter(sbook => sbook.id === book.id)[0]
      if (!bookInShelf) {
        book.shelf = shelf;
        booksInShelfLocal.push(book);
      } else {
        bookInShelf.shelf = shelf;
      }

      this.setState({ booksInShelf: booksInShelfLocal, searchResults: searchResults });
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(JSON.stringify(books));
      this.setState({ booksInShelf: books })
    })
  }

  updateQuery = (query) => {

    const { booksInShelf } = this.state

    // create copy of state and not mutate the state
    let booksInShelfLocal = booksInShelf.slice();

    this.setState({ query: query })
    if (query) {
      BooksAPI.search(query).then((books) => {
        !books.error && books.forEach(book => {
          book.shelf = "none"
          let existingBook = booksInShelfLocal && booksInShelfLocal.filter(bookInShelf => bookInShelf.id === book.id)[0];
          if (existingBook) {
            book.shelf = existingBook.shelf;
          }
        });
        console.log(JSON.stringify(books))
        this.setState({ searchResults: books })
      })
    } else {
      this.setState({ searchResults: [] })
    }
  }

  clearQuery = () => {
    this.updateQuery();
  }


  render() {

    const { booksInShelf, searchResults, query } = this.state

    let currentlyReadingBooks = booksInShelf.filter(book => book.shelf === "currentlyReading")
    let wantToReadBooks = booksInShelf.filter(book => book.shelf === "wantToRead")
    let readBooks = booksInShelf.filter(book => book.shelf === "read")

    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks onMoveBook={this.handleBookMove} booksInShelf={booksInShelf} updateQuery={this.updateQuery} books={searchResults} query={query} />
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf books={currentlyReadingBooks} title="Currently Reading" onMoveBook={this.handleBookMove} />
                <BookShelf books={wantToReadBooks} title="Want to Read" onMoveBook={this.handleBookMove} />
                <BookShelf books={readBooks} title="Read" onMoveBook={this.handleBookMove} />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search' className="open-search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
