import { getSingleAuthor, getAuthors } from '../../api/authorData';
import { deleteBook, getSingleBook } from '../../api/bookData';
import { viewBookDetails, viewAuthorDetails, deleteAuthorBooks } from '../../api/mergedData';
import addAuthorForm from '../components/forms/addAuthorForm';
import addBookForm from '../components/forms/addBookForm';
import { showAuthors } from '../components/pages/authors';
import { showBooks } from '../components/pages/books';
import viewAuthorBooks from '../components/pages/viewAuthorBooks';
import viewBook from '../components/pages/viewBook';

const domEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // DONE: CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteBook(firebaseKey).then((booksArray) => showBooks(booksArray));
      }
    }

    // DONE: CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm(uid);
    }

    // DONE: CLICK EVENT EDITING/UPDATING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      const [, bookFirebaseKey] = e.target.id.split('--');
      getSingleBook(bookFirebaseKey).then((bookObject) => addBookForm(bookObject.uid, bookObject));
    }

    // DONE: CLICK EVENT FOR VIEW BOOK DETAILS
    if (e.target.id.includes('view-book-btn')) {
      const [, bookFirebaseKey] = e.target.id.split('--');
      viewBookDetails(bookFirebaseKey).then((bookAuthorObject) => viewBook(bookAuthorObject));
    }

    // DONE: ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        // deleteAuthorBooks(firebaseKey).then((authorsArray) => showAuthors(authorsArray));
        deleteAuthorBooks(firebaseKey);
        getAuthors(uid).then((authors) => showAuthors(authors));
      }
    }

    // DONE: CLICK EVENT FOR VIEW AUTHOR DETAILS
    if (e.target.id.includes('view-author-btn')) {
      const [, authorFirebaseKey] = e.target.id.split('--');
      viewAuthorDetails(authorFirebaseKey).then((authorBookObject) => viewAuthorBooks(authorBookObject));
    }

    // DONE: ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }
    // DONE: ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, authorFirebaseKey] = e.target.id.split('--');
      getSingleAuthor(authorFirebaseKey).then((authorObject) => addAuthorForm(authorObject));
    }
  });
};

export default domEvents;
