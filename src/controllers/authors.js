import { getAllAuthors, getAuthorById,createAuthor } from "../models/authors.js";

const getAuthorsHandler = async (req, res) => {
    try {
        const authors = await getAllAuthors();
        return res.status(200).json(authors);
    }  
    catch (error) {
        console.error('Failed to get authors', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getAuthorByIdHandler = async (req, res) => {
    try {
        const requestedId = req.params.id;
        const author = await getAuthorById(requestedId);
        if (author === null) {
            return res.status(404).json({ message: 'Author not found' });
        }
        
        return res.status(200).json(author);
    }  
    catch (error) {
        console.error('Failed to get Author', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const validateAuthorBody = (body) => {
    if (body === undefined || Object.keys(body).length === 0) {
        return 'Request body is required';
    }
    if (body.id === undefined) {
        return 'id is required';
    }
    if (body.name === undefined) {
        return 'name is required';
    }
    if (body.birthYear === undefined) {
        return 'birthYear is required';
    }
    if (typeof body.id !== 'string' || body.id.trim() === '') {
        return 'id must be a non-empty string';
    }
    if (typeof body.name !== 'string' || body.name.trim() === '') {
        return 'name must be a non-empty string';
    }
    if (!Number.isInteger(body.birthYear)) {
        return 'birthYear must be an integer';
    }
    return null;
};

const createAuthorHandler = async (req, res) => {
    try {
        const validationMessage = validateAuthorBody(req.body);
        if (validationMessage !== null) {
            return res.status(400).json({ message: validationMessage });
        }

        const existingAuthor = await getAuthorById(req.body.id);
        if (existingAuthor !== null) {
            return res.status(409).json({ message: 'Author id already exists' });
        }

        const newAuthor = {
            id: req.body.id,
            name: req.body.name,
            birthYear: req.body.birthYear
        };
        await createAuthor(newAuthor);

        return res.status(201).json(newAuthor);
    }
    catch (error) {
        console.error('Failed to create author', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { getAuthorsHandler,getAuthorByIdHandler,createAuthorHandler };