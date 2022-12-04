const router = require("express").Router();
const books = require("./data");
let bookdir = books; 
//GET FOR ENTIRE BOOKS
router.get("/books",(req,res)=>{
    res.send(bookdir)
});
//GET FOR SPECIFIC BOOK
router.get("/books/:id",(req,res)=>{
    const {id} = req.params;
    const book = bookdir.find(book => book.isbn === id);
    if(!book) return res.status(404).send("NOT FOUND");
    res.send(book);
});
//TO CREATE A NEW BOOK
router.put("/books",(req,res)=>{
    const{
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    } = req.body
    const exist = bookdir.find(book => book.isbn === isbn)
    if(exist) res.send("Book exists");
    const book = {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    };
    bookdir.push(book);
    res.send(book);
});

//EDIT A BOOK
router.put('/books/:id', function (req, res) {
    const { id } = req.params;
    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        status,
        authors,
        categories
    } = req.body;

    let book = booksDirectory.find(b => b.isbn === id);
    if (!book) return res.status(404).send('Book does not exist');

    const updateField = (val, prev) => !val ? prev : val;

    const updatedBook = {
        ...book,
        title: updateField(title, book.title),
        isbn: updateField(isbn, book.isbn),
        pageCount: updateField(pageCount, book.pageCount),
        publishedDate: updateField(publishedDate, book.publishedDate),
        thumbnailUrl: updateField(thumbnailUrl, book.thumbnailUrl),
        shortDescription: updateField(shortDescription, book.shortDescription),
        longDescription: updateField(longDescription, book.longDescription),
        status: updateField(status, book.status),
        authors: updateField(authors, book.authors),
        categories: updateField(categories, book.categories),
    };

    const bookIndex = booksDirectory.findIndex(b => b.isbn === book.isbn);
    booksDirectory.splice(bookIndex, 1, updatedBook);

    res.status(200).send(updatedBook);
});

//DELETE A BOOK
router.delete('/books/:id', function (req, res) {
    const { id } = req.params;

    let book = booksDirectory.find(b => b.isbn === id);
    if (!book) return res.status(404).send('Book does not exist');

    booksDirectory = booksDirectory.filter(b => b.isbn !== id);

    res.send('Success');
});



//DELETE FOR A SPECIFIC BOOK

//PUT FOR ADDING A SPECIFIC BOOK
module.exports = router;