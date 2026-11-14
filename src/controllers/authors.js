import { getAllAuthors, /*getAuthorById*/ } from "../models/authors.js";

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

export { getAuthorsHandler };