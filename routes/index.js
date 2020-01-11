const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

const db = require('./datebase/connection')

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

router.get('/', function(req, res) {
    db.collection('books').get()
        .then((snapshot) => {
            const arr = [];
            snapshot.forEach((doc) => {
                arr.push(Object.assign({id: doc.id}, doc.data()));
            });

            res.send(arr);
        })
        .catch((err) => {
            console.log('Error getting books', err);
        });
});

router.post('/', function(req, res) {
    const id =uuidv4();

    let docRef = db.collection('books').doc(id);

    const book = {
        id: id,
        name: req.body.name,
        author: req.body.author,
        owner: req.body.owner,
        img_url: req.body.img_url
    };

    docRef.set(book);

    res.send(book);
});

router.delete('/:id', function(req, res) {
    db.collection('books').doc(req.params.id).delete();

    res.sendStatus(204);
});

module.exports = router;
