const router = require('express').Router();
const { publicEncrypt } = require('crypto');
const mongoose = require('mongoose');
const Diary = require('../models/diary');

router.get('/details', (req, res) => {
    let body = req.body;
    let date = body['dateCreated'];
    let ownerId = body['owner'];

    return Diary.find({ dateCreated: date, owner: ownerId}).exec()
    .then((result) => {
        console.log(result);
        res.status(200).send(result);

    })
    .catch((err) => {
        res.status(400).send(err);
        
    });

})

// code to store new diary
router.post('/newDiary', (req, res) => {

    let body = req.body;
    let title = body['title'];
    let content = body['content'];
    let owner = body['owner'];
    let isPublic = body['isPublic'];
    let dateCreated = body['dateCreated'];

    const diary = new Diary({
        _id: new mongoose.Types.ObjectId,
        owner: owner,
        content: content,
        title: title,
        public: isPublic,
        dateCreated: dateCreated
    });

    diary.save()
    .then((result) => {
        res.status(200).send({'message': 'success'})
        
    })
    .catch(err => console.log(err));




})


// update an existing diary
router.patch('/update', (req, res) => {
    let body = req.body;
    let title = body['title'];
    let content = body['content'];
    let isPublic = body['isPublic'];
    let owner = body['owner'];
    let date = body['dateCreated'];

    return Diary.updateOne({ dateCreated: date, owner: owner }, { content: content, title: title, public: isPublic })
    .exec()
    .then((result) => {
        res.status(200).send(result);

    })
    .catch((err) => {
        res.status(400).send(err);
        
    });

})

router.post('/getMyDiary', (req, res) => {

    let owner = req.body['owner']
    return Diary.find({ owner: owner }).exec()
    .then((result) => {

        res.status(200).json(result)

    })
    .catch((err) => res.status(400).send(err));
})

router.get('/getPublicDiary', (req, res) => {

    return Diary.find({ public: true }).exec()
    .then((result) => {

        res.status(200).send(result)

    })
    .catch((err) => res.status(400).send(err));
})
 
module.exports = router;