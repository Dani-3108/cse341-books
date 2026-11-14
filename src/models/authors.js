import { getDb } from "../db/connect.js";

const getAllAuthors = async () => {
    const database = getDb();
    const authors = await database.collection('authors').find({}).toArray();
    return authors;
};

const getAuthorById = async (requestedId) => {
    const database = getDb();
    const author = await database.collection('authors').findOne({ id: requestedId });
    return author;
};

const createAuthor = async (author) => {
    const database = getDb();
    const result = await database.collection('authors').insertOne(author);
    return result;
};

const updateAuthor = async (requestedId, authorData) => {
    const database = getDb();
    const result = await database.collection('authors').updateOne({ id: requestedId }, { $set: authorData });
    return result;
};

const deleteAuthor = async (requestedId) => {
    const database = getDb();
    const result = await database.collection('authors').deleteOne({ id: requestedId });
    return result;
};

const authorHasBooks = async (authorId) => {
    const database = getDb();
    const book = await database.collection('books').findOne({ authorId });
    return book !== null;
};

export {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    authorHasBooks
};