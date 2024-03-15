const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const myMiddleware = (req, res, next) => {
    console.log('My Middleware');
    next();
};
app.use(myMiddleware);

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};

// Sample data
let users = [{ id: 1, name: 'John Doe' }];
let posts = [{ id: 1, title: 'My First Post', content: 'Hello, world!' }];
let comments = [{ id: 1, postId: 1, content: 'Great post!' }];

// Routes
// Users
app.get('/users', (req, res) => res.json(users));
app.post('/users', (req, res) => { /* Add user */ });
app.patch('/users/:id', (req, res) => { /* Update user */ });
app.delete('/users/:id', (req, res) => { /* Delete user */ });

// Posts
app.get('/posts', (req, res) => {
    const { title } = req.query;
    const filteredPosts = title ? posts.filter(post => post.title.includes(title)) : posts;
    res.json(filteredPosts);
});
// Add more routes for posts...

// Comments
app.get('/comments', (req, res) => res.json(comments));
// Add more routes for comments...

// View setup
app.set('view engine', 'ejs');

// Static files
app.use(express.static('public'));

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});