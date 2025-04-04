const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const Contact = require('../models/contacts');
const { validationResult } = require('express-validator');

const getAll = async (req, res) => {
    await mongodb.getDatabase().db().collection('contacts').find().toArray()
        .then((contacts, err) => {
            if (contacts.length === 0) {
                return res.status(404).json({ message: 'No data found' });
            }
            if (err) {
                return res.status(500).json({message: err});
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message || 'Internal server error' });
        });
};


const getSingle = async (req, res) =>{
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: userId});
        result.toArray().then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts[0]);
        });
    } catch (error) {
        res.status(500).json({error: "Something went wrong", details: error.message});
        res.status(404).json({error: "Something went wrong", details: error.message});
    }
};

const createUser = async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    };
    const contact = new Contact ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday,
        favoriteColor: req.body.favoriteColor})

        try {
            const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    
            if (response.acknowledged) {
                res.status(201).json({ message: 'Created contact successfully.', contact: contact });
            } else {
                res.status(500).json({ message: 'Error occurred while saving contact.' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message || 'Some error occurred while updating the contact.' });
        }
    };

const updateUser = async (req, res) =>{
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occrured while updating the user.');
    }
};

const deleteUser = async (req, res) =>{
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: userId}, true);
    if (response.deletedCount > 0){
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occrured while updating the user.');
    }
};



module.exports= {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};