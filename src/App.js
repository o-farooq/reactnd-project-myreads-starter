import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {

  constructor() {
    super();
    this.handleBookMove = this.handleBookMove.bind(this);
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

  render() {

    const { booksInShelf, searchResults, query } = this.state

    let currentlyReadingBooks = booksInShelf.filter(book => book.shelf === "currentlyReading")
    let wantToReadBooks = booksInShelf.filter(book => book.shelf === "wantToRead")
    let readBooks = booksInShelf.filter(book => book.shelf === "read")

    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
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
