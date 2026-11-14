import { getDb } from '../db/connect.js';

const getAllBooks = async () => {
    const database = getDb();
    const books = await database.collection('books').find({}).toArray();
    return books;
};

const getBookById = async (requestedId) => {
    const database = getDb();
    const book = await database.collection('books').findOne({ id: requestedId });
    return book;
};

const createBook = async (book) => {
    const database = getDb();
    const result = await database.collection('books').insertOne(book);
    return result;
};

const updateBook = async (requestedId, bookData) => {
    const database = getDb();
    const result = await database.collection('books').updateOne({ id: requestedId }, { $set: bookData });
    return result;
};

const deleteBook = async (requestedId) => {
    const database = getDb();
    const result = await database.collection('books').deleteOne({ id: requestedId });
    return result;
};

const authorExists = async (authorId) => {
    const database = getDb();
    const author = await database.collection('authors').findOne({ id: authorId });
    return author !== null;
};

export {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    authorExists
};