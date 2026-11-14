import { getAllAuthors, getAuthorById } from "../models/authors.js";

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

export { getAuthorsHandler,getAuthorByIdHandler };