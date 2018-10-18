const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/featured', (req, res) => {
    Blog
        .where("featured")
        .equals(true)
        .then(blogs => {
            res.status(200).json(blogs);
        });
});

router.get('/:_id', (req, res) => {
    Blog
        .findById(req.params)
        .then(blog => {
            if(blog == null){
                res.status(404);
                res.send('error')
            }
            else{
                res.status(200).json(blog);
            }
           
        });
});

router.post('/', (req, res) => {
    var newBlog = new Blog(req.body)
        .save()
        .then(blog => {
            res.status(201).json(blog);
        });
});

router.put('/:_id', (req, res) => {
    Blog
        .findByIdAndUpdate(req.params, req.body, {new: true})
        .then(blog => {
            res.status(204).json(blog);
        });
});

router.delete('/:_id', (req, res) => {
    Blog
        .findByIdAndRemove(req.params)
        .then(blog => {
            res.status(200).json(blog);
        });
});



module.exports = router;