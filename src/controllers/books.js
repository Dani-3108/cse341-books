import {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    authorExists
}
from '../models/books.js';

const getBooksHandler = async (req, res) => {
    try {
        const books = await getAllBooks();
        return res.status(200).json(books);
    }
    catch (error) {
        console.error('Failed to get books', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getBookByIdHandler = async (req, res) => {
    try {
        const requestedId = req.params.id;
        const book = await getBookById(requestedId);

        if (book === null) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json(book);
    }
    catch (error) {
        console.error('Failed to get book', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const validateBookBody = (body, isCreate) => {
    if (body === undefined || Object.keys(body).length === 0) {
        return 'Request body is required';
    }

    const requiredFields = isCreate
        ? ['id', 'authorId', 'title', 'publicationDate']
        : ['authorId', 'title', 'publicationDate'];

    for (const field of requiredFields) {
        if (body[field] === undefined) {
            return `${field} is required`;
        }
    }

    for (const field of requiredFields) {
        if (typeof body[field] !== 'string' || body[field].trim() === '') {
            return `${field} must be a non-empty string`;
        }
    }

    if (!isCreate && body.id !== undefined) {
        return 'id cannot be changed in the body';
    }

    return null;
};

const createBookHandler = async (req, res) => {
    try {
        const validationMessage = validateBookBody(req.body, true);
        if (validationMessage !== null) {
            return res.status(400).json({ message: validationMessage });
        }

        const authorFound = await authorExists(req.body.authorId);
        if (!authorFound) {
            return res.status(400).json({ message: 'authorId does not match an existing author' });
        }

        const existingBook = await getBookById(req.body.id);
        if (existingBook !== null) {
            return res.status(409).json({ message: 'Book id already exists' });
        }

        const newBook = {
            id: req.body.id,
            authorId: req.body.authorId,
            title: req.body.title,
            publicationDate: req.body.publicationDate
        };
        await createBook(newBook);

        return res.status(201).json(newBook);
    }
    catch (error) {
        console.error('Failed to create book', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateBookHandler = async (req, res) => {
    try {
        const requestedId = req.params.id;

        const validationMessage = validateBookBody(req.body, false);
        if (validationMessage !== null) {
            return res.status(400).json({ message: validationMessage });
        }

        const authorFound = await authorExists(req.body.authorId);
        if (!authorFound) {
            return res.status(400).json({ message: 'authorId does not match an existing author' });
        }

        const bookData = {
            authorId: req.body.authorId,
            title: req.body.title,
            publicationDate: req.body.publicationDate
        };
        const result = await updateBook(requestedId, bookData);

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json({ id: requestedId, ...bookData });
    }
    catch (error) {
        console.error('Failed to update book', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteBookHandler = async (req, res) => {
    try {
        const requestedId = req.params.id;
        const result = await deleteBook(requestedId);

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(204).send();
    }
    catch (error) {
        console.error('Failed to delete book', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export {
    getBooksHandler,
    getBookByIdHandler,
    createBookHandler,
    updateBookHandler,
    deleteBookHandler
};