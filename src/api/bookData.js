// import axios from 'axios';
import axios from 'axios';
import firebaseConfig from './apiKeys';
// API CALLS FOR BOOKS

const dbUrl = firebaseConfig.databaseURL;

// DONE: GET BOOKS
const getBooks = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// DONE: DELETE BOOK
const deleteBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/books/${firebaseKey}.json`)
    .then(() => {
      getBooks().then((booksArray) => resolve(booksArray));
    })
    .catch((error) => reject(error));
});

// DONE: GET SINGLE BOOK
const getSingleBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// DONE: CREATE BOOK
const createBook = (bookObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/books.json`, bookObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/books/${response.data.name}.json`, payload)
        .then(() => {
          getBooks().then(resolve);
        });
    }).catch(reject);
});

// TODO: UPDATE BOOK
const updateBook = (bookObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/books/${bookObj.firebaseKey}.json`, bookObj)
    .then(() => getBooks().then(resolve))
    .catch(reject);
});

// DONE: FILTER BOOKS ON SALE
const booksOnSale = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books/.json?orderBy="sale"&equalTo=true`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

// TODO: STRETCH...SEARCH BOOKS

export {
  getBooks,
  createBook,
  booksOnSale,
  deleteBook,
  getSingleBook,
  updateBook
};
