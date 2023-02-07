const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchuser')
const NotesModel=require('../models/Notes')
const { body, validationResult, header } = require('express-validator');


router.get('/',fetchUser,async(req,res)=>{
    try{
        userID= req.user.id
        const Notes = await NotesModel.find({user:userID})
        res.json(Notes)
    }
    catch(err){
        console.log(err)
    }
})
router.post('/addNote',fetchUser,[
    body('name').isLength({ min: 3 }),
    body('Note').isLength({ min: 10 }),
],async(req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const{name,Note,tag}=req.body
        userID= req.user.id
        const newNote= new NotesModel({
            name,
            Note,
            tag,
            user:userID
        })
        const result=await newNote.save();
        res.json(result)
    }
    catch(err){
        console.log(err)
    }
})

router.put('/updateNote/:id',fetchUser,[
    body('name').isLength({ min: 3 }),
    body('Note').isLength({ min: 10 }),
],async(req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const{name,Note,tag}=req.body
        let note = await NotesModel.findById(req.params.id);
        if(!note){res.send("no such note is found")}
        if(note.user.toString()!=req.user.id){
            res.send('not authentic')
        }
        note= await NotesModel.findByIdAndUpdate(req.params.id,{name,Note,tag})
        res.json(note)
    }
    catch(err){
        console.log(err)
    }
})
router.delete('/deleteNote/:id',fetchUser,async(req,res)=>{
    try{
        let note = await NotesModel.findById(req.params.id);
        if(!note){res.send("no such note is found")}
        if(note.user.toString()!=req.user.id){
            res.send('not authentic')
        }
        note= await NotesModel.findByIdAndDelete(req.params.id)
        res.json(note)
    }
    catch(err){
        console.log(err)
    }
})



module.exports = router