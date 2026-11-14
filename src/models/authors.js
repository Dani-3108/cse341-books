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

export { getAllAuthors, getAuthorById,createAuthor };