const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        });
});

router.get('/:_id', (req, res) => {
    User
        .findById(req.params)
        .then(user => {
            if(user == null){
                res.status(404);
                res.send('error');
            }
            else{
                res.status(200).json(user);
            }
            
        });
});

router.post('/', (req, res) => {
    var newUser = new User(req.body)
        .save()
        .then(user => {
            res.status(201).json(user) 
            
        });
});

router.put('/:_id', (req, res) => {
    User
        .findByIdAndUpdate(req.params, req.body, {new: true})
        .then(user => {
            res.status(204).json(user) 
            
        });
});

router.delete('/:_id', (req, res) => {
    User
        .findByIdAndRemove(req.params)
        .then(user => {
            res.status(200).json(user) 
            
        });
});

module.exports = router; 