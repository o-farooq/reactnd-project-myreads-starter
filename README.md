MyReads is a bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read

## Cloning the repository

Clone or download the app source code from  [Github](https://github.com/o-farooq/reactnd-project-myreads-starter)

`git clone https://github.com/o-farooq/reactnd-project-myreads-starter`

## Installing the app
Run `npm install` command in app directory to install the dependencies

## Launching the app
Run `npm start` command in the app directory to launch the app

## App Functionality
In this application, the main page displays a list of "shelves" (i.e. categories), each of which contains a number of books. The three shelves are:

* Currently Reading
* Want to Read
* Read

Each book has a control that lets you select the shelf for that book. When you select a different shelf, the book moves there. 

The main page also has a link to /search, a search page that allows you to find books to add to your library.

The search page has a text input that may be used to find books. As the value of the text input changes, the books that match that query are displayed on the page, along with a control that lets you add the book to your library.