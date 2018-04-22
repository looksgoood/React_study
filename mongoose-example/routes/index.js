module.exports = function(app, Book) {
    // Get all books
    app.get('/api/books', (req, res) => {
        Book.find((err, books) => {
            if (err) {
                return res.status(500).send({error: 'database failure'});
            }
            res.json(books);
        });
    });

    // Create book
    app.post('/api/books', (req, res) => {
        let book = new Book();
        book.title = req.body.title;
        book.author = req.body.author;
        book.published_data = new Date(req.body.published_data);

        book.save((err) => {
            if (err) {
                console.error(err);
                res.json({result: 0});
                return;
            }
            res.json({result: 1});
        });
    });

    // Get single book
    app.get('/api/books/:book_id', (req, res) => {
        Book.findOne({_id: req.params.book_id}, (err, books) => {
            if (err) {
                return res.status(500).json({error: err});
            }
            if (!books) {
                return res.status(404).json({error: 'book nont found'});
            }
            res.json(books);
        });
    });

    // Get book by author
    app.get('/api/books/author/:author', (req, res) => {
        Book.find({author: req.params.author},
                  {_id: false, title: true, published_data: true},
                  (err, books) => {
            if (err) {
                return res.status(500).json({error: err});
            }
            if (!books) {
                return res.status(404).json({error: 'book nont found'});
            }
            res.json(books);
        });
    });

    // Update the book
    app.put('/api/books/:book_id', (req, res) => {
        // find and update
        // Book.findById(req.params.book_id, (err, book) => {
        //     if (err) {
        //         return res.status(500).json({error: err});
        //     }
        //     if (!book) {
        //         return res.status(404).json({error: 'book nont found'});
        //     }

        //     if (req.body.title) book.title = req.body.title;
        //     if (req.body.author) book.author = req.body.author;
        //     if (req.body.published_data) book.published_data = req.body.published_data;
            
        //     book.save((err) => {
        //         if (err) {
        //             console.error(err);
        //             res.status(500).json({error: "failed to update"});
        //             return;
        //         }
        //         res.json({message: "book updated"});
        //     });
        // });

        // using update api
        Book.update({_id: req.params.book_id}, {$set: req.body}, (err, output) => {
            if (err) {
                return res.status(500).json({error: err});
            }

            console.log(output);
            if (!output.n) return res.status(404).json({error: 'book not found'});
            res.json({message: "book updated"});
        });
    });

    // Delete book
    app.delete('/api/books/:book_id', (req, res) => {
        Book.remove({_id: req.params.book_id}, (err, output) => {
            if (err) {
                return res.status(500).json({error: err});
            }

            /* Since delete operation is idempotent, no need to specify
            if (!output.n) return res.status(404).json({error: 'book not found'});
            res.json({message: "book deleted"});
            */

            res.status(204).end();
        });
    });
}