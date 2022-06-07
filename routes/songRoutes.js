const express = require("express");
const router = express.Router();
const Song = require('../models/songs');
const multer = require('multer');

// Image upload
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/songs')
    },
    filename: function(req, file, cb){
    cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
}, 
}); 
var upload = multer({
    storage: storage,
}).single("song");

// Insert a song into DB route
router.post('/addSong', upload, (req, res) => {
    const user = new User({
        songName: req.body.name,
        songDesc: req.body.bio,
        dateCreated: req.body.dob,
        ratings: req.body.ratings,
        image: req.file.filename,
        
    });
    user.save((err)=>{
        if(err){
            res.json({message: err.message, type: 'danger'});
        }else{
            req.session.message = {
                type: 'success',
                message: 'Song Added Successfully'
            };
            res.redirect("/")
        }
    })

});
// Get all songs route
router.get('/', (req, res) => {
   Song.find().exec((err, songs)=>{
       if(err){
           res.json({ message: err.message});
       } else{
           res.render("index",{
               title: "Homepage",
               songs: songs,
           });
       }
   })
});

router.get('/addSong', (req, res) => {
    res.render('add_songs', { title: "Add Songs" });
});

module.exports = router;