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
export { getAllBooks, getBookById };