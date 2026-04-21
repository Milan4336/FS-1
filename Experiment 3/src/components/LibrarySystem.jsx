import React, { useState } from 'react';

const LibrarySystem = () => {
    const [books, setBooks] = useState([
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
        { id: 2, title: 'Clean Code', author: 'Robert C. Martin' },
        { id: 3, title: 'Design Patterns', author: 'Gang of Four' }
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');

    const addBook = (e) => {
        e.preventDefault();
        if (!newTitle || !newAuthor) return;
        const newBook = {
            id: Date.now(),
            title: newTitle,
            author: newAuthor
        };
        setBooks([...books, newBook]);
        setNewTitle('');
        setNewAuthor('');
    };

    const removeBook = (id) => {
        setBooks(books.filter(book => book.id !== id));
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="library-system glass-card">
            <h2>Library Management</h2>
            <p className="description">Manage your collection with search, add, and remove functionality.</p>

            <div className="control-group">
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>

            <form onSubmit={addBook} className="add-book-form">
                <input
                    type="text"
                    placeholder="Book Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    required
                />
                <button type="submit" className="btn-primary">Add Book</button>
            </form>

            <div className="book-list">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map(book => (
                        <div key={book.id} className="book-item">
                            <div className="book-info">
                                <strong>{book.title}</strong>
                                <span>{book.author}</span>
                            </div>
                            <button onClick={() => removeBook(book.id)} className="btn-remove">Remove</button>
                        </div>
                    ))
                ) : (
                    <p className="no-results">No books found matching your search.</p>
                )}
            </div>
        </div>
    );
};

export default LibrarySystem;
